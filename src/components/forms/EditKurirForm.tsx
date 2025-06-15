
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditKurirFormProps {
  kurir: any;
  onSubmit: (updatedKurir: any) => void;
  onCancel: () => void;
}

const EditKurirForm = ({ kurir, onSubmit, onCancel }: EditKurirFormProps) => {
  const [formData, setFormData] = useState({
    name: kurir.name,
    email: kurir.email,
    phone: kurir.phone,
    area: kurir.area,
    workLocation: kurir.workLocation,
    status: kurir.status
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedKurir = {
      ...kurir,
      ...formData
    };
    
    onSubmit(updatedKurir);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Kurir</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">Area</Label>
          <Select value={formData.area} onValueChange={(value) => handleInputChange('area', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
              <SelectItem value="Jakarta Timur">Jakarta Timur</SelectItem>
              <SelectItem value="Jakarta Utara">Jakarta Utara</SelectItem>
              <SelectItem value="Jakarta Barat">Jakarta Barat</SelectItem>
              <SelectItem value="Jakarta Pusat">Jakarta Pusat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workLocation">Lokasi Kerja</Label>
        <Input
          id="workLocation"
          value={formData.workLocation}
          onChange={(e) => handleInputChange('workLocation', e.target.value)}
          placeholder="Contoh: Kantor Pusat - Jl. Sudirman"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Aktif">Aktif</SelectItem>
            <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">
          Simpan Perubahan
        </Button>
      </div>
    </form>
  );
};

export default EditKurirForm;
