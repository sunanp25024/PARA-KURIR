import { db } from "./db";
import { 
  users, 
  approvalRequests, 
  kurirActivities, 
  packages, 
  attendance,
  type User, 
  type InsertUser,
  type ApprovalRequest,
  type InsertApprovalRequest,
  type KurirActivity,
  type InsertKurirActivity,
  type Package,
  type InsertPackage,
  type Attendance,
  type InsertAttendance
} from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUserId(userId: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Approval request operations
  getApprovalRequests(): Promise<ApprovalRequest[]>;
  getPendingApprovalRequests(): Promise<ApprovalRequest[]>;
  createApprovalRequest(request: InsertApprovalRequest): Promise<ApprovalRequest>;
  updateApprovalRequest(id: string, updates: Partial<ApprovalRequest>): Promise<ApprovalRequest | undefined>;
  
  // Kurir activity operations
  getKurirActivities(kurirId?: string): Promise<KurirActivity[]>;
  createKurirActivity(activity: InsertKurirActivity): Promise<KurirActivity>;
  
  // Package operations
  getPackages(kurirId?: string): Promise<Package[]>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: string, updates: Partial<Package>): Promise<Package | undefined>;
  
  // Attendance operations
  getAttendance(kurirId?: string): Promise<Attendance[]>;
  createAttendance(attendance: InsertAttendance): Promise<Attendance>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUserId(userId: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.user_id, userId)).limit(1);
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(users.created_at);
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUser(id: string, userUpdates: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ ...userUpdates, updated_at: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }

  // Approval request operations
  async getApprovalRequests(): Promise<ApprovalRequest[]> {
    return await db.select().from(approvalRequests).orderBy(desc(approvalRequests.created_at));
  }

  async getPendingApprovalRequests(): Promise<ApprovalRequest[]> {
    return await db.select().from(approvalRequests)
      .where(eq(approvalRequests.status, "pending"))
      .orderBy(desc(approvalRequests.created_at));
  }

  async createApprovalRequest(request: InsertApprovalRequest): Promise<ApprovalRequest> {
    const result = await db.insert(approvalRequests).values(request).returning();
    return result[0];
  }

  async updateApprovalRequest(id: string, updates: Partial<ApprovalRequest>): Promise<ApprovalRequest | undefined> {
    const result = await db.update(approvalRequests)
      .set(updates)
      .where(eq(approvalRequests.id, id))
      .returning();
    return result[0];
  }

  // Kurir activity operations
  async getKurirActivities(kurirId?: string): Promise<KurirActivity[]> {
    const query = db.select().from(kurirActivities);
    
    if (kurirId) {
      return await query.where(eq(kurirActivities.kurir_id, kurirId)).orderBy(desc(kurirActivities.waktu));
    }
    
    return await query.orderBy(desc(kurirActivities.waktu));
  }

  async createKurirActivity(activity: InsertKurirActivity): Promise<KurirActivity> {
    const result = await db.insert(kurirActivities).values(activity).returning();
    return result[0];
  }

  // Package operations
  async getPackages(kurirId?: string): Promise<Package[]> {
    const query = db.select().from(packages);
    
    if (kurirId) {
      return await query.where(eq(packages.kurir_id, kurirId)).orderBy(desc(packages.created_at));
    }
    
    return await query.orderBy(desc(packages.created_at));
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const result = await db.insert(packages).values(pkg).returning();
    return result[0];
  }

  async updatePackage(id: string, updates: Partial<Package>): Promise<Package | undefined> {
    const result = await db.update(packages)
      .set({ ...updates, updated_at: new Date() })
      .where(eq(packages.id, id))
      .returning();
    return result[0];
  }

  // Attendance operations
  async getAttendance(kurirId?: string): Promise<Attendance[]> {
    const query = db.select().from(attendance);
    
    if (kurirId) {
      return await query.where(eq(attendance.kurir_id, kurirId)).orderBy(desc(attendance.tanggal));
    }
    
    return await query.orderBy(desc(attendance.tanggal));
  }

  async createAttendance(attendanceData: InsertAttendance): Promise<Attendance> {
    const result = await db.insert(attendance).values(attendanceData).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
