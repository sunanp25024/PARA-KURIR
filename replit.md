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

## Changelog

Changelog:
- June 17, 2025. Initial setup