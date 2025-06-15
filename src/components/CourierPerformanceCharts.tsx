
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp, Calendar, Users } from 'lucide-react';

interface ChartData {
  daily: any[];
  weekly: any[];
  monthly: any[];
}

const CourierPerformanceCharts = () => {
  const [chartData, setChartData] = useState<ChartData>({
    daily: [],
    weekly: [],
    monthly: []
  });
  const [selectedMetric, setSelectedMetric] = useState('delivery');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: ChartData = {
      daily: [
        { name: 'Sen', delivered: 120, pending: 15, returned: 8, completion: 85 },
        { name: 'Sel', delivered: 135, pending: 12, returned: 6, completion: 88 },
        { name: 'Rab', delivered: 142, pending: 18, returned: 10, completion: 82 },
        { name: 'Kam', delivered: 158, pending: 14, returned: 7, completion: 89 },
        { name: 'Jum', delivered: 165, pending: 20, returned: 12, completion: 84 },
        { name: 'Sab', delivered: 98, pending: 8, returned: 4, completion: 91 },
        { name: 'Min', delivered: 76, pending: 5, returned: 3, completion: 93 }
      ],
      weekly: [
        { name: 'Week 1', delivered: 850, pending: 95, returned: 45, completion: 86 },
        { name: 'Week 2', delivered: 920, pending: 78, returned: 38, completion: 89 },
        { name: 'Week 3', delivered: 875, pending: 102, returned: 52, completion: 84 },
        { name: 'Week 4', delivered: 965, pending: 85, returned: 41, completion: 91 }
      ],
      monthly: [
        { name: 'Jan', delivered: 3200, pending: 280, returned: 150, completion: 87 },
        { name: 'Feb', delivered: 3450, pending: 245, returned: 138, completion: 89 },
        { name: 'Mar', delivered: 3680, pending: 298, returned: 162, completion: 86 },
        { name: 'Apr', delivered: 3890, pending: 220, returned: 125, completion: 92 },
        { name: 'May', delivered: 4120, pending: 265, returned: 145, completion: 88 },
        { name: 'Jun', delivered: 3950, pending: 235, returned: 132, completion: 90 }
      ]
    };
    
    setChartData(mockData);
  }, []);

  const pieData = [
    { name: 'Terkirim', value: 1089, color: '#10B981' },
    { name: 'Pending', value: 98, color: '#F59E0B' },
    { name: 'Return', value: 63, color: '#EF4444' }
  ];

  const getChartTitle = (period: string) => {
    switch (period) {
      case 'daily': return 'Performa Harian (7 Hari Terakhir)';
      case 'weekly': return 'Performa Mingguan (4 Minggu Terakhir)';
      case 'monthly': return 'Performa Bulanan (6 Bulan Terakhir)';
      default: return 'Performa Kurir';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Chart Ringkasan Performa Kurir
        </CardTitle>
        <CardDescription>
          Analisis performa kurir dalam berbagai periode waktu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Metrik:</span>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery">Pengiriman</SelectItem>
                  <SelectItem value="completion">Tingkat Selesai</SelectItem>
                  <SelectItem value="comparison">Perbandingan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Charts */}
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Harian</TabsTrigger>
              <TabsTrigger value="weekly">Mingguan</TabsTrigger>
              <TabsTrigger value="monthly">Bulanan</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{getChartTitle('daily')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedMetric === 'delivery' && (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={chartData.daily}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="delivered" stackId="1" stroke="#10B981" fill="#10B981" name="Terkirim" />
                        <Area type="monotone" dataKey="pending" stackId="1" stroke="#F59E0B" fill="#F59E0B" name="Pending" />
                        <Area type="monotone" dataKey="returned" stackId="1" stroke="#EF4444" fill="#EF4444" name="Return" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                  
                  {selectedMetric === 'completion' && (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData.daily}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[70, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                        <Legend />
                        <Line type="monotone" dataKey="completion" stroke="#8B5CF6" strokeWidth={3} name="Tingkat Penyelesaian %" />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                  
                  {selectedMetric === 'comparison' && (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData.daily}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="delivered" fill="#10B981" name="Terkirim" />
                        <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                        <Bar dataKey="returned" fill="#EF4444" name="Return" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{getChartTitle('weekly')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData.weekly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="delivered" fill="#10B981" name="Terkirim" />
                      <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                      <Bar dataKey="returned" fill="#EF4444" name="Return" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{getChartTitle('monthly')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData.monthly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="delivered" stroke="#10B981" strokeWidth={2} name="Terkirim" />
                      <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} name="Pending" />
                      <Line type="monotone" dataKey="returned" stroke="#EF4444" strokeWidth={2} name="Return" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Summary Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Distribusi Status Paket Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value, percent}) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourierPerformanceCharts;
