import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Eye, EyeOff, Users, Shield, UserCheck, Truck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface TestAccount {
  role: string;
  email: string;
  password: string;
  name: string;
  description: string;
  allowedPages: string[];
  icon: React.ReactNode;
  color: string;
}

export const TestingGuide: React.FC = () => {
  const [showPasswords, setShowPasswords] = useState(false);

  const testAccounts: TestAccount[] = [
    {
      role: 'master_admin',
      email: 'masteradmin@insanmobile.com',
      password: '123456',
      name: 'Master Administrator',
      description: 'Akses penuh ke semua fitur sistem',
      allowedPages: ['Dashboard', 'Manage Admin', 'Manage PIC', 'Manage Kurir', 'Persetujuan', 'Reports', 'Send Notification'],
      icon: <Shield className="w-4 h-4" />,
      color: 'bg-red-500'
    },
    {
      role: 'admin',
      email: 'admin@insanmobile.com',
      password: '123456',
      name: 'Admin User',
      description: 'Akses administrasi dan manajemen kurir',
      allowedPages: ['Dashboard', 'Manage Kurir', 'Approval Requests', 'Reports', 'Send Notification'],
      icon: <Users className="w-4 h-4" />,
      color: 'bg-blue-500'
    },
    {
      role: 'pic',
      email: 'pic@insanmobile.com',
      password: '123456',
      name: 'PIC User',
      description: 'Akses monitoring dan laporan',
      allowedPages: ['Dashboard', 'Attendance', 'Performance', 'Notifications', 'Approval Status'],
      icon: <UserCheck className="w-4 h-4" />,
      color: 'bg-green-500'
    },
    {
      role: 'kurir',
      email: 'kurir@insanmobile.com',
      password: '123456',
      name: 'Kurir User',
      description: 'Akses mobile workflow kurir',
      allowedPages: ['Dashboard', 'Kurir Mobile', 'Settings'],
      icon: <Truck className="w-4 h-4" />,
      color: 'bg-orange-500'
    }
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} berhasil disalin ke clipboard`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Panduan Testing Role-Based Access</h2>
        <p className="text-muted-foreground">Gunakan akun testing berikut untuk menguji akses setiap role</p>
      </div>

      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-sm">
          Total: {testAccounts.length} Test Accounts
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPasswords(!showPasswords)}
        >
          {showPasswords ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showPasswords ? 'Sembunyikan' : 'Tampilkan'} Password
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testAccounts.map((account, index) => (
          <Card key={index} className="border-l-4" style={{ borderLeftColor: account.color.replace('bg-', '#') }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${account.color} text-white`}>
                    {account.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{account.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {account.role.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm">
                {account.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email:</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {account.email}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(account.email, 'Email')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Password:</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {showPasswords ? account.password : '••••••••'}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(account.password, 'Password')}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium mb-2 block">Halaman yang Dapat Diakses:</span>
                <div className="flex flex-wrap gap-1">
                  {account.allowedPages.map((page, pageIndex) => (
                    <Badge key={pageIndex} variant="outline" className="text-xs">
                      {page}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-800">Petunjuk Testing</CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 space-y-2">
          <p>1. Logout dari akun saat ini jika sudah login</p>
          <p>2. Pilih salah satu akun testing di atas</p>
          <p>3. Copy email dan password, lalu login</p>
          <p>4. Coba akses berbagai halaman untuk memverifikasi role-based access</p>
          <p>5. Perhatikan menu sidebar yang muncul sesuai dengan role</p>
          <p>6. Ulangi untuk semua role untuk testing lengkap</p>
        </CardContent>
      </Card>
    </div>
  );
};