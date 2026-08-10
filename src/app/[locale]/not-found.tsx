import type { Metadata } from 'next';
import NotFoundContent from './not-found-content';

// Overrides the root layout's homepage title/canonical/index:true, which
// would otherwise be inherited by every 404 response on the site.
export const metadata: Metadata = {
  title: 'Page Not Found | Or Hakerem',
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
