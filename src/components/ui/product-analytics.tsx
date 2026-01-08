"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, Zap, Calendar, Download } from "lucide-react"

interface AnalyticsData {
  period: string
  requests: string
  users: string
  errors: string
  latency: string
}

interface ProductAnalyticsProps {
  productName: string
}

export function ProductAnalytics({ productName }: ProductAnalyticsProps) {
  const analyticsData: AnalyticsData[] = [
    { period: "Last 24h", requests: "12,456", users: "3,247", errors: "23", latency: "142ms" },
    { period: "Last 7d", requests: "89,234", users: "18,567", errors: "156", latency: "138ms" },
    { period: "Last 30d", requests: "342,891", users: "67,234", errors: "892", latency: "145ms" }
  ]

  const topEndpoints = [
    { endpoint: "/api/v1/spatial/render", calls: "45,234", avgTime: "89ms" },
    { endpoint: "/api/v1/assets/upload", calls: "23,567", avgTime: "234ms" },
    { endpoint: "/api/v1/user/authenticate", calls: "18,945", avgTime: "45ms" },
    { endpoint: "/api/v1/spatial/transform", calls: "12,678", avgTime: "156ms" }
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription>
                Usage analytics and insights for your {productName} integration
              </CardDescription>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="errors">Errors</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4">
                {analyticsData.map((data, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{data.period}</h3>
                      <Badge variant="outline">
                        <Calendar className="mr-1 h-3 w-3" />
                        {data.period}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">{data.requests}</div>
                        <div className="text-sm text-muted-foreground">Requests</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{data.users}</div>
                        <div className="text-sm text-muted-foreground">Users</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">{data.errors}</div>
                        <div className="text-sm text-muted-foreground">Errors</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{data.latency}</div>
                        <div className="text-sm text-muted-foreground">Avg Latency</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top API Endpoints</CardTitle>
                  <CardDescription>Most frequently used endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topEndpoints.map((endpoint, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex-1">
                          <code className="text-sm font-mono">{endpoint.endpoint}</code>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="text-center">
                            <div className="font-medium">{endpoint.calls}</div>
                            <div className="text-muted-foreground">calls</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{endpoint.avgTime}</div>
                            <div className="text-muted-foreground">avg time</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="errors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Error Analysis</CardTitle>
                  <CardDescription>Error patterns and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded flex items-center justify-center">
                    <p className="text-muted-foreground">Error analytics chart will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Analytics</CardTitle>
                  <CardDescription>User engagement and behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded">
                      <Users className="mx-auto h-8 w-8 mb-2 text-primary" />
                      <div className="text-2xl font-bold">67,234</div>
                      <div className="text-sm text-muted-foreground">Total Users</div>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <TrendingUp className="mx-auto h-8 w-8 mb-2 text-green-600" />
                      <div className="text-2xl font-bold">+12.5%</div>
                      <div className="text-sm text-muted-foreground">Growth Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
