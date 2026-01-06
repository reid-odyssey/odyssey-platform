"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ProductHeroProps {
  name: string
  description: string
  icon: React.ReactNode
  status: "enabled" | "disabled" | "beta"
  onGetStarted?: () => void
  getStartedHref?: string
  hasEverEngaged?: boolean
  isReverse?: boolean
  headingLevel?: "h1" | "h2" | "h3"
  primaryActionLabel?: string
}

export function ProductHero({ 
  name, 
  description, 
  icon, 
  status, 
  onGetStarted, 
  getStartedHref, 
  hasEverEngaged = false,
  isReverse = false,
  headingLevel = "h1",
  primaryActionLabel = "Get Started"
}: ProductHeroProps) {
  const statusColors = {
    enabled: "bg-green-100 text-green-800 border-green-200",
    disabled: "bg-gray-100 text-gray-800 border-gray-200", 
    beta: "bg-blue-100 text-blue-800 border-blue-200"
  }

  const Heading = headingLevel

  return (
    <div className="bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container mx-auto px-6 py-16">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isReverse ? 'lg:direction-rtl' : ''}`}>
          <div className={`space-y-6 ${isReverse ? 'lg:order-2' : ''}`}>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-primary/10">
                {icon}
              </div>
            </div>
            
            <div className="space-y-4">
              <Heading className="text-4xl sm:text-5xl font-bold tracking-tight">{name}</Heading>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {getStartedHref ? (
                <Link href={getStartedHref}>
                  <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                    {hasEverEngaged ? "Go to Console" : primaryActionLabel}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button size="lg" onClick={onGetStarted} className="text-lg px-8">
                  {hasEverEngaged ? "Go to Console" : primaryActionLabel}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className={`relative ${isReverse ? 'lg:order-1' : ''}`}>
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
