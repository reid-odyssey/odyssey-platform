"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, ExternalLink } from "lucide-react"

interface ProductHeroProps {
  name: string
  description: string
  icon: React.ReactNode
  status: "enabled" | "disabled" | "beta"
  onGetStarted: () => void
  hasEverEngaged?: boolean
}

export function ProductHero({ name, description, icon, status, onGetStarted, hasEverEngaged = false }: ProductHeroProps) {
  const statusColors = {
    enabled: "bg-green-100 text-green-800 border-green-200",
    disabled: "bg-gray-100 text-gray-800 border-gray-200", 
    beta: "bg-blue-100 text-blue-800 border-blue-200"
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-primary/10">
                {icon}
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight">{name}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onGetStarted} className="text-lg px-8">
                {hasEverEngaged ? "Open Console" : "Get Started"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border-2 border-dashed border-primary/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-6xl opacity-20">{icon}</div>
                <p className="text-muted-foreground">Product Demo Video</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
