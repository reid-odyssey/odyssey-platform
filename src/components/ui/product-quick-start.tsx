import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, ExternalLink, Play, Code, BookOpen, Zap } from "lucide-react"

interface ProductQuickStartProps {
  productName: string
}

export function ProductQuickStart({ productName }: ProductQuickStartProps) {
  const steps = [
    {
      title: "Get your API key",
      description: "Generate an API key to authenticate your requests",
      code: "# Your API key\nAPI_KEY=sk-proj-...",
      action: "Generate API Key"
    },
    {
      title: "Install the SDK",
      description: "Install our official SDK for your preferred language",
      code: "npm install @odyssey/asset-manager\n# or\npip install odyssey-asset-manager",
      action: "View SDKs"
    },
    {
      title: "Make your first request",
      description: "Send your first API request to get started",
      code: `import { OdysseyClient } from '@odyssey/asset-manager';

const client = new OdysseyClient({
  apiKey: process.env.API_KEY
});

const response = await client.assets.list();
console.log(response);`,
      action: "Try in Playground"
    }
  ]

  const examples = [
    {
      title: "Upload Asset",
      description: "Upload a 3D model or texture",
      language: "JavaScript",
      time: "2 min"
    },
    {
      title: "Asset Processing",
      description: "Process and optimize assets",
      language: "Python", 
      time: "5 min"
    },
    {
      title: "Batch Operations",
      description: "Handle multiple assets efficiently",
      language: "cURL",
      time: "3 min"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quick Start</h2>
          <p className="text-muted-foreground">
            Get up and running with {productName} in minutes
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-1">
          <Zap className="h-3 w-3" />
          <span>5 min setup</span>
        </Badge>
      </div>

      {/* Quick Start Steps */}
      <div className="grid gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {step.action}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Code</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap text-xs">{step.code}</pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Example Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Example Projects</h3>
            <p className="text-sm text-muted-foreground">
              Ready-to-run examples to help you get started
            </p>
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            View All Examples
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs border-0">
                    {example.language}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{example.time}</span>
                </div>
                <CardTitle className="text-base">{example.title}</CardTitle>
                <CardDescription className="text-sm">{example.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Play className="mr-2 h-3 w-3" />
                  Run Example
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Resources */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Documentation</span>
            </CardTitle>
            <CardDescription>
              Comprehensive guides and API reference
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              API Reference
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Integration Guide
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Best Practices
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>Developer Tools</span>
            </CardTitle>
            <CardDescription>
              Tools to help you build and debug
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              API Playground
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Postman Collection
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              CLI Tools
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
