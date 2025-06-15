
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  Package, 
  Shield, 
  Clock, 
  BarChart3, 
  MapPin, 
  Camera, 
  CheckCircle, 
  Users, 
  Monitor,
  Smartphone,
  Download,
  Star,
  Zap,
  Globe
} from 'lucide-react';
import PWAInstallButton from '@/components/PWAInstallButton';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Package,
      title: "Manajemen Paket Real-time",
      description: "Pantau status pengiriman paket secara real-time dengan sistem tracking terintegrasi yang akurat dan responsif"
    },
    {
      icon: Camera,
      title: "Bukti Foto Pengiriman",
      description: "Dokumentasi foto otomatis untuk setiap pengiriman sebagai bukti valid dengan timestamp dan lokasi GPS"
    },
    {
      icon: MapPin,
      title: "Tracking GPS Akurat",
      description: "Pelacakan lokasi kurir secara real-time untuk transparansi pengiriman dan estimasi waktu tiba"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Laporan performa dan analitik mendalam untuk optimasi operasional dengan visualisasi data interaktif"
    },
    {
      icon: Shield,
      title: "Keamanan Data Terjamin",
      description: "Sistem keamanan berlapis dengan enkripsi end-to-end untuk melindungi data sensitif perusahaan"
    },
    {
      icon: Clock,
      title: "Efisiensi Waktu",
      description: "Otomatisasi proses yang mengurangi waktu administrasi hingga 70% dengan workflow yang dioptimalkan"
    }
  ];

  const advantages = [
    "Peningkatan efisiensi operasional hingga 80%",
    "Transparansi penuh dalam proses pengiriman",
    "Dokumentasi digital yang akurat dan tersimpan aman",
    "Monitoring real-time untuk semua level manajemen",
    "Integrasi mudah dengan sistem existing",
    "Support 24/7 dan training komprehensif"
  ];

  const userRoles = [
    {
      role: "MASTER ADMIN",
      description: "Kontrol penuh sistem, manajemen user, dan akses ke semua fitur dengan dashboard executive",
      icon: Users,
      color: "bg-red-100 text-red-700 border-red-200"
    },
    {
      role: "ADMIN",
      description: "Manajemen operasional, monitoring, dan laporan performa dengan kontrol tingkat menengah",
      icon: Monitor,
      color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      role: "PIC",
      description: "Pengawasan lapangan, koordinasi kurir, dan monitoring real-time dengan dashboard operasional",
      icon: BarChart3,
      color: "bg-green-100 text-green-700 border-green-200"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Paket Terkirim", icon: Package },
    { number: "99.8%", label: "Tingkat Akurasi", icon: Star },
    { number: "24/7", label: "Support Aktif", icon: Clock },
    { number: "50+", label: "Kota Terjangkau", icon: Globe }
  ];

  const handleDownloadAPK = () => {
    // Redirect ke halaman mobile kurir untuk demo
    navigate('/kurir-mobile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-white/90 backdrop-blur-md p-2 sm:p-3 rounded-xl shadow-lg border border-gray-200/50">
                <img 
                  src="/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png" 
                  alt="PARA Logo" 
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-900 to-blue-800 bg-clip-text text-transparent">
                  INSAN MOBILE
                </h1>
                <p className="text-xs sm:text-sm text-indigo-600 font-medium">Kurir Professional System</p>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <div className="hidden sm:block">
                <PWAInstallButton />
              </div>
              <Button 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200 text-xs sm:text-sm px-3 sm:px-4 py-2"
                size="sm"
              >
                <Monitor className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Login Dashboard</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-blue-600/10 -z-10"></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 hover:from-indigo-200 hover:to-blue-200 text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 shadow-md">
            <Zap className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Solusi Kurir Terdepan di Indonesia
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
            Revolusi Sistem
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
              Kurir Digital
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Platform manajemen kurir terlengkap dengan teknologi AI dan real-time tracking 
            untuk mengoptimalkan operasional pengiriman Anda dengan efisiensi maksimal
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-white/30">
                <div className="bg-gradient-to-r from-indigo-100/80 to-blue-100/80 backdrop-blur-sm w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              onClick={() => navigate('/login')}
            >
              <Monitor className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Akses Dashboard Web
            </Button>
            <div className="sm:hidden">
              <PWAInstallButton />
            </div>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              onClick={handleDownloadAPK}
            >
              <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Coba Mobile Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white/50 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-white/30 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <Badge className="mb-3 sm:mb-4 bg-indigo-100/80 backdrop-blur-sm text-indigo-700 px-3 sm:px-4 py-1 sm:py-2 border border-white/30 text-xs sm:text-sm">
              Fitur Unggulan
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Teknologi Terdepan
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Solusi komprehensif dengan teknologi AI dan machine learning untuk mendukung 
              operasional kurir yang efisien dan profesional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/70 backdrop-blur-sm h-full">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="bg-gradient-to-r from-indigo-100/80 to-blue-100/80 backdrop-blur-sm w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-md border border-white/30">
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-indigo-50/80 to-blue-50/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-blue-600/5 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <Badge className="mb-3 sm:mb-4 bg-white/80 backdrop-blur-sm text-indigo-700 px-3 sm:px-4 py-1 sm:py-2 shadow-md border border-white/30 text-xs sm:text-sm">
              Keunggulan Kompetitif
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Mengapa INSAN MOBILE?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Ribuan perusahaan telah mempercayai INSAN MOBILE sebagai solusi kurir terdepan
              dengan track record yang terbukti
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-center space-x-3 sm:space-x-4 bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-green-100/80 to-emerald-100/80 backdrop-blur-sm p-2 rounded-lg flex-shrink-0 border border-white/30">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base lg:text-lg">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <Badge className="mb-3 sm:mb-4 bg-indigo-100/80 backdrop-blur-sm text-indigo-700 px-3 sm:px-4 py-1 sm:py-2 border border-white/30 text-xs sm:text-sm">
              Akses Multi-Level
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Dashboard Terintegrasi
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Sistem role-based yang disesuaikan dengan kebutuhan setiap tingkatan manajemen
              untuk kontrol dan monitoring yang optimal
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {userRoles.map((user, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-white/30 h-full">
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${user.color} mx-auto flex items-center justify-center mb-4 sm:mb-6 shadow-lg backdrop-blur-sm border border-white/30`}>
                    <user.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold">{user.role}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {user.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto max-w-sm mx-auto"
              onClick={() => navigate('/login')}
            >
              <Monitor className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Login ke Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Kurir Mobile App Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="bg-white/20 backdrop-blur-sm w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl border border-white/30">
            <Smartphone className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Progressive Web App (PWA)
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Nikmati pengalaman aplikasi native dengan PWA yang dapat diinstall langsung dari browser, 
            bekerja offline, dan memberikan performa optimal di semua perangkat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md sm:max-w-none mx-auto">
            <PWAInstallButton />
            <Button 
              size="lg" 
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 border-2 border-white/80 text-white hover:bg-white/20 backdrop-blur-sm shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              onClick={handleDownloadAPK}
            >
              <Smartphone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Coba Mobile Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/95 backdrop-blur-sm text-white py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg border border-gray-600/30">
                  <img 
                    src="/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png" 
                    alt="PARA Logo" 
                    className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                    INSAN MOBILE
                  </h3>
                  <p className="text-gray-400 font-medium text-sm sm:text-base">Kurir Professional System</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed text-sm sm:text-base lg:text-lg">
                Solusi teknologi terdepan untuk manajemen kurir yang efisien, 
                transparan, dan dapat diandalkan dengan dukungan AI terbaru.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 sm:mb-6 text-base sm:text-lg">Produk & Layanan</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li className="hover:text-white transition-colors cursor-pointer">Dashboard Web</li>
                <li className="hover:text-white transition-colors cursor-pointer">Aplikasi Mobile Kurir</li>
                <li className="hover:text-white transition-colors cursor-pointer">Real-time Tracking</li>
                <li className="hover:text-white transition-colors cursor-pointer">Analytics & Reports</li>
                <li className="hover:text-white transition-colors cursor-pointer">API Integration</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 sm:mb-6 text-base sm:text-lg">Support & Bantuan</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li className="hover:text-white transition-colors cursor-pointer">Dokumentasi Lengkap</li>
                <li className="hover:text-white transition-colors cursor-pointer">Training Program</li>
                <li className="hover:text-white transition-colors cursor-pointer">24/7 Customer Support</li>
                <li className="hover:text-white transition-colors cursor-pointer">FAQ & Tutorial</li>
                <li className="hover:text-white transition-colors cursor-pointer">Community Forum</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
              © 2025 INSAN MOBILE powered by PARA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
