
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  kurirName: string;
  avatar?: string;
  checkIn: string;
  checkOut?: string;
  location: string;
  status: 'hadir' | 'terlambat' | 'tidak-hadir' | 'cuti';
  workHours?: string;
}

const CourierAttendanceActivity = () => {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: AttendanceRecord[] = [
      {
        id: '1',
        kurirName: 'Budi Santoso',
        checkIn: '08:00',
        checkOut: '17:00',
        location: 'Jakarta Pusat',
        status: 'hadir',
        workHours: '9 jam'
      },
      {
        id: '2',
        kurirName: 'Siti Aminah',
        checkIn: '08:15',
        checkOut: '17:15',
        location: 'Jakarta Selatan',
        status: 'terlambat',
        workHours: '9 jam'
      },
      {
        id: '3',
        kurirName: 'Ahmad Wijaya',
        checkIn: '08:00',
        location: 'Jakarta Timur',
        status: 'hadir'
      },
      {
        id: '4',
        kurirName: 'Rina Sari',
        checkIn: '-',
        location: 'Jakarta Barat',
        status: 'cuti'
      },
      {
        id: '5',
        kurirName: 'Dedi Kurniawan',
        checkIn: '-',
        location: 'Jakarta Utara',
        status: 'tidak-hadir'
      }
    ];
    setAttendanceData(mockData);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hadir': return 'bg-green-100 text-green-800';
      case 'terlambat': return 'bg-yellow-100 text-yellow-800';
      case 'tidak-hadir': return 'bg-red-100 text-red-800';
      case 'cuti': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hadir': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'terlambat': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'tidak-hadir': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'cuti': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Aktivitas Absen Kurir Hari Ini
        </CardTitle>
        <CardDescription>
          Status kehadiran kurir pada {new Date().toLocaleDateString('id-ID')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {attendanceData.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={record.avatar} />
                  <AvatarFallback>{record.kurirName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{record.kurirName}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    {record.location}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm text-right">
                  <p className="font-medium">
                    Check In: {record.checkIn}
                  </p>
                  {record.checkOut && (
                    <p className="text-gray-600">
                      Check Out: {record.checkOut}
                    </p>
                  )}
                  {record.workHours && (
                    <p className="text-gray-600">
                      {record.workHours}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {getStatusIcon(record.status)}
                  <Badge className={getStatusColor(record.status)}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourierAttendanceActivity;
