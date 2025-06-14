
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, MapPin, Navigation } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from '@/components/ui/use-toast';

const Attendance = () => {
  const [attendanceStatus, setAttendanceStatus] = useState('not-checked-in');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [attendanceHistory] = useState([
    { date: '2025-06-13', checkIn: '08:15', checkOut: '17:30', status: 'Hadir' },
    { date: '2025-06-12', checkIn: '08:20', checkOut: '17:25', status: 'Hadir' },
    { date: '2025-06-11', checkIn: '08:30', checkOut: '17:20', status: 'Terlambat' },
    { date: '2025-06-10', checkIn: '08:10', checkOut: '17:35', status: 'Hadir' }
  ]);

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleCheckIn = () => {
    if (!location) {
      toast({
        title: "Lokasi Diperlukan",
        description: "Harap aktifkan GPS untuk check-in",
        variant: "destructive"
      });
      return;
    }

    const now = new Date().toLocaleTimeString('id-ID');
    setCheckInTime(now);
    setAttendanceStatus('checked-in');
    toast({
      title: "Check-in Berhasil",
      description: `Anda telah check-in pada ${now}`,
    });
  };

  const handleCheckOut = () => {
    if (!location) {
      toast({
        title: "Lokasi Diperlukan",
        description: "Harap aktifkan GPS untuk check-out",
        variant: "destructive"
      });
      return;
    }

    const now = new Date().toLocaleTimeString('id-ID');
    setCheckOutTime(now);
    setAttendanceStatus('checked-out');
    toast({
      title: "Check-out Berhasil",
      description: `Anda telah check-out pada ${now}`,
    });
  };

  const getWorkingHours = () => {
    if (checkInTime && checkOutTime) {
      const checkIn = new Date(`2025-06-14 ${checkInTime}`);
      const checkOut = new Date(`2025-06-14 ${checkOutTime}`);
      const diff = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
      return diff.toFixed(1);
    }
    return '0';
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
                <Badge variant={
                  attendanceStatus === 'checked-in' ? 'default' : 
                  attendanceStatus === 'checked-out' ? 'default' : 'secondary'
                }>
                  {attendanceStatus === 'not-checked-in' && 'Belum Check-in'}
                  {attendanceStatus === 'checked-in' && 'Sedang Bekerja'}
                  {attendanceStatus === 'checked-out' && 'Selesai Kerja'}
                </Badge>
              </div>

              {checkInTime && (
                <div className="flex items-center justify-between">
                  <span>Waktu Check-in:</span>
                  <span className="font-medium">{checkInTime}</span>
                </div>
              )}

              {checkOutTime && (
                <div className="flex items-center justify-between">
                  <span>Waktu Check-out:</span>
                  <span className="font-medium">{checkOutTime}</span>
                </div>
              )}

              {checkInTime && checkOutTime && (
                <div className="flex items-center justify-between">
                  <span>Total Jam Kerja:</span>
                  <span className="font-medium">{getWorkingHours()} jam</span>
                </div>
              )}

              <div className="pt-4">
                {attendanceStatus === 'not-checked-in' && (
                  <Button onClick={handleCheckIn} className="w-full" disabled={!location}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {location ? 'Check-in Sekarang' : 'Menunggu GPS...'}
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
                Lokasi & GPS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium">Area Kerja Aktif</p>
                  <p className="text-sm text-gray-600">Jakarta Selatan</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Status GPS</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-3 h-3 rounded-full ${location ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">{location ? 'Aktif' : 'Tidak Aktif'}</span>
                  </div>
                </div>
                {location && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium">Koordinat Saat Ini</p>
                    <p className="text-sm text-gray-600">{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
                  </div>
                )}
                <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
                  <Navigation className="h-4 w-4 mr-2" />
                  Refresh Lokasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Riwayat Kehadiran (7 Hari Terakhir)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceHistory.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">
                      {new Date(record.date).toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        day: 'numeric',
                        month: 'long'
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      Check-in: {record.checkIn} | Check-out: {record.checkOut}
                    </p>
                  </div>
                  <Badge variant={record.status === 'Hadir' ? 'default' : 'secondary'}>
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Attendance;
