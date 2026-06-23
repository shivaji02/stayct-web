export function TrustSection() {
  const trustItems = [
    {
      title: 'Verified Listings',
      description: 'Every property reviewed before it goes live on STAYCT',
    },
    {
      title: 'Direct Connection',
      description: 'Talk to operators directly. No brokers. No middlemen.',
    },
    {
      title: 'Zero Brokerage',
      description: 'Transparent pricing, always. No hidden fees, no commissions.',
    },
    {
      title: 'All Categories',
      description: '8 accommodation types today, with more as STAYCT grows.',
    },
  ];

  return (
    <section className="bg-stayct-green-dark py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:items-center">
          <div className="col-span-1">
            <h2 className="mb-5 text-[34px] font-black leading-[1.1] tracking-[-.02em] text-white sm:text-[40px]">
              Built on trust.<br />
              Designed for people.
            </h2>
            <p className="max-w-[340px] text-[16px] leading-[1.75] text-stayct-green-lighter">
              Rental accommodation should feel like home from the very first search. STAYCT is built to make that possible.
            </p>
          </div>

          <div className="col-span-1 grid gap-3.5 sm:grid-cols-2">
            {trustItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[14px] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6"
              >
                <div className="mb-2 text-[14px] font-black text-stayct-overlay-light">
                  {item.title}
                </div>
                <div className="text-[14px] leading-[1.6] text-stayct-text-link">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
