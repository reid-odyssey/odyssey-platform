"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, AlertTriangle, CheckCircle, Clock, TrendingUp, Zap } from "lucide-react"

interface MonitoringMetric {
  name: string
  value: string
  change: string
  status: "healthy" | "warning" | "error"
  icon: React.ReactNode
}

interface ProductMonitoringProps {
  productName: string
}

export function ProductMonitoring({ productName }: ProductMonitoringProps) {
  const metrics: MonitoringMetric[] = [
    {
      name: "API Response Time",
      value: "142ms",
      change: "-5ms",
      status: "healthy",
      icon: <Zap className="h-4 w-4" />
    },
    {
      name: "Success Rate",
      value: "99.8%",
      change: "+0.1%",
      status: "healthy", 
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      name: "Active Connections",
      value: "1,247",
      change: "+23",
      status: "healthy",
      icon: <Activity className="h-4 w-4" />
    },
    {
      name: "Error Rate",
      value: "0.2%",
      change: "-0.1%",
      status: "warning",
      icon: <AlertTriangle className="h-4 w-4" />
    }
  ]

  const recentEvents = [
    {
      time: "2 min ago",
      message: "API response time improved by 15%",
      type: "info"
    },
    {
      time: "1 hour ago", 
      message: "High traffic detected - auto-scaling triggered",
      type: "warning"
    },
    {
      time: "3 hours ago",
      message: "Deployment completed successfully",
      type: "success"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-600 bg-green-100"
      case "warning": return "text-yellow-600 bg-yellow-100"
      case "error": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Monitoring</CardTitle>
          <CardDescription>
            Real-time performance metrics for your {productName} integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-1 rounded ${getStatusColor(metric.status)}`}>
                    {metric.icon}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {metric.change}
                  </Badge>
                </div>
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.name}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 rounded border">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  event.type === "success" ? "bg-green-500" :
                  event.type === "warning" ? "bg-yellow-500" : "bg-blue-500"
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{event.message}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground">Performance chart will appear here</p>
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <Button variant="outline" size="sm">View Details</Button>
              <Button variant="outline" size="sm">Set Alerts</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
