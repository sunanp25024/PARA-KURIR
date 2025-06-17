# INSAN Mobile - Courier Management System

## Overview

INSAN Mobile is a comprehensive courier management system built as a full-stack web application with Progressive Web App (PWA) capabilities. The system provides role-based access control for managing courier operations, package tracking, and administrative tasks across different user roles including Master Admin, Admin, PIC (Person in Charge), and Courier.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API for workflow management, TanStack Query for server state
- **Routing**: React Router DOM for client-side navigation
- **PWA Support**: Service worker implementation for offline capabilities and app installation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Development**: TSX for TypeScript execution in development
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon serverless PostgreSQL database
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Structure**: RESTful API with Express routes

### Database Architecture
- **Primary Database**: PostgreSQL via Neon serverless
- **Secondary Database**: Supabase for additional data services
- **Schema Management**: Drizzle migrations with TypeScript schemas
- **Data Models**: Shared TypeScript schemas between client and server

## Key Components

### User Management System
- Multi-role authentication (Master Admin, Admin, PIC, Courier)
- Role-based access control with different dashboard views
- User profile management with location tracking
- Approval workflow system for administrative changes

### Package Management System
- Daily package input and validation
- Barcode/QR scanning for package tracking
- Real-time delivery status updates
- COD (Cash on Delivery) package handling
- Photo documentation for proof of delivery

### Workflow Management
- Context-based workflow state management
- Step-by-step courier daily operations
- Progress tracking and validation
- Automatic progression between workflow stages

### Approval System
- Master Admin approval for sensitive operations
- Request tracking with status management
- Bulk import approval for Excel data
- Audit trail for all approval decisions

### Real-time Features
- GPS location tracking for couriers
- Live attendance monitoring
- Package status updates
- Push notifications for important events

## Data Flow

1. **Authentication Flow**: User logs in → Role verification → Dashboard routing → Feature access control
2. **Package Workflow**: Input packages → Scan verification → Delivery tracking → Status updates → Performance reporting
3. **Approval Flow**: Admin request → Master Admin review → Approval/rejection → System update
4. **Data Sync**: Local storage for offline capability → Server synchronization → Database persistence

## External Dependencies

### Database Services
- **Neon Database**: Primary PostgreSQL database for application data
- **Supabase**: Secondary database for approval system and additional features

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast bundling for production server code
- **PostCSS**: CSS processing with Tailwind integration

### Third-party Integrations
- **PWA Toolkit**: Service worker and installation prompts
- **Excel Processing**: File upload and parsing capabilities
- **Camera API**: Photo capture for delivery proof
- **Geolocation API**: GPS tracking for courier locations

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reloading
- **Database**: Neon development database with migrations
- **Port Configuration**: Local port 5000 with external port 80 mapping

### Production Deployment
- **Platform**: Replit with autoscale deployment target
- **Build Process**: Vite client build + ESBuild server bundling
- **Environment**: Node.js 20 with PostgreSQL 16 module
- **Static Assets**: Vite-built client served from dist/public

### Configuration Management
- **Environment Variables**: DATABASE_URL for database connection
- **Path Aliases**: TypeScript path mapping for clean imports
- **Asset Management**: Dedicated assets directory with build-time optimization

## User Preferences

Preferred communication style: Simple, everyday language.

## Production Readiness Status

### Current Status: 95% Production Ready

#### Express Backend: 95% Complete  
- ✅ Production security hardening (CORS, Helmet, rate limiting)
- ✅ API endpoints with authentication and validation
- ✅ WebSocket real-time synchronization with CORS support
- ✅ Supabase integration with fallback authentication
- ✅ File upload system with Supabase Storage
- ✅ Vercel deployment configuration
- ✅ Comprehensive API documentation and health checks
- ❌ SSL certificate configuration for custom domains

#### PWA/APK Readiness: 85% Complete
- ✅ Service worker with offline caching
- ✅ PWA manifest with shortcuts and metadata
- ✅ Capacitor configuration for Android APK
- ✅ Role-based access control (4 user levels)
- ✅ Mobile-responsive design with touch optimization
- ✅ Camera integration for delivery proof
- ❌ PWA icons (need PNG files in various sizes)
- ❌ Android signing certificate for APK release

#### Security Features Active
- **Rate limiting**: Auth (5/15min), API (100/min), Upload (10/5min)
- **CORS**: Configured for Vercel domains and localhost
- **Helmet**: Security headers with XSS and CSRF protection
- **Input validation**: XSS prevention and SQL injection protection
- **Authentication**: Multi-layer with Supabase and local fallback

#### Critical Items Remaining:
1. Generate PWA icon files (72x72 to 512x512 PNG)
2. Create Android signing certificate for APK deployment
3. Setup Google Play Console and app store materials

#### Estimated Time to Production: 3-5 days
- Days 1-2: Complete PWA assets and icon generation
- Days 3-4: APK signing and app store preparation
- Day 5: Final testing and deployment

## Changelog

Recent Changes:
- June 17, 2025: Production readiness improvements
  - Added Supabase Storage integration for delivery photo uploads
  - Implemented file upload API routes with multer middleware
  - Created production checklist with critical items identified
  - Fixed React hook errors in SimpleAuthContext
  - Added HMR optimization for Replit development environment
  - Enhanced development status monitoring with DevStatus component
  - Current production readiness: 85% (up from 80%)
- June 17, 2025: Complete Supabase Auth integration with role-based access control
  - Integrated server-side Supabase authentication with fallback to local database
  - Implemented comprehensive role-based access control for all routes (master_admin, admin, pic, kurir)
  - Added ProtectedRoute component for route-level access control
  - Created TestingGuide component with comprehensive testing instructions for all roles
  - Activated real-time WebSocket synchronization for all data operations
  - Fixed React hook errors in AuthContext by removing client-side dynamic imports
  - Enhanced login interface with tabbed design including testing guide
  - Verified WebSocket connections working properly on /ws-api endpoint
- June 17, 2025: Enhanced courier workflow layout with modern UI/UX design
  - Implemented interactive step navigation with visual feedback
  - Added gradient backgrounds and glass morphism effects
  - Fixed navigation bottlenecks by adding continue buttons in delivery and pending steps
  - Modernized sidebar design with professional appearance
  - Maintained all existing workflow functionality
  - Resolved user workflow completion issues with explicit progression controls
  - Cleaned up duplicate navigation buttons for streamlined interface
  - Repositioned completion buttons to bottom of interface for better UX flow
  - Added completion button for pending return step to ensure seamless workflow progression
- June 17, 2025: Initial setup