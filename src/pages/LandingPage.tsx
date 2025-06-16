
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Shield, 
  Smartphone, 
  Download,
  Users,
  BarChart3,
  CheckCircle,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PWAInstallButton from '@/components/PWAInstallButton';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Lacak posisi kurir dan status pengiriman secara real-time"
    },
    {
      icon: Clock,
      title: "Workflow Otomatis",
      description: "Sistem workflow harian yang terstruktur dan efisien"
    },
    {
      icon: Shield,
      title: "Keamanan Tinggi",
      description: "Sistem keamanan berlapis dengan enkripsi data"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Laporan performa dan analytics yang komprehensif"
    }
  ];

  const roles = [
    {
      title: "Master Admin",
      description: "Kontrol penuh sistem dan manajemen semua pengguna",
      features: ["Manage semua role", "Approval sistem", "Analytics global"]
    },
    {
      title: "Admin",
      description: "Manajemen PIC dan kurir dalam organisasi",
      features: ["Manage PIC & Kurir", "Monitor performa", "Generate reports"]
    },
    {
      title: "PIC",
      description: "Koordinasi dan supervisi tim kurir harian",
      features: ["Manage kurir", "Track delivery", "Daily reports"]
    },
    {
      title: "Kurir Mobile",
      description: "Aplikasi mobile untuk workflow harian kurir",
      features: ["Scan packages", "Update status", "Real-time tracking"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">INSAN MOBILE</h1>
              <p className="text-sm text-gray-600">Powered by PARA</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <PWAInstallButton />
            <Button onClick={() => navigate('/login')} variant="outline">
              Dashboard Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <Badge className="mb-4 bg-blue-100 text-blue-800">
          🚀 Ready for PWA & Android
        </Badge>
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Sistem Kurir <span className="text-blue-600">Professional</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Platform terintegrasi untuk manajemen kurir dengan teknologi AI terdepan, 
          tracking real-time, dan workflow otomatis untuk efisiensi maksimal.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            onClick={() => navigate('/auth')}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
          >
            <Smartphone className="mr-2 h-5 w-5" />
            Akses Kurir Mobile
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/login')}
            className="text-lg px-8 py-4"
          >
            <Users className="mr-2 h-5 w-5" />
            Dashboard Admin
          </Button>
        </div>

        {/* Download PWA Section */}
        <Card className="max-w-md mx-auto mb-12 border-2 border-blue-200 bg-blue-50">
          <CardHeader className="text-center">
            <Download className="mx-auto h-12 w-12 text-blue-600 mb-2" />
            <CardTitle className="text-blue-800">Install Mobile App</CardTitle>
            <CardDescription>
              Download aplikasi untuk pengalaman mobile terbaik
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-3">
            <PWAInstallButton />
            <p className="text-xs text-gray-600">
              Kompatibel dengan Android • Offline Support • Push Notifications
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Fitur Unggulan
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Roles Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Role & Akses Sistem
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo Access Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">🎯 Demo Access</CardTitle>
            <CardDescription>
              Coba semua fitur dengan akun demo yang tersedia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Dashboard Admin (Web)
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-gray-50 rounded">
                    <strong>Master Admin:</strong> MASTERADMIN2025 / 123456
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <strong>Admin:</strong> ADMIN2025 / 123456
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <strong>PIC:</strong> PIC2025 / 123456
                  </div>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => navigate('/login')}
                >
                  Akses Dashboard
                </Button>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Kurir Mobile (PWA)
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded">
                    <strong>Kurir Demo:</strong> PISTEST2025 / 123456
                  </div>
                  <div className="p-3 bg-green-50 rounded text-green-800">
                    <Star className="inline h-4 w-4 mr-1" />
                    <strong>Install PWA untuk pengalaman terbaik!</strong>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700" 
                  onClick={() => navigate('/auth')}
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Akses Mobile App
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>© 2025 INSAN MOBILE - Powered by PARA Technology</p>
        <p className="text-sm mt-2">Professional Courier Management System</p>
      </footer>
    </div>
  );
};

export default LandingPage;
