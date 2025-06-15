
import React from 'react';
import { Truck, Package } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <Truck className="h-12 w-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-bounce">
            <Package className="h-4 w-4 text-white" />
          </div>
        </div>
        
        {/* Brand Name */}
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
          INSAN <span className="text-blue-400">MOBILE</span>
        </h1>
        <p className="text-blue-200 text-lg font-medium mb-8">Kurir Professional System</p>
        
        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <p className="text-blue-300 text-sm mt-4 animate-pulse">Memuat aplikasi...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
