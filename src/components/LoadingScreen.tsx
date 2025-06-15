
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl animate-pulse p-4">
            <img 
              src="/lovable-uploads/c005202f-c3fd-4bcd-be23-7edff7d62bb7.png" 
              alt="INSAN MOBILE Logo"
              className="w-full h-full object-contain"
            />
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
