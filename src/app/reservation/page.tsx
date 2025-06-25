import dynamic from 'next/dynamic';

// Dynamically import the ReservationForm component with SSR disabled
const ReservationForm = dynamic(() => import('./reservation-form'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-6">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function Reservation() {
  return <ReservationForm />;
}