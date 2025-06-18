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

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Recent Changes:
- June 18, 2025: Complete responsive layout system implemented
  - Added platform detection utility for Android, iOS, and Desktop optimization
  - Implemented responsive grid, card, and button components
  - Updated all layouts to be mobile-first with touch-friendly interactions
  - Added PWA-ready styling with safe area support for iOS
  - Created responsive sidebar with mobile bottom navigation for courier users
  - Enhanced UI consistency across all device types and screen sizes
  - Added CSS custom properties for platform-specific styling

- June 18, 2025: Professional design system implementation
  - Created comprehensive professional CSS component library
  - Added professional color palette with proper contrast ratios
  - Implemented consistent typography scale and spacing system
  - Enhanced sidebar with professional styling and better user experience
  - Improved dashboard header with better visual hierarchy
  - Added professional card variants and button styles
  - Enhanced PWA status bar with modern design
  - Created responsive components for cards and buttons