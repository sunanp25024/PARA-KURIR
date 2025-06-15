
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
