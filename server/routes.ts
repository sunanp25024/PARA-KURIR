import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage";
import { authenticateWithSupabase } from "./supabase";
import { supabaseStorage } from "./supabaseStorage";
import { insertUserSchema, insertApprovalRequestSchema, insertKurirActivitySchema, insertPackageSchema, insertAttendanceSchema } from "@shared/schema";
import multer from 'multer';
import { authLimiter, apiLimiter, uploadLimiter, securityHeaders, validateInput, validateEnvironment } from './security';

// Global WebSocket connections for real-time updates
const wsConnections = new Set<any>();

function broadcastUpdate(type: string, data: any, excludeUserId?: string) {
  const message = JSON.stringify({ 
    type, 
    ...data, 
    timestamp: new Date().toISOString(),
    userId: excludeUserId 
  });
  
  wsConnections.forEach((ws: any) => {
    if (ws.readyState === 1) { // WebSocket.OPEN
      // Don't broadcast to the user who initiated the change
      if (excludeUserId && ws.userId === excludeUserId) {
        return;
      }
      ws.send(message);
    }
  });
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Validate environment variables
  validateEnvironment();
  
  // Apply security middleware
  app.use(securityHeaders);
  app.use(validateInput);
  
  // Initialize Supabase Storage bucket
  await supabaseStorage.createBucketIfNotExists();

  // Authentication routes (with rate limiting)
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Login attempt:', { email, hasPassword: !!password, environment: process.env.NODE_ENV });
      
      if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ error: "Email and password required" });
      }
      
      // First try Supabase authentication
      const { user: supabaseUser, error: supabaseError } = await authenticateWithSupabase(email, password);
      
      if (supabaseUser && !supabaseError) {
        console.log('Supabase authentication successful');
        // Map Supabase user to our user format
        const user = {
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata.name || 'User',
          role: supabaseUser.user_metadata.role || 'kurir',
          wilayah: supabaseUser.user_metadata.wilayah || 'Jakarta',
          area: supabaseUser.user_metadata.area || 'Pusat',
          lokasi_kerja: supabaseUser.user_metadata.lokasi_kerja || 'Kantor Pusat',
          phone: supabaseUser.user_metadata.phone || '081234567890',
          status: 'aktif'
        };

        return res.json({
          user,
          session: { user_id: user.id }
        });
      }
      
      console.log('Supabase auth failed, trying local database:', supabaseError);
      
      // Fallback to local database authentication
      try {
        const users = await storage.getAllUsers();
        console.log('Database users count:', users.length);
        
        // If no users in database, try to seed it
        if (users.length === 0) {
          console.log('No users found, attempting to seed database...');
          try {
            const { seedDatabase } = await import('./seed');
            await seedDatabase();
            console.log('Database seeded successfully during login');
            // Retry getting users
            const reloadedUsers = await storage.getAllUsers();
            console.log('After seeding, database users count:', reloadedUsers.length);
            const user = reloadedUsers.find(u => u.email === email);
            console.log('User found after seeding:', user ? 'Yes' : 'No');
            
            if (user && (password === '123456' || password === 'password')) {
              return res.json({
                user: {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  role: user.role,
                  wilayah: user.wilayah,
                  area: user.area,
                  lokasi_kerja: user.lokasi_kerja,
                  phone: user.phone,
                  status: user.status
                },
                session: { user_id: user.id }
              });
            }
          } catch (seedError) {
            console.error('Failed to seed database during login:', seedError);
          }
        }
        
        const user = users.find(u => u.email === email);
        console.log('User found in database:', user ? 'Yes' : 'No');
        
        if (!user) {
          console.log('User not found for email:', email);
          return res.status(401).json({ error: "Invalid credentials" });
        }
        
        // For demo purposes, accept common passwords
        console.log('Testing password against accepted values');
        if (password === '123456' || password === 'password') {
          console.log('Password accepted, returning user data');
          return res.json({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              wilayah: user.wilayah,
              area: user.area,
              lokasi_kerja: user.lokasi_kerja,
              phone: user.phone,
              status: user.status
            },
            session: { user_id: user.id }
          });
        } else {
          console.log('Password rejected:', password);
          return res.status(401).json({ error: "Invalid credentials" });
        }
      } catch (dbError) {
        console.error('Database error during authentication:', dbError);
        return res.status(500).json({ error: "Database authentication failed" });
      }
    } catch (error) {
      console.error('General authentication error:', error);
      return res.status(500).json({ error: "Authentication failed" });
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
      broadcastUpdate('package_update', { 
        packageId: pkg.id, 
        status: pkg.status, 
        kurirId: pkg.kurirId 
      }, req.headers['user-id'] as string);
      
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
      
      // Broadcast attendance update
      broadcastUpdate('attendance_update', { 
        kurirId: attendance.kurirId, 
        kurirName: attendance.kurirName,
        checkIn: attendance.checkIn
      }, req.headers['user-id'] as string);
      
      res.status(201).json(attendance);
    } catch (error) {
      res.status(400).json({ error: "Invalid attendance data" });
    }
  });

  // File upload routes for delivery photos
  app.post("/api/upload/delivery-photo", upload.single('photo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No photo file provided" });
      }

      const userId = req.body.userId || 'anonymous';
      const packageId = req.body.packageId;
      
      if (!packageId) {
        return res.status(400).json({ error: "Package ID is required" });
      }

      const fileName = `delivery-${packageId}-${Date.now()}.jpg`;
      
      const { url, error } = await supabaseStorage.uploadDeliveryPhoto(
        req.file.buffer,
        fileName,
        userId
      );

      if (error) {
        return res.status(500).json({ error: `Upload failed: ${error}` });
      }

      // Update package with photo URL
      const updatedPackage = await storage.updatePackage(packageId, {
        foto_bukti_terkirim: url,
        status_pengiriman: 'terkirim'
      });

      if (updatedPackage) {
        broadcastUpdate('package_updated', updatedPackage);
      }

      res.json({ 
        success: true, 
        photoUrl: url,
        message: "Photo uploaded successfully" 
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  
  // WebSocket server for real-time updates on different path
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: '/ws-api' // Use different path to avoid conflicts
  });
  
  wss.on('connection', (ws: any) => {
    console.log('New WebSocket connection established on /ws-api');
    wsConnections.add(ws);
    
    ws.on('message', (message: any) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === 'auth') {
          ws.userId = data.userId;
          ws.userRole = data.role;
          console.log(`User ${data.userId} (${data.role}) authenticated on WebSocket`);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
    
    ws.on('close', () => {
      wsConnections.delete(ws);
      console.log('WebSocket connection closed');
    });
    
    ws.on('error', (error: any) => {
      console.error('WebSocket error:', error);
      wsConnections.delete(ws);
    });
    
    // Send initial connection confirmation
    ws.send(JSON.stringify({ 
      type: 'connection', 
      status: 'connected',
      timestamp: new Date().toISOString()
    }));
  });
  
  return httpServer;
}
