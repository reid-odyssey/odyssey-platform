"use client"

import React, { use, useState } from "react"
import { ConsoleHeader } from "@/components/ui/console-header"
import { ConsoleSidebar } from "@/components/ui/console-sidebar"
import { ChatInterface } from "@/components/ui/chat-interface"
import { StatsCard } from "@/components/ui/stats-card"
import { ProductCard } from "@/components/ui/product-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  ExternalLink,
  Settings,
  FileText,
  Clock,
  Globe,
  Smartphone,
  Gamepad2
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

export default function ProjectOverview({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleChatToggle = (isOpen: boolean) => {
    setIsChatOpen(isOpen)
  }

  return (
    <div className={`min-h-screen bg-background transition-all duration-300 ease-out ${isChatOpen ? 'mr-[640px]' : ''}`}>
      <ConsoleHeader 
        currentProject={mockProject}
        projects={mockProjects}
        user={mockUser}
        isChatOpen={false}
      />
      
      <div className="max-w-[2000px] mx-auto">
        <div className="flex">
          <ConsoleSidebar 
            projectId={projectId}
            currentPath={`/project/${projectId}`}
            currentProject={mockProject}
            projects={mockProjects}
          />
          
          <main className="flex-1 p-6">
            <div className="space-y-6">
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

              {/* Active Project Template */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Project Template</CardTitle>
                      <CardDescription>
                        Current template configuration governing this project
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">Web Application Template</h3>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Active
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Full-stack web application with React frontend, Node.js backend, and PostgreSQL database
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>• Frontend: React 18</span>
                        <span>• Backend: Node.js + Express</span>
                        <span>• Database: PostgreSQL</span>
                        <span>• Hosting: Vercel</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-muted-foreground">Template Version</div>
                      <div className="text-lg font-semibold">v2.1.0</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            {/* App Hosting Section */}
            <Card>
              <CardHeader>
                <CardTitle>App Hosting</CardTitle>
                <CardDescription>
                  Deploy and manage your spatial applications with global edge delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Server className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Production Environment</h3>
                          <p className="text-sm text-muted-foreground">odyssey-console.app</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Server className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Staging Environment</h3>
                          <p className="text-sm text-muted-foreground">staging-odyssey-console.app</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Idle
                        </Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Active Products List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Products</CardTitle>
                    <CardDescription>
                      Currently enabled products and services for your project
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.filter(product => product.status === 'enabled').map((product, index) => (
                    <div key={product.name} className={`flex items-center justify-between p-3 hover:bg-muted/50 transition-colors ${index % 2 === 1 ? 'bg-muted/20' : ''}`}>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {product.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={product.href}>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
      
      {/* Chat Interface */}
      <div className={`fixed right-0 top-0 h-full transition-all duration-300 ease-out ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ChatInterface onToggle={handleChatToggle} />
      </div>
    </div>
  )
}
