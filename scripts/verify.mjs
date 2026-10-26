import { spawn } from 'node:child_process';
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, readdirSync, statSync, writeSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import process from 'node:process';
import { clearTimeout, setTimeout } from 'node:timers';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { stripVTControlCharacters } from 'node:util';

const print = (...values) => process.stdout.write(`${values.join(' ')}\n`);
const printError = (...values) => process.stderr.write(`${values.join(' ')}\n`);

// Kept dependency-free and identical across the four repositories.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(path.join(root, 'scripts/verification.config.json'), 'utf8'));
const args = process.argv.slice(2);
const mode = args.shift() || 'fast';
const plan = args.includes('--plan');
const selected = args.includes('--check') ? args[args.indexOf('--check') + 1] : null;
const validArgs = selected ? ['--check', selected, ...(plan ? ['--plan'] : [])] : (plan ? ['--plan'] : []);
if (!['fast', 'native', 'release'].includes(mode) || args.length !== validArgs.length || args.some(a => !validArgs.includes(a))) {
  printError('Usage: node scripts/verify.mjs [fast|native|release] [--check ID] [--plan]');
  process.exit(2);
}
const checks = config[mode];
if (!checks || (selected && !checks.some(check => check.id === selected))) {
  printError(selected ? `Unknown check: ${selected}` : `${mode}: NOT CONFIGURED for this repository`);
  process.exit(2);
}
const active = checks.filter(check => !selected || check.id === selected);
const secrets = new Set();
const sensitive = /password|passwd|secret|token|credential|private.?key|api.?key|database_url|redis_url|storePassword|keyPassword/i;
for (const [key, value] of Object.entries(process.env)) {
  if (sensitive.test(key) && value.length >= 4) secrets.add(value);
}
// Read only to redact local secrets; never load these values into child environments.
for (const file of readdirSync(root).filter(name => /^\.env(?:\.|$)/.test(name))) {
  const location = path.join(root, file);
  if (!statSync(location).isFile()) continue;
  for (const line of readFileSync(location, 'utf8').split(/\r?\n/)) {
    const match = /^\s*(?:export\s+)?([\w.]+)\s*=\s*(.*?)\s*$/.exec(line);
    if (match && sensitive.test(match[1])) {
      const value = match[2].replace(/^(['"])(.*)\1$/, '$2');
      if (value.length >= 4) secrets.add(value);
    }
  }
}
const redact = value => {
  let result = stripVTControlCharacters(value);
  for (const secret of secrets) result = result.split(secret).join('[REDACTED]');
  return result
    .replace(/([a-z][a-z0-9+.-]*:\/\/)[^\s/@]+:[^\s/@]+@/gi, '$1[REDACTED]@')
    .replace(/((?:password|passwd|secret|token|credential|api[_-]?key|authorization|storePassword|keyPassword)[\w-]*["']?\s*[:=]\s*)[^\s,;]+/gi, '$1[REDACTED]')
    .replace(/Bearer\s+[\w.+/=-]+/gi, 'Bearer [REDACTED]');
};
const started = performance.now();
const runDirectory = path.join(root, '.verification', `${Date.now()}-${process.pid}`);
if (!plan) mkdirSync(runDirectory, { recursive: true, mode: 0o700 });
const results = [];
let interrupted = false;
let currentChild;
const terminate = signal => {
  if (!currentChild) return;
  try { process.kill(-currentChild.pid, signal); } catch { /* Already exited. */ }
};
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => { interrupted = true; terminate('SIGTERM'); });
}

async function run(check) {
  const start = performance.now();
  const log = path.join(runDirectory, `${check.id}.log`);
  const fd = openSync(log, 'wx', 0o600);
  const details = [];
  const highlights = [];
  let outputFailure = false;
  let killTimer;
  const record = line => {
    const safe = redact(line);
    writeSync(fd, `${safe}\n`);
    details.push(safe);
    if (details.length > 12) details.shift();
    if (/error|FAIL|failed|not found|Cannot |TS\d{4}|AssertionError/i.test(safe) && highlights.length < 10) highlights.push(safe.slice(0, 500));
    if (!outputFailure && check.failOnOutput && safe.trim().startsWith(check.failOnOutput)) {
      outputFailure = true;
      terminate('SIGTERM');
      killTimer = setTimeout(() => terminate('SIGKILL'), 3000);
    }
  };
  let timedOut = false;
  let code;
  try {
    for (const file of check.requireAbsent || []) {
      if (existsSync(path.join(root, file))) throw new Error(`Unsafe existing asset: ${file}; review it manually before building. Verification will not delete it.`);
    }
    if (check.artifact) {
      // Existence is checked only after successful compilation; cached Gradle outputs are valid.
      record(`Expected artifact: ${check.artifact}`);
    }
    const command = check.script ? 'npm' : check.command;
    const commandArgs = check.script ? ['run', '--silent', check.script, '--', ...(check.args || [])] : (check.args || []);
    const child = spawn(command, commandArgs, {
      cwd: path.resolve(root, check.cwd || '.'),
      env: { ...process.env, CI: 'true', NO_COLOR: '1', FORCE_COLOR: '0', npm_config_offline: 'true', npm_config_audit: 'false', npm_config_update_notifier: 'false', ...check.env },
      stdio: ['ignore', 'pipe', 'pipe'], detached: true,
    });
    currentChild = child;
    const readers = [child.stdout, child.stderr].map(stream => createInterface({ input: stream }));
    readers.forEach(reader => reader.on('line', record));
    const timer = setTimeout(() => {
      timedOut = true;
      terminate('SIGTERM');
      killTimer = setTimeout(() => terminate('SIGKILL'), 3000);
    }, check.timeoutMs || 600000);
    code = await new Promise(resolve => {
      child.on('error', error => record(error.message));
      child.on('close', status => resolve(status ?? 1));
    });
    clearTimeout(timer);
    clearTimeout(killTimer);
    currentChild = undefined;
    if (timedOut) { record('FAIL: check exceeded its timeout (including any lingering test handles).'); code = 1; }
    if (outputFailure) { record('FAIL: test runner reported open handles after completing; verification will not force a passing exit.'); code = 1; }
    if (code === 0 && check.artifact) {
      const artifact = path.join(root, check.artifact);
      if (!existsSync(artifact) || !statSync(artifact).isFile() || statSync(artifact).size === 0) {
        record('FAIL: expected nonempty release artifact is missing.');
        code = 1;
      } else {
        print(`Artifact: ${check.artifact} (${(statSync(artifact).size / 1048576).toFixed(2)} MiB)`);
      }
    }
  } catch (error) { record(error.message); code = 1; }
  finally { closeSync(fd); }
  const result = { id: check.id, label: check.label, status: code === 0 ? 'PASS' : 'FAIL', seconds: +((performance.now() - start) / 1000).toFixed(2), exitCode: code, log: path.relative(root, log) };
  print(`${check.label.padEnd(20)} ${result.status.padEnd(16)} ${result.seconds}s`);
  if (code !== 0) {
    for (const line of [...new Set([...highlights, ...details])].slice(0, 18)) print(`  ${line.slice(0, 500)}`);
    print(`Log: ${result.log}`);
  } else {
    // Keep existing test-runner skips and warning summaries visible even on success.
    for (const line of details.filter(line => /Tests:|Test Suites:|Test Files|Tests\s+\d|# (tests|pass|fail|skipped)|skipped|warnings?\b/i.test(line))) print(`  ${line.slice(0, 500)}`);
  }
  return result;
}

print(`StayCT Verification\nRepository: ${config.repository}\nMode: ${mode}${plan ? ' (PLAN ONLY; commands unexecuted)' : ''}`);
for (const check of active) {
  if (interrupted) break;
  if (!check.command && !check.script) {
    print(`${check.label.padEnd(20)} NOT CONFIGURED   ${check.reason || ''}`);
    results.push({ id: check.id, status: 'NOT CONFIGURED', reason: check.reason });
  } else if (plan) {
    print(`${check.id}: ${check.script ? `npm run ${check.script} --` : check.command} ${(check.args || []).join(' ')}${check.cwd ? ` [cwd: ${check.cwd}]` : ''}`);
    if (check.artifact) print(`  artifact: ${check.artifact}`);
  } else {
    results.push(await run(check));
  }
}
for (const note of config.notes?.[mode] || []) print(`NOTE: ${note}`);
const failed = interrupted || results.some(result => result.status === 'FAIL');
const unavailable = results.some(result => result.status === 'NOT CONFIGURED');
const status = plan ? 'PLAN' : failed ? 'FAIL' : unavailable ? 'INCOMPLETE' : 'PASS';
print(`RESULT: ${status}\nTOTAL: ${((performance.now() - started) / 1000).toFixed(2)}s`);
if (!plan) {
  const summary = path.join(runDirectory, 'summary.json');
  writeFileSync(summary, `${JSON.stringify({ repository: config.repository, mode, status, seconds: +((performance.now() - started) / 1000).toFixed(2), checks: results, notes: config.notes?.[mode] || [] }, null, 2)}\n`, { mode: 0o600 });
  print(`Summary: ${path.relative(root, summary)}`);
}
process.exitCode = interrupted ? 130 : failed ? 1 : unavailable && !plan ? 2 : 0;
