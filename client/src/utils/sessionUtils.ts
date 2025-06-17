// Utility functions for session management across tabs

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  wilayah?: string;
  area?: string;
  lokasi_kerja?: string;
  phone?: string;
  status?: string;
}

export class SessionManager {
  private static readonly USER_KEY = 'user';
  private static readonly SESSION_ID_KEY = 'session_id';

  // Get current user from session storage
  static getCurrentUser(): SessionUser | null {
    try {
      const userData = sessionStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data from session:', error);
      this.clearSession();
      return null;
    }
  }

  // Set current user in session storage
  static setCurrentUser(user: SessionUser): void {
    try {
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
      sessionStorage.setItem(this.SESSION_ID_KEY, Date.now().toString());
    } catch (error) {
      console.error('Error saving user data to session:', error);
    }
  }

  // Clear current session
  static clearSession(): void {
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.SESSION_ID_KEY);
  }

  // Get session ID for this tab
  static getSessionId(): string | null {
    return sessionStorage.getItem(this.SESSION_ID_KEY);
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  // Check if user has specific role
  static hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Check if user has permission level (hierarchical)
  static hasPermissionLevel(requiredLevel: 'kurir' | 'pic' | 'admin' | 'master_admin'): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    const levels = ['kurir', 'pic', 'admin', 'master_admin'];
    const userLevel = levels.indexOf(user.role);
    const requiredLevelIndex = levels.indexOf(requiredLevel);

    return userLevel >= requiredLevelIndex;
  }

  // Get user-specific data filter
  static getDataFilter() {
    const user = this.getCurrentUser();
    if (!user) return null;

    return {
      userId: user.id,
      role: user.role,
      wilayah: user.wilayah,
      area: user.area,
      lokasi_kerja: user.lokasi_kerja
    };
  }
}