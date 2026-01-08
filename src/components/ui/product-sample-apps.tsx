"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Download } from "lucide-react"

interface SampleApp {
  title: string
  description: string
  tech: string[]
  githubUrl: string
  demoUrl?: string
}

interface ProductSampleAppsProps {
  productName: string
}

export function ProductSampleApps({ productName }: ProductSampleAppsProps) {
  const sampleApps: SampleApp[] = [
    {
      title: "Basic Integration",
      description: `Simple ${productName} implementation with core features`,
      tech: ["React", "TypeScript", "Next.js"],
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      title: "Advanced Example",
      description: `Production-ready ${productName} app with advanced features`,
      tech: ["React", "Node.js", "WebGL"],
      githubUrl: "#",
      demoUrl: "#"
    },
    {
      title: "Mobile App",
      description: `Mobile implementation using ${productName} SDK`,
      tech: ["React Native", "iOS", "Android"],
      githubUrl: "#"
    }
  ]

  return (
    <section className="py-16">
      <div className="px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Sample Applications</h2>
          <p className="text-xl text-muted-foreground">
            Get started quickly with these example implementations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sampleApps.map((app, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{app.title}</CardTitle>
                <CardDescription className="text-base">
                  {app.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {app.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  {app.demoUrl && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download Starter Kit
          </Button>
        </div>
      </div>
    </section>
  )
}
