import React from 'react';

export const SimpleApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-600 mb-4">
            PARA KURIR
          </h1>
          <p className="text-gray-600 mb-6">
            Sistem Manajemen Kurir Professional
          </p>
          <div className="space-y-4">
            <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Login Dashboard
            </button>
            <button className="w-full border border-indigo-600 text-indigo-600 py-3 px-4 rounded-lg hover:bg-indigo-50 transition-colors">
              Mobile Demo
            </button>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            Frontend React berfungsi normal
          </div>
        </div>
      </div>
    </div>
  );
};