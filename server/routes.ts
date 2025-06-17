import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertApprovalRequestSchema, insertKurirActivitySchema, insertPackageSchema, insertAttendanceSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:userId", async (req, res) => {
    try {
      const user = await storage.getUserByUserId(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to update user" });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      await storage.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete user" });
    }
  });

  // Approval requests routes
  app.get("/api/approval-requests", async (req, res) => {
    try {
      const requests = await storage.getApprovalRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch approval requests" });
    }
  });

  app.get("/api/approval-requests/pending", async (req, res) => {
    try {
      const requests = await storage.getPendingApprovalRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pending requests" });
    }
  });

  app.post("/api/approval-requests", async (req, res) => {
    try {
      const requestData = insertApprovalRequestSchema.parse(req.body);
      const request = await storage.createApprovalRequest(requestData);
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid approval request data" });
    }
  });

  app.patch("/api/approval-requests/:id", async (req, res) => {
    try {
      const request = await storage.updateApprovalRequest(req.params.id, req.body);
      if (!request) {
        return res.status(404).json({ error: "Approval request not found" });
      }
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Failed to update approval request" });
    }
  });

  // Kurir activities routes
  app.get("/api/kurir-activities", async (req, res) => {
    try {
      const kurirId = req.query.kurirId as string;
      const activities = await storage.getKurirActivities(kurirId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch kurir activities" });
    }
  });

  app.post("/api/kurir-activities", async (req, res) => {
    try {
      const activityData = insertKurirActivitySchema.parse(req.body);
      const activity = await storage.createKurirActivity(activityData);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ error: "Invalid activity data" });
    }
  });

  // Packages routes
  app.get("/api/packages", async (req, res) => {
    try {
      const kurirId = req.query.kurirId as string;
      const packages = await storage.getPackages(kurirId);
      res.json(packages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch packages" });
    }
  });

  app.post("/api/packages", async (req, res) => {
    try {
      const packageData = insertPackageSchema.parse(req.body);
      const pkg = await storage.createPackage(packageData);
      res.status(201).json(pkg);
    } catch (error) {
      res.status(400).json({ error: "Invalid package data" });
    }
  });

  app.patch("/api/packages/:id", async (req, res) => {
    try {
      const pkg = await storage.updatePackage(req.params.id, req.body);
      if (!pkg) {
        return res.status(404).json({ error: "Package not found" });
      }
      res.json(pkg);
    } catch (error) {
      res.status(400).json({ error: "Failed to update package" });
    }
  });

  // Attendance routes
  app.get("/api/attendance", async (req, res) => {
    try {
      const kurirId = req.query.kurirId as string;
      const attendance = await storage.getAttendance(kurirId);
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attendance" });
    }
  });

  app.post("/api/attendance", async (req, res) => {
    try {
      const attendanceData = insertAttendanceSchema.parse(req.body);
      const attendance = await storage.createAttendance(attendanceData);
      res.status(201).json(attendance);
    } catch (error) {
      res.status(400).json({ error: "Invalid attendance data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
