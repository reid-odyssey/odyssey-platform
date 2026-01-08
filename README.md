# Odyssey Console

A comprehensive multi-tenant console frontend for Odyssey's spatial computing services, built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

### 🔐 Authentication
- **Login Page**: Modern authentication interface with social login options (GitHub, Google) and email/password
- **Multi-tenant Support**: Project-based access control with role-based permissions

### 🏗️ Project Management
- **Project Overview**: Firebase-style dashboard with real-time metrics and activity feeds
- **Project Settings**: Configuration management, API keys, webhooks, and danger zone
- **Users & Permissions**: Team member management with role-based access (Owner, Admin, Developer, Viewer)
- **Billing & Usage**: Comprehensive billing dashboard with usage analytics and payment management

### 🚀 Product Services
The console provides dedicated interfaces for all 7 Odyssey services:

1. **Asset Manager**: 3D asset, texture, and media file management with CDN integration
2. **Content Delivery**: Global CDN management with edge location monitoring
3. **Spatial Comms**: Real-time communication for spatial experiences
4. **Avatar**: Avatar creation and management system
5. **Configurator**: Visual configuration tools for 3D products
6. **Spatial UI**: UI components for spatial applications
7. **Hosting**: Application deployment and hosting with custom domains

### 🎨 Design System
- **Custom shadcn Registry**: Reusable Odyssey-specific components
- **Responsive Design**: Mobile-first approach with modern UI patterns
- **Consistent Branding**: Odyssey logo and color scheme throughout

## Prerequisites

- **Node.js**: Version 18.18.0 or higher
- **npm**: Latest version

## Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── login/                    # Authentication page
│   ├── project/[projectId]/      # Project-specific pages
│   │   ├── page.tsx             # Project overview
│   │   ├── settings/            # Project settings
│   │   ├── users/               # User management
│   │   ├── billing/             # Billing dashboard
│   │   ├── asset-manager/       # Asset management
│   │   ├── content-delivery/    # CDN management
│   │   └── hosting/             # Application hosting
│   └── page.tsx                 # Project selection page
├── components/ui/               # shadcn/ui components + custom components
│   ├── odyssey-logo.tsx        # Odyssey branding
│   ├── project-card.tsx        # Project selection cards
│   ├── product-card.tsx        # Service overview cards
│   ├── console-header.tsx      # Navigation header
│   ├── console-sidebar.tsx     # Project navigation
│   └── stats-card.tsx          # Metrics display
├── registry/                    # Custom component registry
└── lib/                        # Utilities and configurations
```

## Key Features by Page

### Project Overview (`/project/[projectId]`)
- Real-time project metrics and KPIs
- Service status overview with quick actions
- Recent activity feed
- Quick access to all product services

### Asset Manager (`/project/[projectId]/asset-manager`)
- File upload and organization
- Asset preview and metadata management
- CDN configuration and analytics
- Collection-based organization

### Content Delivery (`/project/[projectId]/content-delivery`)
- Global edge location monitoring
- Cache management and purging
- Performance analytics
- SSL certificate management

### Hosting (`/project/[projectId]/hosting`)
- Application deployment from Git repositories
- Custom domain management
- Build configuration and environment variables
- Traffic and performance analytics

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React hooks (expandable to Zustand/Redux)

## Development Notes

- All pages use mock data for demonstration purposes
- Components are fully typed with TypeScript
- Responsive design optimized for desktop and mobile
- Follows Firebase/GCP console design patterns
- Ready for backend integration with API endpoints

## Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service. Update the build configuration as needed for your deployment target.

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new components
3. Maintain responsive design principles
4. Test components across different screen sizes
5. Update this README when adding new features
