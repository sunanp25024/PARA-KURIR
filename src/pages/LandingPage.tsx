import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, ShieldCheck, Users, LayoutDashboard, Settings, Smartphone, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const handleDownloadAPK = () => {
    const link = document.createElement('a');
    link.href = '/insan-mobile-kurir.apk';
    link.download = 'INSAN-MOBILE-Kurir.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="bg-transparent py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            INSAN MOBILE
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:text-blue-200">
              Login
            </Link>
            <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Sistem Manajemen Kurir Profesional dengan Teknologi AI
          </h1>
          <p className="text-xl text-blue-200 mb-12">
            Optimalkan operasional kurir Anda dengan fitur tracking real-time, analisis kinerja, dan otomatisasi tugas.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
              <Link to="/dashboard">Lihat Dashboard</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Teknologi canggih untuk mendukung operasional kurir yang efisien dan terpercaya
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Feature Card 1 */}
            <div className="bg-blue-800 bg-opacity-20 rounded-lg p-6 hover:bg-opacity-40 transition-colors duration-300">
              <Rocket className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Optimasi Rute Otomatis
              </h3>
              <p className="text-blue-200">
                Algoritma cerdas untuk menentukan rute tercepat dan efisien.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-blue-800 bg-opacity-20 rounded-lg p-6 hover:bg-opacity-40 transition-colors duration-300">
              <ShieldCheck className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Keamanan Data Terenkripsi
              </h3>
              <p className="text-blue-200">
                Melindungi informasi sensitif dengan enkripsi end-to-end.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-blue-800 bg-opacity-20 rounded-lg p-6 hover:bg-opacity-40 transition-colors duration-300">
              <Users className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Manajemen Pengguna Terpusat
              </h3>
              <p className="text-blue-200">
                Kontrol akses dan peran pengguna dengan mudah.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-blue-800 bg-opacity-20 rounded-lg p-6 hover:bg-opacity-40 transition-colors duration-300">
              <LayoutDashboard className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Dashboard Analitik Real-time
              </h3>
              <p className="text-blue-200">
                Pantau kinerja kurir dan lacak pengiriman secara langsung.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-blue-800 bg-opacity-20 rounded-lg p-6 hover:bg-opacity-40 transition-colors duration-300">
              <Settings className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Konfigurasi Fleksibel
              </h3>
              <p className="text-blue-200">
                Sesuaikan sistem dengan kebutuhan spesifik bisnis Anda.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-blue-800 bg-opacity-20 rounded-lg p-6 hover:bg-opacity-40 transition-colors duration-300">
              <Smartphone className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Aplikasi Mobile Kurir
              </h3>
              <p className="text-blue-200">
                Permudah kurir dalam menjalankan tugas dengan aplikasi mobile.
              </p>
            </div>
          </div>

          {/* Download Options */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Coba Aplikasi Kurir</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('/kurir-mobile', '_blank')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Coba Web App
              </Button>
              <Button 
                onClick={handleDownloadAPK}
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download APK
              </Button>
            </div>
            <p className="text-blue-200 mt-4 text-sm">
              Web App dapat diinstall sebagai PWA • APK untuk Android
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-900 bg-opacity-30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Apa Kata Mereka?
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Testimonial 1 */}
            <div className="bg-blue-800 bg-opacity-20 rounded-lg p-6">
              <p className="text-blue-200 italic mb-4">
                "Sistem ini sangat membantu kami dalam meningkatkan efisiensi pengiriman. Fitur tracking real-time sangat berguna!"
              </p>
              <p className="text-white font-semibold">
                - John Doe, Manajer Logistik
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-blue-800 bg-opacity-20 rounded-lg p-6">
              <p className="text-blue-200 italic mb-4">
                "Aplikasi mobile kurir sangat memudahkan kurir kami di lapangan. Pengiriman jadi lebih cepat dan akurat."
              </p>
              <p className="text-white font-semibold">
                - Jane Smith, Kepala Operasional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 py-8 text-center">
        <p className="text-blue-300">
          &copy; {new Date().getFullYear()} INSAN MOBILE. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
