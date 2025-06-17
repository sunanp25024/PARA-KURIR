# INSAN Mobile - Production Deployment Guide

## Overview

Your INSAN Mobile courier management system has been successfully migrated to a production-ready PWA/APK application with full Supabase integration. This guide covers deployment for both PWA (Vercel) and Android APK (Capacitor).

## Prerequisites

### Required Accounts & Services
- **Supabase Project**: Already configured with your credentials
- **Vercel Account**: For PWA deployment
- **Google Play Console**: For APK distribution (optional)

### Environment Variables
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://cpxuossynzfqmuorvkf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# PWA Configuration (optional)
VITE_VAPID_PUBLIC_KEY=your_vapid_public_key_here
```

## Database Setup

### 1. Run Supabase Migrations
Execute these SQL commands in your Supabase SQL Editor:

```sql
-- Run migration files in order:
-- 1. supabase/migrations/001_initial_schema.sql
-- 2. supabase/migrations/002_rls_policies.sql  
-- 3. supabase/migrations/003_storage_setup.sql
```

### 2. Create Storage Buckets
In Supabase Dashboard > Storage:
- Create bucket: `profile_pictures` (public)
- Create bucket: `delivery_proofs` (public)

### 3. Enable Authentication
In Supabase Dashboard > Authentication:
- Enable email/password authentication
- Configure email templates
- Set up redirect URLs for your domain

## PWA Deployment (Vercel)

### 1. Prepare for Deployment
```bash
npm run build
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Configure Domain
- Add your custom domain in Vercel dashboard
- Update Supabase authentication URLs to include your domain

### 4. Test PWA Features
- [ ] Service worker registration
- [ ] Offline functionality
- [ ] Install prompt
- [ ] Push notifications
- [ ] File uploads

## Android APK Setup

### 1. Install Capacitor Dependencies
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor/camera @capacitor/filesystem @capacitor/storage
```

### 2. Initialize Capacitor
```bash
npx cap init "INSAN Mobile" "com.insan.mobile"
```

### 3. Add Android Platform
```bash
npx cap add android
```

### 4. Build and Sync
```bash
npm run build
npx cap sync android
```

### 5. Configure Android Permissions
Edit `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### 6. Build APK
```bash
npx cap open android
```
Then in Android Studio:
- Build > Generate Signed Bundle/APK
- Choose APK
- Follow signing wizard

## Production Checklist

### Security
- [ ] All environment variables configured
- [ ] RLS policies enabled and tested
- [ ] HTTPS enforced
- [ ] CSP headers configured

### Performance
- [ ] Images optimized
- [ ] Bundle size optimized
- [ ] Caching configured
- [ ] CDN setup (optional)

### Functionality Testing
- [ ] User authentication flows
- [ ] Role-based access control
- [ ] File upload/download
- [ ] Offline synchronization
- [ ] Push notifications
- [ ] Camera functionality (APK)
- [ ] GPS location (APK)

### Mobile Experience
- [ ] Touch interactions responsive
- [ ] Safe area handling on notched devices
- [ ] Proper keyboard behavior
- [ ] Orientation handling
- [ ] App icon and splash screen

## User Roles & Permissions

### Master Admin
- Full system access
- User management across all roles
- Approval request management
- System configuration

### Admin
- Manage PIC and Kurir users
- Package and delivery oversight
- Regional performance monitoring

### PIC (Person in Charge)
- Local area management
- Kurir coordination
- Package tracking

### Kurir (Courier)
- Daily workflow management
- Package scanning and delivery
- Attendance tracking
- Photo upload for delivery proof

## Key Features Implemented

### PWA Features
- **Offline Capability**: Data caching and synchronization
- **Installable**: Add to home screen functionality
- **Responsive**: Mobile-first design
- **Push Notifications**: Real-time updates
- **Service Worker**: Advanced caching strategies

### Mobile Features
- **Camera Integration**: Delivery proof photos
- **GPS Location**: Automatic location tracking
- **Touch Optimized**: 44px minimum touch targets
- **Safe Area Support**: Notch and home indicator handling
- **Native Feel**: App-like interactions and animations

### Business Logic
- **Workflow Management**: 5-step courier daily process
- **Approval System**: Master admin oversight
- **Real-time Updates**: Supabase real-time subscriptions
- **File Management**: Supabase storage integration
- **Role-based Access**: Comprehensive permission system

## Support & Maintenance

### Monitoring
- Monitor Supabase usage and performance
- Track PWA installation rates
- Monitor offline sync success rates

### Updates
- Update service worker cache versions
- Deploy new features via Vercel
- Update APK through Google Play Store

### Backup
- Supabase automatic backups enabled
- Export data regularly for compliance

## Troubleshooting

### Common Issues
1. **PWA not installing**: Check manifest.json and HTTPS
2. **Push notifications not working**: Verify VAPID keys
3. **Camera not working in APK**: Check Android permissions
4. **Offline sync failing**: Check service worker registration
5. **Authentication issues**: Verify Supabase configuration

### Support Contacts
- Technical issues: Check Supabase documentation
- Deployment issues: Refer to Vercel/Capacitor docs
- Business logic: Refer to workflow documentation

Your INSAN Mobile application is now production-ready with full PWA and APK capabilities!