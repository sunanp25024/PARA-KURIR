export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      approval_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          current_data: Json | null
          id: string
          notes: string | null
          request_data: Json
          request_type: Database["public"]["Enums"]["approval_request_type"]
          requester_id: string
          requester_name: string
          status: Database["public"]["Enums"]["approval_status"]
          target_admin_id: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          current_data?: Json | null
          id?: string
          notes?: string | null
          request_data: Json
          request_type: Database["public"]["Enums"]["approval_request_type"]
          requester_id: string
          requester_name: string
          status?: Database["public"]["Enums"]["approval_status"]
          target_admin_id?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          current_data?: Json | null
          id?: string
          notes?: string | null
          request_data?: Json
          request_type?: Database["public"]["Enums"]["approval_request_type"]
          requester_id?: string
          requester_name?: string
          status?: Database["public"]["Enums"]["approval_status"]
          target_admin_id?: string | null
        }
        Relationships: []
      }
      attendance: {
        Row: {
          created_at: string
          foto_absen: string | null
          id: string
          jam_keluar: string | null
          jam_masuk: string | null
          kurir_id: string
          kurir_name: string
          lokasi_absen: string | null
          status: string | null
          tanggal: string
          total_jam: number | null
        }
        Insert: {
          created_at?: string
          foto_absen?: string | null
          id?: string
          jam_keluar?: string | null
          jam_masuk?: string | null
          kurir_id: string
          kurir_name: string
          lokasi_absen?: string | null
          status?: string | null
          tanggal: string
          total_jam?: number | null
        }
        Update: {
          created_at?: string
          foto_absen?: string | null
          id?: string
          jam_keluar?: string | null
          jam_masuk?: string | null
          kurir_id?: string
          kurir_name?: string
          lokasi_absen?: string | null
          status?: string | null
          tanggal?: string
          total_jam?: number | null
        }
        Relationships: []
      }
      kurir_activities: {
        Row: {
          activity_type: string
          created_at: string
          description: string | null
          id: string
          kurir_id: string
          kurir_name: string
          lokasi: string | null
          status: string | null
          waktu: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          description?: string | null
          id?: string
          kurir_id: string
          kurir_name: string
          lokasi?: string | null
          status?: string | null
          waktu?: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string | null
          id?: string
          kurir_id?: string
          kurir_name?: string
          lokasi?: string | null
          status?: string | null
          waktu?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          alamat_penerima: string
          alamat_pengirim: string
          berat: number | null
          catatan: string | null
          created_at: string
          foto_bukti_terkirim: string | null
          id: string
          kurir_id: string
          kurir_name: string
          nilai_cod: number | null
          penerima: string
          pengirim: string
          resi_number: string
          status_pengiriman: string | null
          tanggal_pickup: string | null
          tanggal_terkirim: string | null
          updated_at: string
        }
        Insert: {
          alamat_penerima: string
          alamat_pengirim: string
          berat?: number | null
          catatan?: string | null
          created_at?: string
          foto_bukti_terkirim?: string | null
          id?: string
          kurir_id: string
          kurir_name: string
          nilai_cod?: number | null
          penerima: string
          pengirim: string
          resi_number: string
          status_pengiriman?: string | null
          tanggal_pickup?: string | null
          tanggal_terkirim?: string | null
          updated_at?: string
        }
        Update: {
          alamat_penerima?: string
          alamat_pengirim?: string
          berat?: number | null
          catatan?: string | null
          created_at?: string
          foto_bukti_terkirim?: string | null
          id?: string
          kurir_id?: string
          kurir_name?: string
          nilai_cod?: number | null
          penerima?: string
          pengirim?: string
          resi_number?: string
          status_pengiriman?: string | null
          tanggal_pickup?: string | null
          tanggal_terkirim?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          area: string | null
          created_at: string
          email: string
          id: string
          lokasi_kerja: string | null
          name: string
          password_hash: string
          phone: string | null
          role: string
          status: string | null
          updated_at: string
          user_id: string
          wilayah: string | null
        }
        Insert: {
          area?: string | null
          created_at?: string
          email: string
          id?: string
          lokasi_kerja?: string | null
          name: string
          password_hash: string
          phone?: string | null
          role: string
          status?: string | null
          updated_at?: string
          user_id: string
          wilayah?: string | null
        }
        Update: {
          area?: string | null
          created_at?: string
          email?: string
          id?: string
          lokasi_kerja?: string | null
          name?: string
          password_hash?: string
          phone?: string | null
          role?: string
          status?: string | null
          updated_at?: string
          user_id?: string
          wilayah?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      approval_request_type:
        | "create_admin"
        | "edit_admin"
        | "toggle_status"
        | "delete_admin"
        | "import_pic_data"
        | "import_kurir_data"
      approval_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      approval_request_type: [
        "create_admin",
        "edit_admin",
        "toggle_status",
        "delete_admin",
        "import_pic_data",
        "import_kurir_data",
      ],
      approval_status: ["pending", "approved", "rejected"],
    },
  },
} as const
