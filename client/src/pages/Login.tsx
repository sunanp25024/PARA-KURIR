
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SimpleAuthContext';
import { TestingGuide } from '@/components/TestingGuide';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        toast({
          title: "Login Gagal",
          description: error,
          variant: "destructive"
        });
        return;
      }

      if (data?.user) {
        toast({
          title: "Login Berhasil",
          description: `Selamat datang!`
        });
        navigate('/dashboard');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="testing">Panduan Testing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="flex justify-center">
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
                <CardDescription>Login dengan akun Supabase Auth testing</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="contoh: masteradmin@insanmobile.com" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Masukkan password akun testing" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Memproses...' : 'Login dengan Supabase Auth'}
                  </Button>
                </form>
                
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm font-medium text-amber-800 mb-2">Gunakan Tab "Panduan Testing" untuk melihat semua akun testing yang tersedia</p>
                  <p className="text-xs text-amber-600">
                    Sistem menggunakan Supabase Auth dengan role-based access control untuk setiap user testing
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="testing">
            <TestingGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
