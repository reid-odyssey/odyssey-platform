import { ConsoleHeader } from "@/components/ui/console-header"
import { ConsoleSidebar } from "@/components/ui/console-sidebar"
import { StatsCard } from "@/components/ui/stats-card"
import { ProductCard } from "@/components/ui/product-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Activity, 
  DollarSign, 
  Database,
  Package, 
  Truck, 
  MessageSquare, 
  User, 
  Palette, 
  Layout, 
  Server,
  Plus,
  ExternalLink
} from "lucide-react"

// Mock data - in real app this would come from API
const mockProject = {
  name: "odyssey-console",
  id: "proj_123456789"
}

const mockProjects = [
  { name: "odyssey-console", id: "proj_123456789" },
  { name: "Demo Project", id: "proj_987654321" },
]

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatars/john.jpg"
}

const products = [
  {
    name: "Asset Manager",
    description: "Manage and organize your 3D assets, textures, and media files",
    icon: <Package className="h-5 w-5" />,
    status: "enabled" as const,
    href: "/project/proj_123456789/asset-manager"
  },
  {
    name: "Content Delivery",
    description: "Global CDN for fast asset delivery to your applications",
    icon: <Truck className="h-5 w-5" />,
    status: "enabled" as const,
    href: "/project/proj_123456789/content-delivery"
  },
  {
    name: "Spatial Comms",
    description: "Real-time communication for spatial experiences",
    icon: <MessageSquare className="h-5 w-5" />,
    status: "beta" as const,
    href: "/project/proj_123456789/spatial-comms"
  },
  {
    name: "Avatar",
    description: "Avatar creation and management system",
    icon: <User className="h-5 w-5" />,
    status: "enabled" as const,
    href: "/project/proj_123456789/avatar"
  },
  {
    name: "Configurator",
    description: "Visual configuration tools for 3D products",
    icon: <Palette className="h-5 w-5" />,
    status: "disabled" as const,
    href: "/project/proj_123456789/configurator"
  },
  {
    name: "Spatial UI",
    description: "UI components for spatial applications",
    icon: <Layout className="h-5 w-5" />,
    status: "beta" as const,
    href: "/project/proj_123456789/spatial-ui"
  },
  {
    name: "Hosting",
    description: "Deploy and host your spatial applications",
    icon: <Server className="h-5 w-5" />,
    status: "enabled" as const,
    href: "/project/proj_123456789/hosting"
  }
]

export default function ProjectOverview({ params }: { params: { projectId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <ConsoleHeader 
        currentProject={mockProject}
        projects={mockProjects}
        user={mockUser}
      />
      
      <div className="flex">
        <ConsoleSidebar 
          projectId={params.projectId}
          currentPath={`/project/${params.projectId}`}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Project Overview</h1>
                <p className="text-muted-foreground">
                  Monitor your project&apos;s performance and manage services
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Users"
                value="2,847"
                description="from last month"
                icon={Users}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="API Requests"
                value="45.2K"
                description="from last month"
                icon={Activity}
                trend={{ value: 8, isPositive: true }}
              />
              <StatsCard
                title="Monthly Cost"
                value="$127.50"
                description="from last month"
                icon={DollarSign}
                trend={{ value: -3, isPositive: false }}
              />
              <StatsCard
                title="Storage Used"
                value="12.4 GB"
                description="of 100 GB"
                icon={Database}
              />
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Products & Services</h2>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.name}
                    name={product.name}
                    description={product.description}
                    icon={product.icon}
                    status={product.status}
                    href={product.href}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest events and updates for your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Asset uploaded",
                      description: "model_v2.glb uploaded to Asset Manager",
                      time: "2 minutes ago",
                      type: "success"
                    },
                    {
                      action: "API key created",
                      description: "New API key generated for production",
                      time: "1 hour ago", 
                      type: "info"
                    },
                    {
                      action: "User invited",
                      description: "jane@example.com invited to project",
                      time: "3 hours ago",
                      type: "info"
                    },
                    {
                      action: "Deployment failed",
                      description: "Hosting deployment failed - check logs",
                      time: "6 hours ago",
                      type: "error"
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Badge 
                        variant={activity.type === "error" ? "destructive" : "secondary"}
                        className="w-2 h-2 p-0 rounded-full"
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
