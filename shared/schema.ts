import { pgTable, text, serial, integer, boolean, uuid, timestamp, decimal, date, time } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for storing user accounts
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id").notNull().unique(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  wilayah: text("wilayah"),
  area: text("area"),
  lokasi_kerja: text("lokasi_kerja"),
  phone: text("phone"),
  status: text("status").default("aktif"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Approval requests table
export const approvalRequests = pgTable("approval_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  requester_id: text("requester_id").notNull(),
  requester_name: text("requester_name").notNull(),
  request_type: text("request_type").notNull(),
  target_admin_id: text("target_admin_id"),
  request_data: text("request_data").notNull(), // JSON string
  current_data: text("current_data"), // JSON string
  status: text("status").default("pending").notNull(),
  approved_by: text("approved_by"),
  approved_at: timestamp("approved_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  notes: text("notes"),
});

// Kurir activities table for courier activities
export const kurirActivities = pgTable("kurir_activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  kurir_id: text("kurir_id").notNull(),
  kurir_name: text("kurir_name").notNull(),
  activity_type: text("activity_type").notNull(),
  description: text("description"),
  lokasi: text("lokasi"),
  waktu: timestamp("waktu").defaultNow().notNull(),
  status: text("status").default("selesai"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Packages table for package deliveries
export const packages = pgTable("packages", {
  id: uuid("id").defaultRandom().primaryKey(),
  resi_number: text("resi_number").notNull().unique(),
  kurir_id: text("kurir_id").notNull(),
  kurir_name: text("kurir_name").notNull(),
  pengirim: text("pengirim").notNull(),
  penerima: text("penerima").notNull(),
  alamat_pengirim: text("alamat_pengirim").notNull(),
  alamat_penerima: text("alamat_penerima").notNull(),
  status_pengiriman: text("status_pengiriman").default("pickup"),
  tanggal_pickup: timestamp("tanggal_pickup"),
  tanggal_terkirim: timestamp("tanggal_terkirim"),
  berat: decimal("berat", { precision: 10, scale: 2 }),
  nilai_cod: decimal("nilai_cod", { precision: 15, scale: 2 }).default("0"),
  catatan: text("catatan"),
  foto_bukti_terkirim: text("foto_bukti_terkirim"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Attendance table for courier attendance
export const attendance = pgTable("attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  kurir_id: text("kurir_id").notNull(),
  kurir_name: text("kurir_name").notNull(),
  tanggal: date("tanggal").notNull(),
  jam_masuk: time("jam_masuk"),
  jam_keluar: time("jam_keluar"),
  lokasi_absen: text("lokasi_absen"),
  foto_absen: text("foto_absen"),
  status: text("status").default("hadir"),
  total_jam: decimal("total_jam", { precision: 5, scale: 2 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertApprovalRequestSchema = createInsertSchema(approvalRequests).omit({
  id: true,
  created_at: true,
  approved_at: true,
});

export const insertKurirActivitySchema = createInsertSchema(kurirActivities).omit({
  id: true,
  created_at: true,
  waktu: true,
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertAttendanceSchema = createInsertSchema(attendance).omit({
  id: true,
  created_at: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ApprovalRequest = typeof approvalRequests.$inferSelect;
export type InsertApprovalRequest = z.infer<typeof insertApprovalRequestSchema>;

export type KurirActivity = typeof kurirActivities.$inferSelect;
export type InsertKurirActivity = z.infer<typeof insertKurirActivitySchema>;

export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
