import { permanentRedirect } from 'next/navigation';

export default function CancellationPage() {
  permanentRedirect('/terms');
}
