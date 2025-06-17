// Supabase has been migrated to Neon PostgreSQL
// This file is kept for type definitions only

// Note: Authentication and database operations now use server-side API routes
console.log('Supabase client disabled - using server-side database operations')

// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          role: 'master_admin' | 'admin' | 'pic' | 'kurir'
          wilayah: string
          area: string
          lokasi_kerja: string
          phone: string
          status: 'aktif' | 'nonaktif'
          avatar_url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          role: 'master_admin' | 'admin' | 'pic' | 'kurir'
          wilayah: string
          area: string
          lokasi_kerja: string
          phone: string
          status?: 'aktif' | 'nonaktif'
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          role?: 'master_admin' | 'admin' | 'pic' | 'kurir'
          wilayah?: string
          area?: string
          lokasi_kerja?: string
          phone?: string
          status?: 'aktif' | 'nonaktif'
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      packages: {
        Row: {
          id: string
          resi_number: string
          kurir_id: string
          kurir_name: string
          pengirim: string
          penerima: string
          alamat_pengirim: string
          alamat_penerima: string
          status_pengiriman: string
          tanggal_pickup: string
          tanggal_terkirim?: string
          berat: number
          nilai_cod: number
          bukti_kirim_url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          resi_number: string
          kurir_id: string
          kurir_name: string
          pengirim: string
          penerima: string
          alamat_pengirim: string
          alamat_penerima: string
          status_pengiriman: string
          tanggal_pickup: string
          tanggal_terkirim?: string
          berat: number
          nilai_cod: number
          bukti_kirim_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          resi_number?: string
          kurir_id?: string
          kurir_name?: string
          pengirim?: string
          penerima?: string
          alamat_pengirim?: string
          alamat_penerima?: string
          status_pengiriman?: string
          tanggal_pickup?: string
          tanggal_terkirim?: string
          berat?: number
          nilai_cod?: number
          bukti_kirim_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      kurir_activities: {
        Row: {
          id: string
          kurir_id: string
          kurir_name: string
          activity_type: string
          description: string
          lokasi: string
          waktu: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          kurir_id: string
          kurir_name: string
          activity_type: string
          description: string
          lokasi: string
          waktu: string
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          kurir_id?: string
          kurir_name?: string
          activity_type?: string
          description?: string
          lokasi?: string
          waktu?: string
          status?: string
          created_at?: string
        }
      }
      attendance: {
        Row: {
          id: string
          kurir_id: string
          kurir_name: string
          tanggal: string
          jam_masuk: string
          jam_keluar?: string
          lokasi_absen: string
          status: string
          total_jam: number
          created_at: string
        }
        Insert: {
          id?: string
          kurir_id: string
          kurir_name: string
          tanggal: string
          jam_masuk: string
          jam_keluar?: string
          lokasi_absen: string
          status: string
          total_jam: number
          created_at?: string
        }
        Update: {
          id?: string
          kurir_id?: string
          kurir_name?: string
          tanggal?: string
          jam_masuk?: string
          jam_keluar?: string
          lokasi_absen?: string
          status?: string
          total_jam?: number
          created_at?: string
        }
      }
      approval_requests: {
        Row: {
          id: string
          requester_id: string
          requester_name: string
          request_type: string
          target_admin_id?: string
          request_data: any
          current_data?: any
          status: 'pending' | 'approved' | 'rejected'
          approved_by?: string
          approved_at?: string
          notes?: string
          created_at: string
        }
        Insert: {
          id?: string
          requester_id: string
          requester_name: string
          request_type: string
          target_admin_id?: string
          request_data: any
          current_data?: any
          status?: 'pending' | 'approved' | 'rejected'
          approved_by?: string
          approved_at?: string
          notes?: string
          created_at?: string
        }
        Update: {
          id?: string
          requester_id?: string
          requester_name?: string
          request_type?: string
          target_admin_id?: string
          request_data?: any
          current_data?: any
          status?: 'pending' | 'approved' | 'rejected'
          approved_by?: string
          approved_at?: string
          notes?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}