import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          background: '#fff',
          color: '#A5382B',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px',
          padding: '16px',
        },
        success: {
          iconTheme: {
            primary: '#A5382B',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
