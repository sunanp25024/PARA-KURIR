# PARA KURIR Backend - Production Deployment Guide

## 🚀 Express Backend untuk Frontend Vercel

Backend Express ini sudah dikonfigurasi untuk deployment production dengan frontend React yang di-deploy di Vercel.

### ✅ Fitur yang Sudah Dikonfigurasi

#### 1. Security & CORS
- **CORS** dikonfigurasi untuk Vercel domains (`*.vercel.app`)
- **Helmet** security headers
- **Rate limiting**: Auth (5/15min), API (100/min), Upload (10/5min)
- **Input validation** dan sanitization
- **HTTPS enforcement** untuk production

#### 2. API Endpoints Siap Production
```
GET  /health                     - Health check
GET  /api                        - API documentation
POST /api/auth/login             - Authentication (rate limited)
POST /api/auth/logout            - Logout
GET  /api/users                  - List users (rate limited)
POST /api/users                  - Create user (rate limited)
GET  /api/packages               - List packages
POST /api/packages               - Create package
POST /api/upload/delivery-photo  - Upload foto (rate limited)
```

#### 3. WebSocket Real-time
- **Path**: `/ws-api`
- **CORS support** untuk Vercel frontend
- **Origin verification** untuk security
- **Real-time broadcasting** untuk semua data updates

#### 4. Supabase Integration
- **Authentication** dengan fallback ke database lokal
- **Storage** untuk upload foto pengiriman
- **Row Level Security** policies
- **Environment validation**

### 🔧 Environment Variables yang Diperlukan

```bash
# Database
DATABASE_URL=postgresql://...

# Supabase (optional)
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Frontend URL (untuk CORS)
FRONTEND_URL=https://para-kurir.vercel.app

# Node Environment
NODE_ENV=production
```

### 📦 Deployment Options

#### Option 1: Deploy ke Railway/Render
```bash
# 1. Push ke GitHub repository
git add .
git commit -m "Production ready backend"
git push origin main

# 2. Connect Railway/Render ke repository
# 3. Set environment variables
# 4. Deploy otomatis akan berjalan
```

#### Option 2: Deploy ke Vercel (Serverless)
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod

# 3. Set environment variables di Vercel dashboard
```

#### Option 3: Deploy ke VPS/Cloud Server
```bash
# 1. Clone repository di server
git clone https://github.com/your-repo/para-kurir-backend

# 2. Install dependencies
npm install

# 3. Build (jika perlu)
npm run build

# 4. Start dengan PM2
pm2 start server/index.ts --name para-kurir-api
```

### 🔗 Frontend Integration

#### 1. Update API Base URL di Frontend
```typescript
// Di frontend React (Vercel)
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.railway.app' 
  : 'http://localhost:5000';

// WebSocket URL
const WS_URL = process.env.NODE_ENV === 'production'
  ? 'wss://your-backend.railway.app/ws-api'
  : 'ws://localhost:5000/ws-api';
```

#### 2. Environment Variables di Vercel
```bash
# Di Vercel dashboard, tambahkan:
VITE_API_URL=https://your-backend.railway.app
VITE_WS_URL=wss://your-backend.railway.app/ws-api
```

### 🧪 Testing Production Setup

#### 1. Health Check
```bash
curl https://your-backend.railway.app/health
# Response: {"status":"OK","timestamp":"...","uptime":123,"environment":"production"}
```

#### 2. API Documentation
```bash
curl https://your-backend.railway.app/api
# Response: API documentation dengan semua endpoints
```

#### 3. Authentication Test
```bash
curl -X POST https://your-backend.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'
```

#### 4. WebSocket Test
```javascript
// Test WebSocket connection dari browser
const ws = new WebSocket('wss://your-backend.railway.app/ws-api');
ws.onopen = () => console.log('Connected');
ws.onmessage = (event) => console.log('Message:', event.data);
```

### 🛡️ Security Features Active

#### 1. Rate Limiting
- **Authentication**: 5 attempts per 15 minutes
- **API calls**: 100 requests per minute
- **File uploads**: 10 uploads per 5 minutes

#### 2. Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security (production only)
- Referrer-Policy: strict-origin-when-cross-origin

#### 3. Input Validation
- XSS protection
- SQL injection prevention
- File upload restrictions (5MB max, images only)

### 📊 Monitoring & Maintenance

#### 1. Logs Monitoring
```bash
# Railway/Render: Check dashboard logs
# VPS: Use PM2
pm2 logs para-kurir-api
```

#### 2. Database Health
```bash
# Check database connection
curl https://your-backend.railway.app/api/users
```

#### 3. Performance Monitoring
- Response times < 200ms
- Database query optimization
- Memory usage monitoring

### 🚨 Troubleshooting

#### 1. CORS Issues
```
Error: "Access to fetch at '...' from origin '...' has been blocked by CORS"
```
**Solution**: Update `FRONTEND_URL` environment variable atau tambahkan domain ke `allowedOrigins` di `server/production.ts`

#### 2. WebSocket Connection Failed
```
Error: "WebSocket connection to 'wss://...' failed"
```
**Solution**: Pastikan WebSocket support di hosting provider, atau gunakan Socket.IO sebagai fallback

#### 3. Rate Limit Exceeded
```
Error: "Too many requests"
```
**Solution**: Adjust rate limits di `server/production.ts` atau implement Redis untuk distributed rate limiting

### 📋 Pre-Deployment Checklist

- [ ] Environment variables set
- [ ] Database accessible
- [ ] Supabase configured (optional)
- [ ] CORS domains updated
- [ ] SSL certificate active
- [ ] Health check responding
- [ ] API endpoints tested
- [ ] WebSocket connection tested
- [ ] File upload tested
- [ ] Authentication tested

## ✅ Status: Production Ready

Backend Express PARA KURIR sudah siap untuk deployment production dengan semua fitur security, CORS, dan integration yang diperlukan untuk frontend Vercel.