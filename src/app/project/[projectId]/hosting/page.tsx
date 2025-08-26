import { ConsoleHeader } from "@/components/ui/console-header"
import { ConsoleSidebar } from "@/components/ui/console-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "@/components/ui/stats-card"
import { Input } from "@/components/ui/input"
import { 
  Server, 
  Globe, 
  Activity,
  Plus,
  ExternalLink,
  GitBranch,
  Clock,
  Users,
  Zap
} from "lucide-react"

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

const deployments = [
  {
    id: "deploy_001",
    name: "Production App",
    url: "https://myapp.odyssey.app",
    status: "Live",
    lastDeploy: "2024-03-20 14:30",
    branch: "main",
    visits: "12.4K"
  },
  {
    id: "deploy_002",
    name: "Staging Environment", 
    url: "https://staging-myapp.odyssey.app",
    status: "Live",
    lastDeploy: "2024-03-20 16:45",
    branch: "develop",
    visits: "234"
  },
  {
    id: "deploy_003",
    name: "Feature Preview",
    url: "https://feature-xyz.odyssey.app",
    status: "Building",
    lastDeploy: "2024-03-20 17:12",
    branch: "feature/new-ui",
    visits: "45"
  }
]

export default function HostingPage({ params }: { params: { projectId: string } }) {
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
          currentPath={`/project/${params.projectId}/hosting`}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  <Server className="mr-3 h-8 w-8" />
                  Hosting
                </h1>
                <p className="text-muted-foreground">
                  Deploy and host your spatial applications with global edge delivery
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Deployment
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Active Sites"
                value="3"
                description="deployed applications"
                icon={Server}
              />
              <StatsCard
                title="Total Visits"
                value="45.2K"
                description="this month"
                icon={Users}
                trend={{ value: 28, isPositive: true }}
              />
              <StatsCard
                title="Uptime"
                value="99.9%"
                description="last 30 days"
                icon={Activity}
              />
              <StatsCard
                title="Build Time"
                value="2.3min"
                description="average"
                icon={Clock}
                trend={{ value: -15, isPositive: true }}
              />
            </div>

            <Tabs defaultValue="sites" className="space-y-4">
              <TabsList>
                <TabsTrigger value="sites">Sites</TabsTrigger>
                <TabsTrigger value="domains">Custom Domains</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="sites" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Deployed Sites</CardTitle>
                    <CardDescription>
                      Manage your hosted applications and deployments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deployments.map((deployment) => (
                        <div key={deployment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{deployment.name}</h3>
                              <Badge 
                                variant={deployment.status === "Live" ? "default" : "secondary"}
                                className={deployment.status === "Live" ? "bg-green-100 text-green-800" : ""}
                              >
                                {deployment.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Globe className="mr-1 h-3 w-3" />
                                {deployment.url}
                              </span>
                              <span className="flex items-center">
                                <GitBranch className="mr-1 h-3 w-3" />
                                {deployment.branch}
                              </span>
                              <span>{deployment.visits} visits</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Last deployed {deployment.lastDeploy}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={deployment.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit
                              </a>
                            </Button>
                            <Button variant="outline" size="sm">
                              Deploy
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Deploy</CardTitle>
                    <CardDescription>
                      Deploy a new site from your repository
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Repository URL</label>
                        <Input placeholder="https://github.com/username/repo" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Branch</label>
                        <Input defaultValue="main" />
                      </div>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Deploy Site
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="domains" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Domains</CardTitle>
                    <CardDescription>
                      Add custom domains to your hosted applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">myapp.com</div>
                          <div className="text-sm text-muted-foreground">
                            Points to: myapp.odyssey.app
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Custom Domain
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Hosting Settings</CardTitle>
                    <CardDescription>
                      Configure hosting behavior and performance settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Build Command</label>
                        <Input defaultValue="npm run build" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Output Directory</label>
                        <Input defaultValue="dist" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Node Version</label>
                        <Input defaultValue="18.x" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Environment</label>
                        <Input defaultValue="production" />
                      </div>
                    </div>
                    <Button>Save Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Overview</CardTitle>
                      <CardDescription>Visitor statistics and trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Activity className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Traffic analytics will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>Site speed and performance data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Performance data will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
