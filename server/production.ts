import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import type { Express } from 'express';

// Production-ready CORS configuration for Vercel frontend
export const corsConfig = cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://para-kurir.vercel.app',
      'https://para-kurir-*.vercel.app',
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const pattern = allowedOrigin.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowedOrigin === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-API-Key'
  ]
});

// Security headers with Helmet
export const securityConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: ["'self'", "https:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:", "wss:"],
      fontSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// Rate limiting configurations
export const rateLimits = {
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts
    message: { error: 'Too many authentication attempts' },
    standardHeaders: true,
    legacyHeaders: false
  }),
  api: rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // 100 requests
    message: { error: 'Too many API requests' },
    standardHeaders: true,
    legacyHeaders: false
  }),
  upload: rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // 10 uploads
    message: { error: 'Too many file uploads' },
    standardHeaders: true,
    legacyHeaders: false
  })
};

// Compression configuration
export const compressionConfig = compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6,
  threshold: 1024
});

// Apply all production middleware
export const applyProductionMiddleware = (app: Express) => {
  // Trust proxy for production
  app.set('trust proxy', 1);
  
  // Security first
  app.use(securityConfig);
  
  // CORS configuration
  app.use(corsConfig);
  
  // Compression
  app.use(compressionConfig);
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // API documentation endpoint
  app.get('/api', (req, res) => {
    res.json({
      name: 'PARA KURIR API',
      version: '1.0.0',
      description: 'Production-ready courier management API',
      endpoints: {
        auth: {
          login: 'POST /api/auth/login'
        },
        users: {
          list: 'GET /api/users',
          create: 'POST /api/users',
          update: 'PUT /api/users/:id'
        },
        packages: {
          list: 'GET /api/packages',
          create: 'POST /api/packages',
          update: 'PUT /api/packages/:id'
        },
        uploads: {
          photo: 'POST /api/upload/delivery-photo'
        },
        websocket: 'ws://domain/ws-api'
      }
    });
  });

  console.log('✓ Production middleware configured');
};