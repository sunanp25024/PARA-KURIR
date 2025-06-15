
import React from 'react';
import Layout from '@/components/Layout';
import MessagingSystem from '@/components/MessagingSystem';

const SendNotification = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kirim Notifikasi</h1>
          <p className="text-gray-600">Kirim pesan broadcast ke semua pengguna atau role tertentu</p>
        </div>
        <MessagingSystem />
      </div>
    </Layout>
  );
};

export default SendNotification;
