// WebSocket configuration for Replit environment
export const getWebSocketUrl = (): string => {
  // For Replit environment
  if (window.location.hostname.includes('replit.dev')) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}/ws-api`;
  }
  
  // For local development
  if (window.location.hostname === 'localhost') {
    return `ws://localhost:5000/ws-api`;
  }
  
  // For production
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/ws-api`;
};

export const createWebSocketConnection = (url: string): WebSocket => {
  try {
    return new WebSocket(url);
  } catch (error) {
    console.error('Failed to create WebSocket connection:', error);
    throw error;
  }
};