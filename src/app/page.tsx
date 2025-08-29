"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectCard } from "@/components/ui/project-card"
import { OdysseyLogo } from "@/components/ui/odyssey-logo"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ChatInterface } from "@/components/ui/chat-interface"
import { Plus } from "lucide-react"

// Mock data - in real app this would come from API
const mockProjects = [
  {
    name: "odyssey-console",
    id: "proj_123456789",
    description: "A spatial computing project using Odyssey services",
    status: "active" as const,
    createdAt: "March 15, 2024"
  },
  {
    name: "Demo Project", 
    id: "proj_987654321",
    description: "Testing and demonstration environment",
    status: "active" as const,
    createdAt: "March 10, 2024"
  },
  {
    name: "Legacy App",
    id: "proj_555666777", 
    description: "Previous version of the application",
    status: "inactive" as const,
    createdAt: "February 28, 2024"
  }
]

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleChatToggle = (isOpen: boolean) => {
    setIsChatOpen(isOpen)
  }

  return (
    <div className={`min-h-screen bg-background transition-all duration-300 ease-out ${isChatOpen ? 'mr-[640px]' : ''}`}>
      {/* Header */}
      <header className="border-b dark:border-transparent dark:bg-muted/45">
        <div className="flex h-16 items-center px-4">
          <OdysseyLogo size="sm" />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Your Projects</h1>
              <p className="text-muted-foreground">
                Select a project to access its services and manage resources
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockProjects.map((project) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                id={project.id}
                description={project.description}
                status={project.status}
                createdAt={project.createdAt}
                onSelect={() => window.location.href = `/project/${project.id}`}
              />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                New to Odyssey? Here are some helpful resources to get you started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="font-medium">📚 Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn about Odyssey services and APIs
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">🚀 Quick Start Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    Get up and running in minutes
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">💬 Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Join our developer community
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Chat Interface */}
      <div className={`fixed right-0 top-0 h-full transition-all duration-300 ease-out ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ChatInterface onToggle={handleChatToggle} />
      </div>
    </div>
  )
}
