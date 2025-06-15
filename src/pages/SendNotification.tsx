
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Users, AlertTriangle, Info } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const SendNotification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: 'admin', label: 'Admin', count: 5 },
    { id: 'pic', label: 'PIC', count: 12 },
    { id: 'kurir', label: 'Kurir', count: 45 }
  ];

  const handleRoleChange = (roleId: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles([...selectedRoles, roleId]);
    } else {
      setSelectedRoles(selectedRoles.filter(role => role !== roleId));
    }
  };

  const handleSelectAll = () => {
    if (selectedRoles.length === roles.length) {
      setSelectedRoles([]);
    } else {
      setSelectedRoles(roles.map(role => role.id));
    }
  };

  const handleSendNotification = async () => {
    if (!title.trim() || !message.trim() || selectedRoles.length === 0) {
      toast({
        title: "Error",
        description: "Harap lengkapi semua field dan pilih minimal satu role.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    // Simulate sending notification
    setTimeout(() => {
      const totalRecipients = selectedRoles.reduce((sum, roleId) => {
        const role = roles.find(r => r.id === roleId);
        return sum + (role?.count || 0);
      }, 0);

      toast({
        title: "Notifikasi Terkirim",
        description: `Notifikasi berhasil dikirim ke ${totalRecipients} pengguna.`,
      });
      
      setIsSending(false);
      navigate('/dashboard');
    }, 2000);
  };

  const getPriorityIcon = () => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'normal':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const totalRecipients = selectedRoles.reduce((sum, roleId) => {
    const role = roles.find(r => r.id === roleId);
    return sum + (role?.count || 0);
  }, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kirim Notifikasi</h1>
            <p className="text-gray-600">Kirim pemberitahuan ke seluruh pengguna sistem</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Kembali
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Notifikasi */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Detail Notifikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul Notifikasi</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul notifikasi..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tulis pesan notifikasi di sini..."
                    rows={5}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="priority">Prioritas</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Penerima Notifikasi
                </CardTitle>
                <CardDescription>
                  Pilih role yang akan menerima notifikasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Pilih Semua Role</Label>
                  <Checkbox
                    checked={selectedRoles.length === roles.length}
                    onCheckedChange={handleSelectAll}
                  />
                </div>
                
                <div className="space-y-3">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedRoles.includes(role.id)}
                          onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                        />
                        <div>
                          <Label className="capitalize">{role.label}</Label>
                          <p className="text-sm text-gray-500">{role.count} pengguna</p>
                        </div>
                      </div>
                      <Badge variant="outline">{role.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview Notifikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    {getPriorityIcon()}
                    <h3 className="font-semibold">{title || 'Judul Notifikasi'}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {message || 'Pesan notifikasi akan ditampilkan di sini...'}
                  </p>
                  <p className="text-xs text-gray-400">
                    Dari: Master Admin • {new Date().toLocaleString('id-ID')}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pengiriman</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Penerima:</span>
                  <span className="font-semibold">{totalRecipients} pengguna</span>
                </div>
                <div className="flex justify-between">
                  <span>Prioritas:</span>
                  <Badge variant={priority === 'high' ? 'destructive' : 'default'}>
                    {priority === 'high' ? 'Tinggi' : 'Normal'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Role Terpilih:</span>
                  <span>{selectedRoles.length} dari {roles.length}</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleSendNotification}
              disabled={isSending || !title.trim() || !message.trim() || selectedRoles.length === 0}
              className="w-full gap-2"
            >
              <Send className="h-4 w-4" />
              {isSending ? 'Mengirim...' : 'Kirim Notifikasi'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SendNotification;
