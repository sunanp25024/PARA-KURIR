
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
  Download
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Package,
      title: "Manajemen Paket Real-time",
      description: "Pantau status pengiriman paket secara real-time dengan sistem tracking terintegrasi"
    },
    {
      icon: Camera,
      title: "Bukti Foto Pengiriman",
      description: "Dokumentasi foto otomatis untuk setiap pengiriman sebagai bukti valid"
    },
    {
      icon: MapPin,
      title: "Tracking GPS Akurat",
      description: "Pelacakan lokasi kurir secara real-time untuk transparansi pengiriman"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Laporan performa dan analitik mendalam untuk optimasi operasional"
    },
    {
      icon: Shield,
      title: "Keamanan Data Terjamin",
      description: "Sistem keamanan berlapis untuk melindungi data sensitif perusahaan"
    },
    {
      icon: Clock,
      title: "Efisiensi Waktu",
      description: "Otomatisasi proses yang mengurangi waktu administrasi hingga 70%"
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
      description: "Kontrol penuh sistem, manajemen user, dan akses ke semua fitur",
      icon: Users,
      color: "bg-red-100 text-red-700 border-red-200"
    },
    {
      role: "ADMIN",
      description: "Manajemen operasional, monitoring, dan laporan performa",
      icon: Monitor,
      color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      role: "PIC",
      description: "Pengawasan lapangan, koordinasi kurir, dan monitoring real-time",
      icon: BarChart3,
      color: "bg-green-100 text-green-700 border-green-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-indigo-900">INSAN MOBILE</h1>
                <p className="text-sm text-indigo-600">Kurir Professional System</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Login Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
            Solusi Kurir Terdepan di Indonesia
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolusi Sistem
            <span className="text-indigo-600"> Kurir Digital</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Platform manajemen kurir terlengkap dengan teknologi AI dan real-time tracking 
            untuk mengoptimalkan operasional pengiriman Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3"
              onClick={() => navigate('/login')}
            >
              <Monitor className="mr-2 h-5 w-5" />
              Akses Dashboard Web
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              <Download className="mr-2 h-5 w-5" />
              Download APK Kurir
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Teknologi terdepan untuk mendukung operasional kurir yang efisien dan profesional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Keunggulan INSAN MOBILE
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mengapa ribuan perusahaan memilih INSAN MOBILE sebagai solusi kurir mereka
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Akses Multi-Level
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sistem role-based yang disesuaikan dengan kebutuhan setiap tingkatan manajemen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userRoles.map((user, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${user.color} mx-auto flex items-center justify-center mb-4`}>
                    <user.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{user.role}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 text-base">
                    {user.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3"
              onClick={() => navigate('/login')}
            >
              Login ke Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Kurir Mobile App Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Smartphone className="h-16 w-16 mx-auto mb-6 text-indigo-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Aplikasi Mobile Khusus Kurir
          </h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            Download aplikasi mobile yang dirancang khusus untuk kurir dengan fitur scanning, 
            foto bukti pengiriman, dan tracking real-time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100"
            >
              <Download className="mr-2 h-5 w-5" />
              Download APK Kurir
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-indigo-600"
            >
              Panduan Instalasi
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">INSAN MOBILE</h3>
                  <p className="text-gray-400">Kurir Professional System</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                Solusi teknologi terdepan untuk manajemen kurir yang efisien, 
                transparan, dan dapat diandalkan.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Dashboard Web</li>
                <li>Aplikasi Mobile Kurir</li>
                <li>Real-time Tracking</li>
                <li>Analytics & Reports</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Dokumentasi</li>
                <li>Training Program</li>
                <li>24/7 Support</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 INSAN MOBILE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
