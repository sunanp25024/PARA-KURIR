import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// HMR optimization for Replit
if (import.meta.hot) {
  import.meta.hot.accept();
  
  // Suppress noisy WebSocket errors in development
  if (import.meta.env.DEV) {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const message = String(args[0]);
      if (message.includes('WebSocket connection') || 
          message.includes('localhost:undefined') ||
          message.includes('HMR')) {
        return; // Suppress these development warnings
      }
      originalError.apply(console, args);
    };
  }
}

createRoot(document.getElementById("root")!).render(<App />);
