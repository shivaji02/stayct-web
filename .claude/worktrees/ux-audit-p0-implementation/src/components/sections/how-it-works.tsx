export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Browse',
      description:
        'Explore verified accommodation across every category. Filter by location, type, price, and what matters most to you.',
    },
    {
      number: '02',
      title: 'Connect',
      description:
        'Reach out directly to property operators. Ask questions, schedule a visit, and see the place before you decide — no broker involved.',
    },
    {
      number: '03',
      title: 'Move In',
      description:
        'Choose the stay that feels right. No brokerage, no hidden fees. Just your new home, on your terms.',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[5fr_4fr] lg:gap-20">
          <div className="col-span-1">
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[.13em] text-stayct-green-accent">
              Simple Process
            </p>
            <h2 className="mb-10 text-[32px] font-black leading-[1.12] tracking-[-.02em] text-stayct-green-dark sm:mb-14 sm:text-[36px]">
              Finding a stay is simple.
            </h2>

            <div className="flex flex-col">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-4 sm:flex-row sm:gap-7 ${idx < steps.length - 1 ? 'border-b border-stayct-border-light pb-8 sm:pb-9' : 'pt-8 sm:pt-9'} ${idx > 0 ? 'pt-8 sm:pt-9' : ''}`}
                >
                  <div className="w-6 flex-shrink-0 text-[12px] font-black text-stayct-green-accent pt-0 sm:pt-1">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="mb-2.5 text-[21px] font-black text-stayct-green-dark">
                      {step.title}
                    </h3>
                    <p className="text-[15px] leading-[1.75] text-stayct-green-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[320px] flex-col items-center justify-end overflow-hidden rounded-[20px] bg-gradient-to-br from-stayct-beige/60 to-stayct-beige pb-7 sm:min-h-[420px] lg:min-h-[460px]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 420 460"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="420" height="460" fill="#f8ede0" />
              <circle cx="210" cy="200" r="180" fill="#f2dfc0" opacity="0.5" />
              <circle cx="60" cy="80" r="110" fill="#ecd4a8" opacity="0.25" />
              <circle cx="360" cy="360" r="130" fill="#e8cca0" opacity="0.2" />
              <rect x="145" y="110" width="130" height="180" rx="65" fill="none" stroke="#d4a870" strokeWidth="2" opacity="0.55" />
              <line x1="210" y1="110" x2="210" y2="290" stroke="#d4a870" strokeWidth="1.5" opacity="0.55" />
              <line x1="145" y1="200" x2="275" y2="200" stroke="#d4a870" strokeWidth="1.5" opacity="0.55" />
              <circle cx="210" cy="330" r="16" fill="none" stroke="#d4a870" strokeWidth="1.5" opacity="0.4" />
              <line x1="210" y1="314" x2="210" y2="304" stroke="#d4a870" strokeWidth="1.5" opacity="0.4" />
              <line x1="80" y1="360" x2="120" y2="360" stroke="#d4a870" strokeWidth="1" opacity="0.3" />
              <line x1="300" y1="380" x2="360" y2="380" stroke="#d4a870" strokeWidth="1" opacity="0.3" />
            </svg>
            <span className="relative z-10 text-[11px] font-semibold tracking-[.12em] uppercase text-center text-amber-800">
              room interior · warm natural light
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
