import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-head text-6xl font-light text-primary">404</p>
      <h1 className="mt-4 font-head text-2xl font-light text-black">Page not found</h1>
      <p className="mt-2 max-w-md font-body text-black/70">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-6 py-3 font-body text-sm text-white transition hover:bg-primary/90"
      >
        Back to home
      </Link>
    </div>
  );
}
