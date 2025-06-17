import type { Request, Response, NextFunction } from 'express';

// Simple rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting middleware
export const createRateLimiter = (windowMs: number, max: number, message: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    
    // Clean expired entries
    const keysToDelete: string[] = [];
    rateLimitStore.forEach((v, k) => {
      if (now > v.resetTime) {
        keysToDelete.push(k);
      }
    });
    keysToDelete.forEach(k => rateLimitStore.delete(k));
    
    const current = rateLimitStore.get(key);
    
    if (!current || now > current.resetTime) {
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (current.count >= max) {
      return res.status(429).json({ error: message });
    }
    
    current.count++;
    next();
  };
};

// Authentication rate limiter
export const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  'Too many authentication attempts, please try again later'
);

// API rate limiter
export const apiLimiter = createRateLimiter(
  1 * 60 * 1000, // 1 minute
  100, // 100 requests
  'Too many API requests, please slow down'
);

// File upload rate limiter
export const uploadLimiter = createRateLimiter(
  5 * 60 * 1000, // 5 minutes
  10, // 10 uploads
  'Too many file uploads, please wait'
);

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.removeHeader('X-Powered-By');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=*, geolocation=*');
  
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  next();
};

// Input validation
export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  // Basic sanitization
  const sanitize = (obj: any): any => {
    if (typeof obj === 'string') {
      return obj.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }
    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    }
    if (typeof obj === 'object' && obj !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitize(value);
      }
      return sanitized;
    }
    return obj;
  };
  
  if (req.body) {
    req.body = sanitize(req.body);
  }
  
  next();
};

// Environment validation
export const validateEnvironment = () => {
  const required = ['DATABASE_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    process.exit(1);
  }
  
  console.log('✓ Environment variables validated');
};