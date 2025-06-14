
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/components/ui/use-toast';

const Attendance = () => {
  const [attendanceStatus, setAttendanceStatus] = useState('not-checked-in');
  const [checkInTime, setCheckInTime] = useState('');

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString('id-ID');
    setCheckInTime(now);
    setAttendanceStatus('checked-in');
    toast({
      title: "Check-in Berhasil",
      description: `Anda telah check-in pada ${now}`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString('id-ID');
    setAttendanceStatus('checked-out');
    toast({
      title: "Check-out Berhasil",
      description: `Anda telah check-out pada ${now}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Absen</h1>
          <p className="text-gray-600">Kelola kehadiran harian Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Status Kehadiran Hari Ini
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <Badge variant={attendanceStatus === 'checked-in' ? 'default' : 'secondary'}>
                  {attendanceStatus === 'not-checked-in' && 'Belum Check-in'}
                  {attendanceStatus === 'checked-in' && 'Sudah Check-in'}
                  {attendanceStatus === 'checked-out' && 'Sudah Check-out'}
                </Badge>
              </div>

              {checkInTime && (
                <div className="flex items-center justify-between">
                  <span>Waktu Check-in:</span>
                  <span className="font-medium">{checkInTime}</span>
                </div>
              )}

              <div className="pt-4">
                {attendanceStatus === 'not-checked-in' && (
                  <Button onClick={handleCheckIn} className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Check-in Sekarang
                  </Button>
                )}
                
                {attendanceStatus === 'checked-in' && (
                  <Button onClick={handleCheckOut} variant="outline" className="w-full">
                    <Clock className="h-4 w-4 mr-2" />
                    Check-out
                  </Button>
                )}
                
                {attendanceStatus === 'checked-out' && (
                  <div className="text-center text-green-600 font-medium">
                    ✓ Absen hari ini sudah selesai
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Lokasi Kerja
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium">Area Kerja Aktif</p>
                  <p className="text-sm text-gray-600">Jakarta Selatan</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Koordinat GPS</p>
                  <p className="text-sm text-gray-600">-6.2088, 106.8456</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Riwayat Kehadiran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Riwayat kehadiran akan muncul di sini</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Attendance;
