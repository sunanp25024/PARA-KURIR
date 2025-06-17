// Tab isolation utilities to prevent cross-tab data interference

export class TabIsolationManager {
  private static readonly TAB_ID_KEY = 'tab_id';
  private static readonly SESSION_ID_KEY = 'session_id';
  private static readonly USER_KEY = 'user';

  // Generate a unique tab ID for this browser tab
  static getTabId(): string {
    let tabId = sessionStorage.getItem(this.TAB_ID_KEY);
    if (!tabId) {
      tabId = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(this.TAB_ID_KEY, tabId);
    }
    return tabId;
  }

  // Get session ID for this tab
  static getSessionId(): string | null {
    return sessionStorage.getItem(this.SESSION_ID_KEY);
  }

  // Set session data for this tab only
  static setSessionData(user: any): void {
    const tabId = this.getTabId();
    const sessionId = Date.now().toString();
    
    sessionStorage.setItem(this.SESSION_ID_KEY, sessionId);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    console.log(`Tab ${tabId} - User session set:`, {
      userId: user.id,
      role: user.role,
      sessionId,
      tabId
    });
  }

  // Clear session data for this tab only
  static clearSessionData(): void {
    const tabId = this.getTabId();
    console.log(`Tab ${tabId} - Clearing session data`);
    
    sessionStorage.removeItem(this.SESSION_ID_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  // Get current user for this tab only
  static getCurrentUser(): any | null {
    try {
      const userData = sessionStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Check if current tab has an active session
  static hasActiveSession(): boolean {
    return !!(this.getSessionId() && this.getCurrentUser());
  }

  // Get tab-specific query key for React Query
  static getQueryKey(baseKey: string[]): string[] {
    const sessionId = this.getSessionId();
    const tabId = this.getTabId();
    return [...baseKey, sessionId || 'no-session', tabId];
  }

  // Log tab session info for debugging
  static logSessionInfo(): void {
    const tabId = this.getTabId();
    const sessionId = this.getSessionId();
    const user = this.getCurrentUser();
    
    console.log(`Tab Session Info:`, {
      tabId,
      sessionId,
      userId: user?.id,
      userRole: user?.role,
      hasSession: this.hasActiveSession()
    });
  }
}