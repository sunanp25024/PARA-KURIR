
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Query user from Supabase database
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', id)
        .single();

      if (error || !user) {
        toast({
          title: "Login Gagal",
          description: "ID tidak ditemukan!",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // For demo purposes, we'll use simple password check
      // In production, you should use proper password hashing
      if (password === '123456') {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          id: user.user_id,
          role: user.role.replace('_', '-'), // Convert master_admin to master-admin
          name: user.name,
          email: user.email,
          wilayah: user.wilayah,
          area: user.area,
          lokasi_kerja: user.lokasi_kerja,
          phone: user.phone,
          status: user.status
        }));

        toast({
          title: "Login Berhasil",
          description: `Selamat datang, ${user.name}!`
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Gagal",
          description: "Password salah!",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Gagal",
        description: "Terjadi kesalahan sistem!",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4 my-0">
            <img 
              alt="INSAN MOBILE" 
              src="/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png" 
              className="h-12 w-auto object-fill" 
            />
          </div>
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
                onChange={e => setId(e.target.value)} 
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
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Memproses...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Akun Demo (Password: 123456):</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Master Admin:</strong> MASTERADMIN2025</p>
              <p><strong>Admin:</strong> ADMIN2025 / ADMIN001</p>
              <p><strong>PIC:</strong> PIC2025 / PIC001 / PIC002</p>
              <p><strong>Kurir:</strong> PISTEST2025 / KURIR001-008</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
