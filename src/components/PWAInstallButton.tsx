
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { toast } from '@/hooks/use-toast';

const PWAInstallButton = () => {
  const { isInstallable, isInstalled, installPWA } = usePWA();

  const handleInstall = async () => {
    const success = await installPWA();
    if (success) {
      toast({
        title: "Aplikasi Berhasil Diinstall",
        description: "INSAN MOBILE telah ditambahkan ke home screen Anda",
      });
    } else {
      toast({
        title: "Gagal Install Aplikasi",
        description: "Silakan coba lagi atau install melalui browser menu",
        variant: "destructive"
      });
    }
  };

  if (isInstalled) {
    return (
      <Button disabled className="bg-green-100 text-green-700 border-green-200">
        <Smartphone className="mr-2 h-4 w-4" />
        Sudah Terinstall
      </Button>
    );
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <Button onClick={handleInstall} className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
      <Download className="mr-2 h-4 w-4" />
      Install Aplikasi
    </Button>
  );
};

export default PWAInstallButton;
