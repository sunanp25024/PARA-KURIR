import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage";
import { insertUserSchema, insertApprovalRequestSchema, insertKurirActivitySchema, insertPackageSchema, insertAttendanceSchema } from "@shared/schema";

// Global WebSocket connections for real-time updates
const wsConnections = new Set<any>();

function broadcastUpdate(type: string, data: any) {
  const message = JSON.stringify({ type, data, timestamp: new Date().toISOString() });
  wsConnections.forEach(ws => {
    if (ws.readyState === 1) { // WebSocket.OPEN
      ws.send(message);
    }
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Simple authentication - in production, use proper password hashing
      const user = await storage.getUserByUserId(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // For demo purposes, accept any password for existing users
      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        session: { user_id: user.id }
      });
    } catch (error) {
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    res.json({ message: "Logged out successfully" });
  });

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
      
      // Broadcast user creation
      broadcastUpdate('user_created', user);
      
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
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
      
      // Broadcast new approval request
      broadcastUpdate('approval_request_created', request);
      
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
      
      // Broadcast approval request update
      broadcastUpdate('approval_request_updated', request);
      
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
      
      // Broadcast kurir activity creation
      broadcastUpdate('kurir_activity_created', activity);
      
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
      
      // Broadcast package creation
      broadcastUpdate('package_created', pkg);
      
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
      
      // Broadcast package update
      broadcastUpdate('package_updated', pkg);
      
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
      
      // Broadcast attendance creation
      broadcastUpdate('attendance_created', attendance);
      
      res.status(201).json(attendance);
    } catch (error) {
      res.status(400).json({ error: "Invalid attendance data" });
    }
  });

  const httpServer = createServer(app);
  
  // WebSocket server for real-time updates on different path
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: '/ws-api' // Use different path to avoid conflicts
  });
  
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection established on /ws-api');
    wsConnections.add(ws);
    
    ws.on('close', () => {
      wsConnections.delete(ws);
      console.log('WebSocket connection closed');
    });
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      wsConnections.delete(ws);
    });
    
    // Send initial connection confirmation
    ws.send(JSON.stringify({ 
      type: 'connection', 
      data: { status: 'connected' },
      timestamp: new Date().toISOString()
    }));
  });
  
  return httpServer;
}
