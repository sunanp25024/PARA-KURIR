
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LandingPage from './LandingPage';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Check if running as PWA/standalone app
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                  (window.navigator as any).standalone === true ||
                  document.referrer.includes('android-app://');

    if (!loading && isPWA) {
      // If PWA/standalone mode, redirect based on auth status
      if (user) {
        navigate('/kurir-mobile');
      } else {
        navigate('/auth');
      }
    }
    // If not PWA (regular web browser), show landing page
  }, [user, loading, navigate]);

  // Show loading while checking auth status for PWA
  const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                (window.navigator as any).standalone === true ||
                document.referrer.includes('android-app://');

  if (loading && isPWA) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  // For regular web browsers, show landing page
  return <LandingPage />;
};

export default Index;
