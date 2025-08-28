"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react"

interface LearnMoreProps {
  productName: string
}

export function ProductLearnMore({ productName }: LearnMoreProps) {
  const resources = [
    {
      title: "Documentation",
      description: `Complete ${productName} API reference and guides`,
      icon: <BookOpen className="h-6 w-6" />,
      href: "#"
    },
    {
      title: "Video Tutorials", 
      description: "Step-by-step video guides and walkthroughs",
      icon: <Video className="h-6 w-6" />,
      href: "#"
    },
    {
      title: "Best Practices",
      description: "Learn recommended patterns and optimization tips",
      icon: <FileText className="h-6 w-6" />,
      href: "#"
    }
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Learn More</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to master {productName}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {resource.icon}
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {resource.description}
                </CardDescription>
                <Button variant="outline" className="w-full">
                  Explore
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
