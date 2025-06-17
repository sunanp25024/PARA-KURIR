// API service to replace Supabase calls with server API calls
export interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  wilayah: string;
  area: string;
  lokasi_kerja: string;
  phone: string;
  status: string;
}

export interface Package {
  id: string;
  resi_number: string;
  kurir_id: string;
  kurir_name: string;
  pengirim: string;
  penerima: string;
  alamat_pengirim: string;
  alamat_penerima: string;
  status_pengiriman: string;
  tanggal_pickup: string;
  tanggal_terkirim: string;
  berat: number;
  nilai_cod: number;
}

export interface Activity {
  id: string;
  kurir_id: string;
  kurir_name: string;
  activity_type: string;
  description: string;
  lokasi: string;
  waktu: string;
  status: string;
}

export interface Attendance {
  id: string;
  kurir_id: string;
  kurir_name: string;
  tanggal: string;
  jam_masuk: string;
  jam_keluar: string;
  lokasi_absen: string;
  status: string;
  total_jam: number;
}

const API_BASE = '/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // User operations
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async getUserByUserId(userId: string): Promise<User | null> {
    try {
      return await this.request<User>(`/users/${userId}`);
    } catch (error) {
      return null;
    }
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteUser(id: string): Promise<void> {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Package operations
  async getPackages(kurirId?: string): Promise<Package[]> {
    const query = kurirId ? `?kurirId=${encodeURIComponent(kurirId)}` : '';
    return this.request<Package[]>(`/packages${query}`);
  }

  async createPackage(pkg: Partial<Package>): Promise<Package> {
    return this.request<Package>('/packages', {
      method: 'POST',
      body: JSON.stringify(pkg),
    });
  }

  async updatePackage(id: string, updates: Partial<Package>): Promise<Package> {
    return this.request<Package>(`/packages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // Activity operations
  async getKurirActivities(kurirId?: string): Promise<Activity[]> {
    const query = kurirId ? `?kurirId=${encodeURIComponent(kurirId)}` : '';
    return this.request<Activity[]>(`/kurir-activities${query}`);
  }

  async createKurirActivity(activity: Partial<Activity>): Promise<Activity> {
    return this.request<Activity>('/kurir-activities', {
      method: 'POST',
      body: JSON.stringify(activity),
    });
  }

  // Attendance operations
  async getAttendance(kurirId?: string): Promise<Attendance[]> {
    const query = kurirId ? `?kurirId=${encodeURIComponent(kurirId)}` : '';
    return this.request<Attendance[]>(`/attendance${query}`);
  }

  async createAttendance(attendance: Partial<Attendance>): Promise<Attendance> {
    return this.request<Attendance>('/attendance', {
      method: 'POST',
      body: JSON.stringify(attendance),
    });
  }

  // Approval request operations
  async getApprovalRequests(): Promise<any[]> {
    return this.request<any[]>('/approval-requests');
  }

  async getPendingApprovalRequests(): Promise<any[]> {
    return this.request<any[]>('/approval-requests/pending');
  }

  async createApprovalRequest(request: any): Promise<any> {
    return this.request<any>('/approval-requests', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async updateApprovalRequest(id: string, updates: any): Promise<any> {
    return this.request<any>(`/approval-requests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }
}

export const apiService = new ApiService();