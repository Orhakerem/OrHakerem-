'use client';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cream z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full animate-ping bg-primary/20"></div>
        <div className="absolute inset-2 rounded-full animate-pulse bg-primary"></div>
        <div className="absolute inset-4 rounded-full animate-pulse bg-secondary"></div>
        <div className="absolute inset-6 rounded-full animate-pulse bg-tertiary"></div>
      </div>
    </div>
  );
}
