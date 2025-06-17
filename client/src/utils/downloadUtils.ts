
export const downloadFile = (content: string, filename: string, type: string = 'text/csv') => {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const downloadMultipleFiles = async (files: Array<{content: string, filename: string, type?: string}>) => {
  // Download files one by one with small delay to prevent browser blocking
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    downloadFile(file.content, file.filename, file.type || 'text/csv');
    // Small delay between downloads
    if (i < files.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
};

export const generateComprehensiveReport = () => {
  const currentDate = new Date().toLocaleDateString('id-ID');
  const files = [];

  // 1. Laporan Absensi
  files.push({
    filename: `laporan_absensi_${new Date().toISOString().split('T')[0]}.csv`,
    content: `ID Kurir,Nama,Tanggal,Jam Masuk,Jam Keluar,Status,Lokasi,Foto Masuk,Foto Keluar
PISTEST2025,Kurir Test,${currentDate},08:00,17:00,Hadir,Jakarta Selatan,foto_masuk_001.jpg,foto_keluar_001.jpg
KURIR001,Ahmad Kurniawan,${currentDate},08:15,17:05,Hadir,Jakarta Timur,foto_masuk_002.jpg,foto_keluar_002.jpg
KURIR002,Budi Santoso,${currentDate},07:45,16:50,Hadir,Jakarta Utara,foto_masuk_003.jpg,foto_keluar_003.jpg
KURIR003,Citra Dewi,${currentDate},08:30,17:15,Terlambat,Jakarta Barat,foto_masuk_004.jpg,foto_keluar_004.jpg
KURIR004,Dedi Rahman,${currentDate},-,-,Tidak Hadir,Jakarta Pusat,-,-`
  });

  // 2. Laporan Kinerja
  files.push({
    filename: `laporan_kinerja_${new Date().toISOString().split('T')[0]}.csv`,
    content: `ID Kurir,Nama,Bulan,Paket Total,Berhasil,Gagal,Rating Pelanggan,Bonus,Efisiensi Waktu,Komplain
PISTEST2025,Kurir Test,Desember 2024,150,142,8,4.8,Rp 500.000,95%,2
KURIR001,Ahmad Kurniawan,Desember 2024,120,108,12,4.5,Rp 350.000,88%,5
KURIR002,Budi Santoso,Desember 2024,135,125,10,4.7,Rp 450.000,92%,3
KURIR003,Citra Dewi,Desember 2024,90,86,4,4.9,Rp 400.000,96%,1
KURIR004,Dedi Rahman,Desember 2024,110,98,12,4.3,Rp 250.000,85%,8`
  });

  // 3. Laporan Pengiriman
  files.push({
    filename: `laporan_pengiriman_${new Date().toISOString().split('T')[0]}.csv`,
    content: `No Resi,Pengirim,Penerima,Alamat Tujuan,ID Kurir,Status,Tanggal Kirim,Tanggal Terima,Foto Bukti,Catatan
INS2024001,PT ABC,John Doe,Jl. Sudirman No.1,PISTEST2025,Terkirim,${currentDate},${currentDate},bukti_001.jpg,Diterima langsung
INS2024002,Toko XYZ,Jane Smith,Jl. Thamrin No.5,KURIR001,Terkirim,${currentDate},${currentDate},bukti_002.jpg,Diterima keluarga
INS2024003,CV DEF,Bob Wilson,Jl. Gatot Subroto,KURIR002,Dalam Perjalanan,${currentDate},-,-,Sedang menuju lokasi
INS2024004,UD GHI,Alice Brown,Jl. Rasuna Said,KURIR003,Terkirim,${currentDate},${currentDate},bukti_003.jpg,Diterima asisten
INS2024005,PT JKL,Charlie Davis,Jl. HR Rasuna,KURIR004,Pending,${currentDate},-,-,Menunggu konfirmasi alamat`
  });

  // 4. Daftar Resi Terkirim
  files.push({
    filename: `daftar_resi_terkirim_${new Date().toISOString().split('T')[0]}.csv`,
    content: `No Resi,Tanggal Terkirim,Penerima,Alamat,Kurir,Waktu Pengiriman,Foto Bukti
INS2024001,${currentDate},John Doe,Jl. Sudirman No.1,PISTEST2025,09:30,bukti_001.jpg
INS2024002,${currentDate},Jane Smith,Jl. Thamrin No.5,KURIR001,10:15,bukti_002.jpg
INS2024004,${currentDate},Alice Brown,Jl. Rasuna Said,KURIR003,14:20,bukti_003.jpg
INS2024006,${currentDate},David Lee,Jl. Kuningan,KURIR001,15:45,bukti_004.jpg
INS2024007,${currentDate},Sarah Connor,Jl. Senayan,PISTEST2025,16:10,bukti_005.jpg`
  });

  // 5. Daftar Resi Pending
  files.push({
    filename: `daftar_resi_pending_${new Date().toISOString().split('T')[0]}.csv`,
    content: `No Resi,Tanggal Input,Penerima,Alamat,Kurir Assigned,Status Detail,Alasan Pending,Estimasi Selesai
INS2024003,${currentDate},Bob Wilson,Jl. Gatot Subroto,KURIR002,Dalam Perjalanan,Sedang menuju lokasi,${currentDate} 18:00
INS2024005,${currentDate},Charlie Davis,Jl. HR Rasuna,KURIR004,Pending Konfirmasi,Alamat tidak lengkap,${currentDate} 20:00
INS2024008,${currentDate},Emma Watson,Jl. Menteng Raya,KURIR003,Pending Penjemputan,Belum dijemput dari pengirim,Besok 09:00
INS2024009,${currentDate},Michael Jordan,Jl. Kemang,KURIR001,Gagal Kirim,Penerima tidak ada,Besok 10:00
INS2024010,${currentDate},Jennifer Lopez,Jl. Pondok Indah,KURIR002,Pending Konfirmasi,Nomor telepon tidak aktif,Besok 11:00`
  });

  // 6. Foto Bukti Pengiriman (Metadata)
  files.push({
    filename: `metadata_foto_bukti_${new Date().toISOString().split('T')[0]}.csv`,
    content: `No Resi,Nama File Foto,Ukuran File,Tanggal Upload,Lokasi GPS,Kualitas Foto,Status Verifikasi
INS2024001,bukti_001.jpg,2.3 MB,${currentDate} 09:30,-6.200000 106.816666,HD,Terverifikasi
INS2024002,bukti_002.jpg,1.8 MB,${currentDate} 10:15,-6.175110 106.865036,HD,Terverifikasi
INS2024004,bukti_003.jpg,2.1 MB,${currentDate} 14:20,-6.221977 106.845599,HD,Terverifikasi
INS2024006,bukti_004.jpg,1.9 MB,${currentDate} 15:45,-6.218481 106.841995,Standard,Pending Review
INS2024007,bukti_005.jpg,2.5 MB,${currentDate} 16:10,-6.224588 106.799537,HD,Terverifikasi`
  });

  return files;
};

export const generateTemplateFiles = () => {
  const templates = [];

  // Template Input Data Kurir
  templates.push({
    filename: 'template_data_kurir.csv',
    content: `ID Kurir,Nama Lengkap,Email,No Telepon,Alamat,Wilayah,Area,Lokasi Kerja,Tanggal Bergabung,Status
KURIR001,Nama Kurir,email@example.com,08123456789,Alamat Lengkap,Jakarta,Selatan,Kantor Pusat,2024-01-15,Aktif
KURIR002,,[Kosong untuk diisi],[Kosong untuk diisi],[Kosong untuk diisi],Bandung,Utara,Cabang 1,[YYYY-MM-DD],Aktif`
  });

  // Template Input Paket
  templates.push({
    filename: 'template_input_paket.csv',
    content: `No Resi,Pengirim,Penerima,Alamat Tujuan,No Telp Penerima,Jenis Paket,Berat,Nilai Barang,Biaya Kirim,Catatan Khusus
INS2024001,PT ABC Company,John Doe,Jl. Contoh No. 123,08123456789,Dokumen,0.5 kg,Rp 100.000,Rp 15.000,Fragile - Hati-hati
INS2024002,[Kosong untuk diisi],[Kosong untuk diisi],[Kosong untuk diisi],[Kosong untuk diisi],Barang,1.0 kg,Rp 500.000,Rp 25.000,[Opsional]`
  });

  // Template Absensi
  templates.push({
    filename: 'template_absensi.csv',
    content: `ID Kurir,Nama,Tanggal,Jam Masuk,Jam Keluar,Lokasi,Status,Catatan
KURIR001,Nama Kurir,2024-12-15,08:00,17:00,Jakarta Selatan,Hadir,Normal
KURIR002,[Kosong untuk diisi],[YYYY-MM-DD],[HH:MM],[HH:MM],[Lokasi Kerja],Hadir/Sakit/Izin/Alpha,[Opsional]`
  });

  // Template Laporan Kinerja
  templates.push({
    filename: 'template_laporan_kinerja.csv',
    content: `ID Kurir,Nama,Periode,Total Paket,Berhasil Kirim,Gagal Kirim,Rating,Bonus,Catatan
KURIR001,Nama Kurir,Desember 2024,100,95,5,4.8,Rp 300.000,Excellent performance
KURIR002,[Kosong untuk diisi],[Bulan YYYY],0,0,0,0.0,Rp 0,[Opsional]`
  });

  return templates;
};

export const generateSampleData = (reportType: string) => {
  const currentDate = new Date().toLocaleDateString('id-ID');
  
  switch (reportType) {
    case 'Semua Laporan':
      return `ID Kurir,Nama,Area,Paket Dikirim,Paket Berhasil,Tingkat Keberhasilan,Tanggal
PISTEST2025,Kurir Test,Jakarta Selatan,25,23,92%,${currentDate}
KURIR001,Ahmad Kurniawan,Jakarta Timur,18,16,89%,${currentDate}
KURIR002,Budi Santoso,Jakarta Utara,22,20,91%,${currentDate}
KURIR003,Citra Dewi,Jakarta Barat,15,14,93%,${currentDate}
KURIR004,Dedi Rahman,Jakarta Pusat,20,18,90%,${currentDate}`;

    case 'Laporan Absen':
      return `ID Kurir,Nama,Tanggal,Jam Masuk,Jam Keluar,Status,Lokasi
PISTEST2025,Kurir Test,${currentDate},08:00,17:00,Hadir,Jakarta Selatan
KURIR001,Ahmad Kurniawan,${currentDate},08:15,17:05,Hadir,Jakarta Timur
KURIR002,Budi Santoso,${currentDate},07:45,16:50,Hadir,Jakarta Utara
KURIR003,Citra Dewi,${currentDate},08:30,17:15,Terlambat,Jakarta Barat
KURIR004,Dedi Rahman,${currentDate},-,-,Tidak Hadir,Jakarta Pusat`;

    case 'Laporan Kinerja':
      return `ID Kurir,Nama,Bulan,Paket Total,Berhasil,Gagal,Rating Pelanggan,Bonus
PISTEST2025,Kurir Test,Desember 2024,150,142,8,4.8,Rp 500.000
KURIR001,Ahmad Kurniawan,Desember 2024,120,108,12,4.5,Rp 350.000
KURIR002,Budi Santoso,Desember 2024,135,125,10,4.7,Rp 450.000
KURIR003,Citra Dewi,Desember 2024,90,86,4,4.9,Rp 400.000
KURIR004,Dedi Rahman,Desember 2024,110,98,12,4.3,Rp 250.000`;

    case 'Laporan Pengiriman':
      return `No Resi,Pengirim,Penerima,Alamat Tujuan,ID Kurir,Status,Tanggal Kirim,Tanggal Terima
INS2024001,PT ABC,John Doe,Jl. Sudirman No.1,PISTEST2025,Terkirim,${currentDate},${currentDate}
INS2024002,Toko XYZ,Jane Smith,Jl. Thamrin No.5,KURIR001,Terkirim,${currentDate},${currentDate}
INS2024003,CV DEF,Bob Wilson,Jl. Gatot Subroto,KURIR002,Dalam Perjalanan,${currentDate},-
INS2024004,UD GHI,Alice Brown,Jl. Rasuna Said,KURIR003,Terkirim,${currentDate},${currentDate}
INS2024005,PT JKL,Charlie Davis,Jl. HR Rasuna,KURIR004,Pending,${currentDate},-`;

    case 'Harian':
      return `Tanggal,Total Pengiriman,Berhasil,Gagal,Tingkat Keberhasilan
${currentDate},85,78,7,91.8%`;

    case 'Mingguan':
      const dates = Array.from({length: 7}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toLocaleDateString('id-ID');
      }).reverse();
      
      return `Tanggal,Total Pengiriman,Berhasil,Gagal,Tingkat Keberhasilan
${dates[0]},72,68,4,94.4%
${dates[1]},68,63,5,92.6%
${dates[2]},75,70,5,93.3%
${dates[3]},82,76,6,92.7%
${dates[4]},79,74,5,93.7%
${dates[5]},85,78,7,91.8%
${dates[6]},88,82,6,93.2%`;

    case 'Bulanan':
      return `Bulan,Total Pengiriman,Berhasil,Gagal,Tingkat Keberhasilan,Total Kurir Aktif
November 2024,2156,2003,153,92.9%,45
Oktober 2024,2098,1942,156,92.6%,43
September 2024,1987,1845,142,92.8%,42
Agustus 2024,2245,2078,167,92.6%,44
Juli 2024,2134,1976,158,92.6%,45`;

    default:
      return `Laporan,Tanggal,Data
${reportType},${currentDate},Sample data untuk ${reportType}`;
  }
};
