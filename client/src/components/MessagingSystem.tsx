
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Send, MessageSquare, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MessagingSystem = () => {
  const [message, setMessage] = useState('');
  const [targetRole, setTargetRole] = useState('all');
  const [priority, setPriority] = useState('normal');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Pesan tidak boleh kosong",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending message
    console.log('Sending message:', { message, targetRole, priority });
    
    toast({
      title: "Pesan Terkirim",
      description: `Pesan berhasil dikirim ke ${targetRole === 'all' ? 'semua role' : targetRole}`,
    });

    setMessage('');
    setTargetRole('all');
    setPriority('normal');
  };

  const recentMessages = [
    {
      id: 1,
      content: 'Update sistem maintenance dijadwalkan hari Minggu',
      target: 'all',
      timestamp: '2 jam lalu',
      status: 'sent'
    },
    {
      id: 2,
      content: 'Reminder untuk mengisi laporan harian',
      target: 'kurir',
      timestamp: '5 jam lalu',
      status: 'delivered'
    },
    {
      id: 3,
      content: 'Meeting koordinasi PIC minggu depan',
      target: 'pic',
      timestamp: '1 hari lalu',
      status: 'delivered'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Kirim Pesan Broadcast
          </CardTitle>
          <CardDescription>
            Kirim pesan ke semua role atau role tertentu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Target Role</label>
              <Select value={targetRole} onValueChange={setTargetRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Role</SelectItem>
                  <SelectItem value="kurir">Kurir</SelectItem>
                  <SelectItem value="pic">PIC</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="master-admin">Master Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Prioritas</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih prioritas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Rendah</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Tinggi</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Pesan</label>
            <Textarea
              placeholder="Tulis pesan Anda di sini..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
          
          <Button onClick={handleSendMessage} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Kirim Pesan
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Riwayat Pesan Terkirim
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{msg.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {msg.target === 'all' ? 'Semua Role' : msg.target}
                    </Badge>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600 capitalize">{msg.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingSystem;
