
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

interface AddPICFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AddPICForm = ({ onSubmit, onCancel }: AddPICFormProps) => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      area: '',
      status: 'Aktif'
    }
  });

  const handleSubmit = (data: any) => {
    const newPIC = {
      id: `PIC${new Date().getFullYear()}${Math.floor(Math.random() * 1000)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: data.status,
      kurirCount: 0,
      area: data.area,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Belum pernah login'
    };
    
    onSubmit(newPIC);
    toast({
      title: "PIC Berhasil Ditambahkan",
      description: `PIC ${data.name} telah berhasil ditambahkan ke sistem`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama lengkap PIC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="pic@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input placeholder="081234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jakarta Pusat">Jakarta Pusat</SelectItem>
                    <SelectItem value="Jakarta Utara">Jakarta Utara</SelectItem>
                    <SelectItem value="Jakarta Selatan">Jakarta Selatan</SelectItem>
                    <SelectItem value="Jakarta Timur">Jakarta Timur</SelectItem>
                    <SelectItem value="Jakarta Barat">Jakarta Barat</SelectItem>
                    <SelectItem value="Bandung">Bandung</SelectItem>
                    <SelectItem value="Surabaya">Surabaya</SelectItem>
                    <SelectItem value="Medan">Medan</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button type="submit">
            Simpan PIC
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPICForm;
