import { storage } from "./storage";
import { InsertUser, InsertApprovalRequest, InsertKurirActivity, InsertPackage, InsertAttendance } from "@shared/schema";

export async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Seed users
    const users: InsertUser[] = [
      // Master Admin
      {
        user_id: "MASTERADMIN2025",
        email: "masteradmin@insanmobile.com",
        password_hash: "$2a$10$dummy_hash_1",
        name: "Master Administrator",
        role: "master_admin",
        wilayah: "Jakarta",
        area: "Pusat",
        lokasi_kerja: "Kantor Pusat - Menara BCA",
        phone: "081234567800",
        status: "aktif"
      },
      // Admin
      {
        user_id: "ADMIN2025",
        email: "admin@insanmobile.com",
        password_hash: "$2a$10$dummy_hash_2",
        name: "Admin User",
        role: "admin",
        wilayah: "Jakarta",
        area: "Pusat",
        lokasi_kerja: "Kantor Pusat - Menara BCA",
        phone: "081234567801",
        status: "aktif"
      },
      {
        user_id: "ADMIN001",
        email: "admin1@insanmobile.com",
        password_hash: "$2a$10$dummy_hash_3",
        name: "Admin Jakarta Timur",
        role: "admin",
        wilayah: "Jakarta",
        area: "Timur",
        lokasi_kerja: "Cabang Cakung - Jl. Raya Cakung",
        phone: "081234567802",
        status: "aktif"
      },
      // PIC
      {
        user_id: "PIC2025",
        email: "pic@insanmobile.com",
        password_hash: "$2a$10$dummy_hash_4",
        name: "PIC User",
        role: "pic",
        wilayah: "Jakarta",
        area: "Selatan",
        lokasi_kerja: "Kantor Pusat - Jl. Sudirman",
        phone: "081234567803",
        status: "aktif"
      },
      {
        user_id: "PIC001",
        email: "pic1@insanmobile.com",
        password_hash: "$2a$10$dummy_hash_5",
        name: "PIC Jakarta Utara",
        role: "pic",
        wilayah: "Jakarta",
        area: "Utara",
        lokasi_kerja: "Cabang Kelapa Gading - Mall Kelapa Gading",
        phone: "081234567804",
        status: "aktif"
      },
      // Kurir
      {
        user_id: "PISTEST2025",
        email: "kurir@insanmobile.com",
        password_hash: "$2a$10$dummy_hash_7",
        name: "Kurir Test",
        role: "kurir",
        wilayah: "Jakarta",
        area: "Selatan",
        lokasi_kerja: "Kantor Pusat - Jl. Sudirman",
        phone: "081234567890",
        status: "aktif"
      },
      {
        user_id: "KURIR001",
        email: "ahmad@insanmobile.com",
        password_hash: "$2a$10$dummy_hash_8",
        name: "Ahmad Kurniawan",
        role: "kurir",
        wilayah: "Jakarta",
        area: "Timur",
        lokasi_kerja: "Cabang Cakung - Jl. Raya Cakung",
        phone: "081234567891",
        status: "aktif"
      },
      {
        user_id: "KURIR002",
        email: "budi@insanmobile.com",
        password_hash: "$2a$10$dummy_hash_9",
        name: "Budi Santoso",
        role: "kurir",
        wilayah: "Jakarta",
        area: "Utara",
        lokasi_kerja: "Cabang Kelapa Gading - Mall Kelapa Gading",
        phone: "081234567892",
        status: "tidak_aktif"
      }
    ];

    for (const user of users) {
      try {
        // Check if user already exists
        const existingUser = await storage.getUserByUserId(user.user_id);
        if (!existingUser) {
          await storage.createUser(user);
          console.log(`Created user: ${user.user_id}`);
        } else {
          console.log(`User already exists: ${user.user_id}`);
        }
      } catch (error) {
        console.log(`Skipping existing user: ${user.user_id}`);
      }
    }
    console.log("Users seeded successfully");

    // Seed packages
    const packages: InsertPackage[] = [
      {
        resi_number: "INS240617001",
        kurir_id: "PISTEST2025",
        kurir_name: "Kurir Test",
        pengirim: "Toko ABC",
        penerima: "Budi Hartono",
        alamat_pengirim: "Jl. Sudirman No. 1, Jakarta Selatan",
        alamat_penerima: "Jl. Merdeka No. 15, Jakarta Pusat",
        status_pengiriman: "terkirim",
        tanggal_pickup: new Date(Date.now() - 8 * 60 * 60 * 1000),
        tanggal_terkirim: new Date(Date.now() - 2 * 60 * 60 * 1000),
        berat: "2.5",
        nilai_cod: "150000"
      },
      {
        resi_number: "INS240617002",
        kurir_id: "KURIR001",
        kurir_name: "Ahmad Kurniawan",
        pengirim: "PT XYZ",
        penerima: "Siti Nurhaliza",
        alamat_pengirim: "Jl. Cakung Raya No. 10, Jakarta Timur",
        alamat_penerima: "Jl. Kebon Jeruk No. 8, Jakarta Barat",
        status_pengiriman: "dalam_perjalanan",
        tanggal_pickup: new Date(Date.now() - 3 * 60 * 60 * 1000),
        berat: "1.2",
        nilai_cod: "75000"
      }
    ];

    for (const pkg of packages) {
      try {
        await storage.createPackage(pkg);
        console.log(`Created package: ${pkg.resi_number}`);
      } catch (error) {
        console.log(`Package already exists: ${pkg.resi_number}`);
      }
    }
    console.log("Packages seeded successfully");

    // Seed attendance
    const attendanceRecords: InsertAttendance[] = [
      {
        kurir_id: "PISTEST2025",
        kurir_name: "Kurir Test",
        tanggal: new Date().toISOString().split('T')[0],
        jam_masuk: "08:00:00",
        jam_keluar: "17:00:00",
        lokasi_absen: "Kantor Pusat - Jl. Sudirman",
        status: "hadir",
        total_jam: "8.5"
      },
      {
        kurir_id: "KURIR001",
        kurir_name: "Ahmad Kurniawan",
        tanggal: new Date().toISOString().split('T')[0],
        jam_masuk: "08:15:00",
        jam_keluar: "17:10:00",
        lokasi_absen: "Cabang Cakung - Jl. Raya Cakung",
        status: "hadir",
        total_jam: "8.55"
      }
    ];

    for (const attendance of attendanceRecords) {
      try {
        await storage.createAttendance(attendance);
        console.log(`Created attendance for: ${attendance.kurir_id}`);
      } catch (error) {
        console.log(`Attendance already exists for: ${attendance.kurir_id}`);
      }
    }
    console.log("Attendance seeded successfully");

    // Seed kurir activities
    const activities: InsertKurirActivity[] = [
      {
        kurir_id: "PISTEST2025",
        kurir_name: "Kurir Test",
        activity_type: "absen_masuk",
        description: "Absen masuk pagi",
        lokasi: "Kantor Pusat - Jl. Sudirman",
        status: "selesai"
      },
      {
        kurir_id: "KURIR001",
        kurir_name: "Ahmad Kurniawan",
        activity_type: "pengiriman",
        description: "Melakukan pengiriman paket",
        lokasi: "Area Timur",
        status: "dalam_proses"
      }
    ];

    for (const activity of activities) {
      try {
        await storage.createKurirActivity(activity);
        console.log(`Created activity for: ${activity.kurir_id}`);
      } catch (error) {
        console.log(`Activity creation failed for: ${activity.kurir_id}`);
      }
    }
    console.log("Activities seeded successfully");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}