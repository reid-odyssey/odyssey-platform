import { ConsoleHeader } from "@/components/ui/console-header"
import { ConsoleSidebar } from "@/components/ui/console-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "@/components/ui/stats-card"
import { Input } from "@/components/ui/input"
import { 
  Truck, 
  Globe, 
  Activity,
  Settings,
  BarChart3,
  Clock,
  Zap,
  MapPin
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

const edgeLocations = [
  { location: "US West (Oregon)", status: "Healthy", latency: "12ms", requests: "45.2K" },
  { location: "US East (Virginia)", status: "Healthy", latency: "8ms", requests: "38.7K" },
  { location: "Europe (Frankfurt)", status: "Healthy", latency: "15ms", requests: "22.1K" },
  { location: "Asia Pacific (Tokyo)", status: "Healthy", latency: "18ms", requests: "19.8K" },
  { location: "Asia Pacific (Sydney)", status: "Warning", latency: "45ms", requests: "12.3K" }
]

export default function ContentDeliveryPage({ params }: { params: { projectId: string } }) {
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
          currentPath={`/project/${params.projectId}/content-delivery`}
        />
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  <Truck className="mr-3 h-8 w-8" />
                  Content Delivery
                </h1>
                <p className="text-muted-foreground">
                  Global CDN for fast asset delivery to your applications
                </p>
              </div>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Configure CDN
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Requests"
                value="2.1M"
                description="this month"
                icon={Activity}
                trend={{ value: 18, isPositive: true }}
              />
              <StatsCard
                title="Data Transfer"
                value="4.2 TB"
                description="this month"
                icon={Truck}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Cache Hit Rate"
                value="94.2%"
                description="last 24 hours"
                icon={Zap}
                trend={{ value: 2, isPositive: true }}
              />
              <StatsCard
                title="Avg Response Time"
                value="18ms"
                description="global average"
                icon={Clock}
                trend={{ value: -5, isPositive: true }}
              />
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="edge-locations">Edge Locations</TabsTrigger>
                <TabsTrigger value="cache">Cache Settings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>CDN Status</CardTitle>
                      <CardDescription>Current status of your CDN</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Status</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Edge Locations</span>
                        <span>5 active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>SSL Certificate</span>
                        <Badge className="bg-green-100 text-green-800">Valid</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Custom Domain</span>
                        <span className="text-sm text-muted-foreground">cdn.myapp.com</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>Key performance indicators</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Uptime (30 days)</span>
                        <span className="font-medium">99.98%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>P95 Response Time</span>
                        <span className="font-medium">45ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Error Rate</span>
                        <span className="font-medium">0.02%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Bandwidth Used</span>
                        <span className="font-medium">4.2 TB / 10 TB</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest CDN events and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          event: "Cache purged",
                          description: "All cached content cleared successfully",
                          time: "5 minutes ago",
                          type: "info"
                        },
                        {
                          event: "SSL certificate renewed",
                          description: "Certificate auto-renewed for cdn.myapp.com",
                          time: "2 hours ago",
                          type: "success"
                        },
                        {
                          event: "High latency detected",
                          description: "Asia Pacific (Sydney) showing elevated response times",
                          time: "6 hours ago",
                          type: "warning"
                        }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <Badge 
                            variant={activity.type === "warning" ? "destructive" : "secondary"}
                            className="w-2 h-2 p-0 rounded-full"
                          />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{activity.event}</p>
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
              </TabsContent>

              <TabsContent value="edge-locations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Edge Locations</CardTitle>
                    <CardDescription>
                      Monitor the status and performance of CDN edge locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Latency</TableHead>
                          <TableHead>Requests (24h)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {edgeLocations.map((location, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{location.location}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={location.status === "Healthy" ? "default" : "destructive"}
                                className={location.status === "Healthy" ? "bg-green-100 text-green-800" : ""}
                              >
                                {location.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{location.latency}</TableCell>
                            <TableCell>{location.requests}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cache" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Cache Configuration</CardTitle>
                    <CardDescription>
                      Configure caching behavior for optimal performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Default TTL</label>
                        <Input defaultValue="3600" />
                        <p className="text-xs text-muted-foreground">Cache time-to-live in seconds</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Max TTL</label>
                        <Input defaultValue="86400" />
                        <p className="text-xs text-muted-foreground">Maximum cache duration</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button>Save Changes</Button>
                      <Button variant="outline">Purge Cache</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Analytics</CardTitle>
                      <CardDescription>Request volume and patterns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Traffic analytics will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Geographic Distribution</CardTitle>
                      <CardDescription>Requests by region</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Globe className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Geographic data will appear here</p>
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
