export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6" aria-busy="true">
      <div className="mb-8 border-b border-primary/15 pb-6">
        <div className="h-3 w-40 animate-pulse rounded bg-primary/10" />
        <div className="mt-3 h-9 w-64 animate-pulse rounded bg-primary/10" />
        <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-primary/5" />
        <div className="mt-6 flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4].map((item) => (
            <div key={item} className="h-9 w-24 animate-pulse rounded-full bg-primary/5" />
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div className="h-32 animate-pulse rounded-2xl border border-primary/10 bg-white/60" />
        <div className="h-72 animate-pulse rounded-2xl border border-primary/10 bg-white/60" />
      </div>
    </div>
  );
}
