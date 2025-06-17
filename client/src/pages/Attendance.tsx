import React, { useState } from 'react';
import CourierSidebar from '@/components/CourierSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Calendar as CalendarIcon,
  User,
  Timer,
  Coffee
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Attendance: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString());
    setIsCheckedIn(true);
    toast({
      title: "Check-in Berhasil",
      description: `Anda telah check-in pada ${now.toLocaleTimeString()}`,
    });
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    toast({
      title: "Check-out Berhasil", 
      description: "Terima kasih atas kerja keras Anda hari ini!",
    });
  };

  // Mock attendance data
  const attendanceHistory = [
    { date: '17 Jun 2024', checkIn: '08:00', checkOut: '17:00', status: 'hadir' },
    { date: '16 Jun 2024', checkIn: '08:15', checkOut: '17:05', status: 'terlambat' },
    { date: '15 Jun 2024', checkIn: '08:00', checkOut: '17:00', status: 'hadir' },
  ];

  const monthlyStats = {
    totalHadir: 20,
    totalTerlambat: 3,
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
                      Catat kehadiran dan waktu kerja Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!isCheckedIn ? (
                      <div className="text-center space-y-4">
                        <div className="text-6xl font-mono text-primary">
                          {new Date().toLocaleTimeString()}
                        </div>
                        <Button onClick={handleCheckIn} size="lg" className="w-full">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Check In Sekarang
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>Jakarta Timur, Cakung</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="space-y-2">
                          <Badge variant="default" className="px-4 py-2">
                            <Timer className="h-4 w-4 mr-2" />
                            Sedang Bekerja
                          </Badge>
                          <p className="text-sm text-gray-600">
                            Check-in: {checkInTime}
                          </p>
                        </div>
                        <Button onClick={handleCheckOut} variant="outline" size="lg" className="w-full">
                          <XCircle className="h-5 w-5 mr-2" />
                          Check Out
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Riwayat Absensi</CardTitle>
                    <CardDescription>
                      Catatan kehadiran 7 hari terakhir
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {attendanceHistory.map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                              record.status === 'hadir' ? 'bg-green-100 text-green-600' :
                              record.status === 'terlambat' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {record.status === 'hadir' ? <CheckCircle className="h-4 w-4" /> :
                               record.status === 'terlambat' ? <Clock className="h-4 w-4" /> :
                               <XCircle className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="font-medium">{record.date}</p>
                              <p className="text-sm text-gray-600">
                                {record.checkIn} - {record.checkOut}
                              </p>
                            </div>
                          </div>
                          <Badge variant={
                            record.status === 'hadir' ? 'default' :
                            record.status === 'terlambat' ? 'secondary' : 'destructive'
                          }>
                            {record.status === 'hadir' ? 'Hadir' :
                             record.status === 'terlambat' ? 'Terlambat' : 'Tidak Hadir'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Calendar and Stats Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Kalender
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Statistik Bulan Ini</CardTitle>
                    <CardDescription>
                      Ringkasan kehadiran Juni 2024
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Hadir:</span>
                        <span className="font-medium">{monthlyStats.totalHadir} hari</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Terlambat:</span>
                        <span className="font-medium text-yellow-600">{monthlyStats.totalTerlambat} hari</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Tidak Hadir:</span>
                        <span className="font-medium text-red-600">{monthlyStats.totalTidakHadir} hari</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Jam Kerja:</span>
                        <span className="font-medium">{monthlyStats.totalJamKerja}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Coffee className="h-4 w-4" />
                        <span>Jangan lupa untuk check-out setelah selesai bekerja</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;