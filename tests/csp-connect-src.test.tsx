import assert from 'node:assert/strict';
import test from 'node:test';

import { buildContentSecurityPolicy, resolvePublicApiConnectSrcOrigin } from '../src/config/csp';

test('strips /api/v1 and returns the configured API origin', () => {
  assert.equal(
    resolvePublicApiConnectSrcOrigin('http://172.20.10.2:4000/api/v1'),
    'http://172.20.10.2:4000',
  );
});

test('dev CSP connect-src allows the configured API origin only', () => {
  const csp = buildContentSecurityPolicy({
    apiBaseUrl: 'http://172.20.10.2:4000/api/v1',
    isProduction: false,
  });

  assert.match(csp, /connect-src 'self' http:\/\/172\.20\.10\.2:4000(?:;|$)/);
  assert.doesNotMatch(csp, /192\.168\.1\.12/);
  assert.doesNotMatch(csp, /connect-src [^;]*\*/);
  assert.doesNotMatch(csp, /connect-src [^;]*http:(?:;|$| )/);
  assert.doesNotMatch(csp, /upgrade-insecure-requests/);
});

test('production CSP stays restrictive and keeps upgrade-insecure-requests', () => {
  const csp = buildContentSecurityPolicy({
    apiBaseUrl: 'https://api.stayct.in/api/v1',
    isProduction: true,
  });

  assert.match(csp, /connect-src 'self' https:\/\/api\.stayct\.in(?:;|$)/);
  assert.match(csp, /upgrade-insecure-requests/);
  assert.doesNotMatch(csp, /192\.168\.1\.12/);
  assert.doesNotMatch(csp, /connect-src [^;]*\*/);
});

test('missing API base URL keeps connect-src at self only', () => {
  const csp = buildContentSecurityPolicy({
    apiBaseUrl: undefined,
    isProduction: true,
  });

  assert.match(csp, /connect-src 'self'(?:;|$)/);
  assert.doesNotMatch(csp, /connect-src 'self' http/);
  assert.match(csp, /upgrade-insecure-requests/);
});

test('rejects wildcards, scheme-only tokens, and invalid URLs', () => {
  assert.equal(resolvePublicApiConnectSrcOrigin('*'), null);
  assert.equal(resolvePublicApiConnectSrcOrigin('http:'), null);
  assert.equal(resolvePublicApiConnectSrcOrigin('https:'), null);
  assert.equal(resolvePublicApiConnectSrcOrigin('ftp://api.example.com'), null);
  assert.equal(resolvePublicApiConnectSrcOrigin('not-a-url'), null);
  assert.equal(resolvePublicApiConnectSrcOrigin(''), null);
});
