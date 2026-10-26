export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-50 grid place-items-center bg-stayct-beige/85 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stayct-green-dark/15 border-t-stayct-green-dark" />
        <p className="text-sm font-semibold tracking-[0.08em] text-stayct-green-dark uppercase">Loading</p>
      </div>
    </div>
  );
}
