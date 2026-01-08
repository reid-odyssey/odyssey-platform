import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CreditCard, DollarSign, TrendingUp, Calendar, AlertCircle } from "lucide-react"

interface ProductUsageProps {
  productName: string
}

export function ProductUsage({ productName }: ProductUsageProps) {
  const currentUsage = {
    credits: 8750,
    totalCredits: 10000,
    cost: 127.50,
    billingPeriod: "December 2024"
  }

  const usageBreakdown = [
    { service: "API Calls", credits: 5200, cost: 78.00, percentage: 59 },
    { service: "Storage", credits: 2100, cost: 31.50, percentage: 24 },
    { service: "Bandwidth", credits: 1450, cost: 18.00, percentage: 17 }
  ]

  const recentTransactions = [
    { date: "Dec 15", description: "API usage", credits: -245, cost: -3.68 },
    { date: "Dec 14", description: "Storage overage", credits: -120, cost: -1.80 },
    { date: "Dec 13", description: "Credit purchase", credits: +1000, cost: 15.00 },
    { date: "Dec 12", description: "API usage", credits: -189, cost: -2.84 }
  ]

  return (
    <div className="space-y-6">
      {/* Current Usage Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Used</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUsage.credits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              of {currentUsage.totalCredits.toLocaleString()} total
            </p>
            <Progress 
              value={(currentUsage.credits / currentUsage.totalCredits) * 100} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Bill</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentUsage.cost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {currentUsage.billingPeriod}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Breakdown */}
      <Card className="border-0">
        <CardHeader>
          <CardTitle>Usage Breakdown</CardTitle>
          <CardDescription>
            Detailed breakdown of your {productName} usage by service type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usageBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.service}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.credits.toLocaleString()} credits • ${item.cost.toFixed(2)}
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing & Credits */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0">
          <CardHeader>
            <CardTitle>Credit Balance</CardTitle>
            <CardDescription>
              Manage your credit balance and purchase additional credits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-[#7A7A7C] rounded-lg">
              <div>
                <div className="font-medium">Available Credits</div>
                <div className="text-sm text-muted-foreground">
                  {(currentUsage.totalCredits - currentUsage.credits).toLocaleString()} remaining
                </div>
              </div>
              <Badge variant={currentUsage.credits > currentUsage.totalCredits * 0.8 ? "destructive" : "secondary"}>
                {Math.round(((currentUsage.totalCredits - currentUsage.credits) / currentUsage.totalCredits) * 100)}% left
              </Badge>
            </div>
            <Button className="w-full">
              Purchase Credits
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your recent credit usage and purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${transaction.credits > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.credits > 0 ? '+' : ''}{transaction.credits.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${Math.abs(transaction.cost).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Alerts */}
      <Card className="border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <span>Usage Alerts</span>
          </CardTitle>
          <CardDescription>
            Set up alerts to monitor your usage and spending
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-[#7A7A7C] rounded-lg">
              <div>
                <div className="font-medium">Credit Usage Alert</div>
                <div className="text-sm text-muted-foreground">
                  Alert when 80% of credits are used
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-[#7A7A7C] rounded-lg">
              <div>
                <div className="font-medium">Spending Limit</div>
                <div className="text-sm text-muted-foreground">
                  Alert when monthly spending exceeds $200
                </div>
              </div>
              <Badge variant="secondary">Inactive</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Manage Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
