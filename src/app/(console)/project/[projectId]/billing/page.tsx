"use client"

import { ConsoleHeader } from "@/components/ui/console-header"
import { ConsoleSidebar } from "@/components/ui/console-sidebar"
import { ChatInterface } from "@/components/ui/chat-interface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { StatsCard } from "@/components/ui/stats-card"
import { useState, use } from "react"
import { 
  CreditCard, 
  DollarSign, 
  Download, 
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from "lucide-react"

const mockProject = {
  name: "agency-prod",
  id: "proj_123456789"
}

const mockProjects = [
  { name: "agency-prod", id: "proj_123456789" },
  { name: "Demo Project", id: "proj_987654321" },
]

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatars/john.jpg"
}

const usageData = [
  { service: "Asset Manager", usage: "12.4 GB", limit: "100 GB", cost: "$24.80", percentage: 12.4 },
  { service: "Content Delivery", usage: "2.1 TB", limit: "5 TB", cost: "$42.00", percentage: 42 },
  { service: "Spatial Comms", usage: "1,247 hours", limit: "2,000 hours", cost: "$31.18", percentage: 62.35 },
  { service: "Avatar", usage: "156 renders", limit: "500 renders", cost: "$15.60", percentage: 31.2 },
  { service: "Hosting", usage: "45.2K requests", limit: "100K requests", cost: "$13.92", percentage: 45.2 }
]

const invoiceHistory = [
  { id: "INV-2024-003", date: "2024-03-01", amount: "$127.50", status: "Paid" },
  { id: "INV-2024-002", date: "2024-02-01", amount: "$98.75", status: "Paid" },
  { id: "INV-2024-001", date: "2024-01-01", amount: "$156.20", status: "Paid" },
  { id: "INV-2023-012", date: "2023-12-01", amount: "$89.40", status: "Paid" }
]

export default function BillingPage({ params }: { params: Promise<{ projectId: string }> }) {
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
            projectId={params.projectId}
            currentPath={`/project/${params.projectId}/billing`}
            currentProject={mockProject}
            projects={mockProjects}
          />
          
          <main className="flex-1 p-6">
            <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Billing & Usage</h1>
                <p className="text-muted-foreground">
                  Monitor your usage and manage billing for your project
                </p>
              </div>
              <Button>
                <CreditCard className="mr-2 h-4 w-4" />
                Update Payment Method
              </Button>
            </div>

            {/* Current Bill Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Current Bill"
                value="$127.50"
                description="for March 2024"
                icon={DollarSign}
                trend={{ value: 15, isPositive: false }}
              />
              <StatsCard
                title="Last Invoice"
                value="$98.75"
                description="paid on Feb 28"
                icon={CheckCircle}
              />
              <StatsCard
                title="Next Bill Date"
                value="Apr 1"
                description="auto-pay enabled"
                icon={Calendar}
              />
              <StatsCard
                title="Spending Trend"
                value="+15%"
                description="vs last month"
                icon={TrendingUp}
              />
            </div>

            <Tabs defaultValue="usage" className="space-y-4">
              <TabsList>
                <TabsTrigger value="usage">Usage & Costs</TabsTrigger>
                <TabsTrigger value="invoices">Invoice History</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                <TabsTrigger value="alerts">Billing Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="usage" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Usage</CardTitle>
                    <CardDescription>
                      Your usage for the current billing period (March 1-31, 2024)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {usageData.map((item) => (
                        <div key={item.service} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{item.service}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.usage} of {item.limit}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{item.cost}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.percentage.toFixed(1)}% used
                              </div>
                            </div>
                          </div>
                          <Progress value={item.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                    <CardDescription>
                      Detailed breakdown of your current charges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Base subscription</span>
                        <span>$25.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Usage charges</span>
                        <span>$102.50</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Tax (8.5%)</span>
                        <span>$10.84</span>
                      </div>
                      <div className="border-t dark:border-transparent dark:bg-muted/45 pt-4">
                        <div className="flex justify-between items-center font-semibold text-lg">
                          <span>Total</span>
                          <span>$138.34</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="invoices" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Invoice History</CardTitle>
                    <CardDescription>
                      Download and view your past invoices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoiceHistory.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                              {invoice.id}
                            </TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.amount}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">
                                {invoice.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment methods and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border dark:border-transparent dark:bg-muted/45 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <div className="font-medium">•••• •••• •••• 4242</div>
                            <div className="text-sm text-muted-foreground">
                              Expires 12/2027
                            </div>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                      <Button variant="outline" className="w-full">
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Alerts</CardTitle>
                    <CardDescription>
                      Set up alerts to monitor your spending
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border dark:border-transparent dark:bg-muted/45 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <AlertCircle className="h-5 w-5 text-orange-500" />
                          <div>
                            <div className="font-medium">Monthly spend alert</div>
                            <div className="text-sm text-muted-foreground">
                              Alert when monthly bill exceeds $150
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <Button variant="outline" className="w-full">
                        Add New Alert
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
