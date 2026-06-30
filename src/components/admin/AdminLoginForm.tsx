'use client';

import { type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

import { loginAdmin } from '@/actions/admin';

const INPUT_CLASS =
  'h-12 w-full rounded-xl border-2 border-secondary/40 bg-white px-4 text-base text-black placeholder-primary/40 outline-none transition-colors duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/15';
const LABEL_CLASS = 'mb-2 block text-sm font-medium text-black/80';

export default function AdminLoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await loginAdmin(new FormData(event.currentTarget));
      if (result.success) {
        router.replace('/admin');
        router.refresh();
        return;
      }
      setError(result.error ?? 'Invalid email or password');
      setIsSubmitting(false);
    } catch (err) {
      console.error('Admin login failed:', err);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-24">
      <div className="w-full max-w-md rounded-3xl border border-primary/10 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary/70">
            Or Hakerem
          </p>
          <h1 className="mt-2 font-head text-3xl font-light tracking-h2 text-black">
            Back office
          </h1>
          <p className="mt-2 text-sm text-black/60">Sign in to manage reservation quotes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email" className={LABEL_CLASS}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="you@example.com"
              required
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="password" className={LABEL_CLASS}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••"
              required
              className={INPUT_CLASS}
            />
          </div>

          {error ? (
            <p
              role="alert"
              data-testid="login-error"
              className="rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary"
            >
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="button-hover-clean inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-cream shadow-lg transition-all duration-300 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
