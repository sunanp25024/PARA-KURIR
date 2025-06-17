
import React, { useState } from 'react';
import CourierSidebar from '@/components/CourierSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Camera,
  Calendar as CalendarIcon,
  Timer,
  AlertCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState('Menunggu lokasi...');

  React.useEffect(() => {
    // Simulasi mendapatkan lokasi
    setTimeout(() => {
      setCurrentLocation('Jl. Thamrin No. 1, Jakarta Pusat');
    }, 2000);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setIsCheckedIn(true);
    setCheckInTime(now.toLocaleTimeString('id-ID'));
    toast({
      title: "Check-in Berhasil",
      description: `Anda telah check-in pada ${now.toLocaleTimeString('id-ID')}`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    setIsCheckedIn(false);
    setCheckInTime(null);
    toast({
      title: "Check-out Berhasil",
      description: `Anda telah check-out pada ${now.toLocaleTimeString('id-ID')}`,
    });
  };

  const attendanceHistory = [
    { date: '2024-01-20', checkIn: '08:00', checkOut: '17:00', status: 'hadir', duration: '9 jam' },
    { date: '2024-01-19', checkIn: '08:15', checkOut: '17:10', status: 'hadir', duration: '8 jam 55 menit' },
    { date: '2024-01-18', checkIn: '08:30', checkOut: '17:00', status: 'terlambat', duration: '8 jam 30 menit' },
    { date: '2024-01-17', checkIn: '08:00', checkOut: '17:00', status: 'hadir', duration: '9 jam' },
    { date: '2024-01-16', checkIn: '-', checkOut: '-', status: 'tidak_hadir', duration: '-' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'hadir':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Hadir</Badge>;
      case 'terlambat':
        return <Badge variant="secondary"><Timer className="h-3 w-3 mr-1" />Terlambat</Badge>;
      case 'tidak_hadir':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Tidak Hadir</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const monthlyStats = {
    totalHadir: 18,
    totalTerlambat: 2,
    totalTidakHadir: 1,
    totalJamKerja: '162 jam'
  };

  return (
    <div className="flex h-screen bg-background">
      <CourierSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Absensi</h1>
            <p className="text-muted-foreground">
              Kelola kehadiran dan waktu kerja Anda
            </p>
          </div>
          <Badge variant={isCheckedIn ? "default" : "secondary"} className="px-4 py-2">
            <Clock className="h-4 w-4 mr-2" />
            {isCheckedIn ? 'Sedang Bekerja' : 'Belum Check-in'}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Check-in/out Section */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Absen Hari Ini
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
              <CardContent className="space-y-6">
                {/* Current Location */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Lokasi Saat Ini:</span>
                  </div>
                  <p className="text-sm text-gray-600">{currentLocation}</p>
                </div>

                {/* Check-in Status */}
                {isCheckedIn && checkInTime && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Sudah Check-in</span>
                    </div>
                    <p className="text-sm text-green-700">Waktu masuk: {checkInTime}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!isCheckedIn ? (
                    <Button onClick={handleCheckIn} className="flex-1 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Check-in
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleCheckOut} 
                      variant="destructive" 
                      className="flex-1 flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Check-out
                    </Button>
                  )}
                  <Button variant="outline" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Foto Absen
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">08:00</p>
                    <p className="text-sm text-gray-600">Jam Masuk</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">17:00</p>
                    <p className="text-sm text-gray-600">Jam Pulang</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance History */}
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Absensi</CardTitle>
                <CardDescription>Catatan kehadiran 7 hari terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="text-sm font-medium">{record.date}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusBadge(record.status)}
                          </div>
                          <p className="text-xs text-gray-600">
                            {record.checkIn} - {record.checkOut} ({record.duration})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Kalender
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Monthly Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistik Bulan Ini</CardTitle>
                <CardDescription>Ringkasan kehadiran Januari 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Hadir</span>
                  <Badge className="bg-green-500">{monthlyStats.totalHadir}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Terlambat</span>
                  <Badge variant="secondary">{monthlyStats.totalTerlambat}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tidak Hadir</span>
                  <Badge variant="destructive">{monthlyStats.totalTidakHadir}</Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Total Jam Kerja</span>
                  <span className="text-sm font-bold">{monthlyStats.totalJamKerja}</span>
                </div>
              </CardContent>
            </Card>

            {/* Alert */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Reminder</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Jangan lupa untuk check-out setelah selesai bekerja
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;
