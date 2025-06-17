import React from 'react';

export const DebugApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Frontend Debug Test</h1>
        <div className="space-y-3">
          <p className="text-gray-700">✅ React rendering berhasil</p>
          <p className="text-gray-700">✅ Tailwind CSS berfungsi</p>
          <p className="text-gray-700">✅ TypeScript kompilasi normal</p>
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <p className="text-blue-800 text-sm">
              Jika Anda melihat halaman ini, frontend React sudah berjalan dengan baik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};