
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EditPICFormProps {
  pic: any;
  onSubmit: (updatedPIC: any) => void;
  onCancel: () => void;
}

const EditPICForm = ({ pic, onSubmit, onCancel }: EditPICFormProps) => {
  const [formData, setFormData] = useState({
    name: pic.name,
    email: pic.email,
    phone: pic.phone,
    department: pic.department,
    workLocation: pic.workLocation,
    status: pic.status
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedPIC = {
      ...pic,
      ...formData
    };
    
    onSubmit(updatedPIC);
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
          <Label htmlFor="name">Nama PIC</Label>
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
          <Label htmlFor="department">Departemen</Label>
          <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih departemen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Operasional">Operasional</SelectItem>
              <SelectItem value="Customer Service">Customer Service</SelectItem>
              <SelectItem value="Logistik">Logistik</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
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

export default EditPICForm;
