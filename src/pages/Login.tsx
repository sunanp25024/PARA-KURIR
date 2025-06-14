
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock login data
  const mockUsers = {
    'MASTERADMIN2025': { password: '123456', role: 'master-admin', name: 'Master Admin' },
    'ADMIN2025': { password: '123456', role: 'admin', name: 'Admin User' },
    'PIC2025': { password: '123456', role: 'pic', name: 'PIC User' },
    'PISTEST2025': { password: '123456', role: 'kurir', name: 'Kurir Test' }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers[id as keyof typeof mockUsers];
      
      if (user && user.password === password) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          id,
          role: user.role,
          name: user.name
        }));
        
        toast({
          title: "Login Berhasil",
          description: `Selamat datang, ${user.name}!`,
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Gagal",
          description: "ID atau password salah!",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-indigo-700">INSAN MOBILE</CardTitle>
          <CardDescription>Aplikasi Kurir Professional</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID Mitra</Label>
              <Input
                id="id"
                type="text"
                placeholder="Masukkan ID Anda"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Master Admin:</strong> MASTERADMIN2025 / 123456</p>
              <p><strong>Admin:</strong> ADMIN2025 / 123456</p>
              <p><strong>PIC:</strong> PIC2025 / 123456</p>
              <p><strong>Kurir:</strong> PISTEST2025 / 123456</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
