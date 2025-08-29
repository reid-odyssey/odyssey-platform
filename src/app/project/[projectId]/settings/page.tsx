"use client"

import { ConsoleHeader } from "@/components/ui/console-header"
import { ConsoleSidebar } from "@/components/ui/console-sidebar"
import { ChatInterface } from "@/components/ui/chat-interface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

const mockProject = {
  name: "odyssey-console",
  id: "proj_123456789"
}

const mockProjects = [
  { name: "odyssey-console", id: "proj_123456789" },
  { name: "Demo Project", id: "proj_987654321" },
]

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatars/john.jpg"
}

export default function ProjectSettings({ params }: { params: { projectId: string } }) {
  const [showApiKey, setShowApiKey] = useState(false)
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
            currentPath={`/project/${params.projectId}/settings`}
            currentProject={mockProject}
            projects={mockProjects}
          />
          
          <main className="flex-1 p-6">
            <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Project Settings</h1>
              <p className="text-muted-foreground">
                Manage your project configuration and preferences
              </p>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                <TabsTrigger value="danger">Danger Zone</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                    <CardDescription>
                      Basic information about your project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-name">Project Name</Label>
                        <Input
                          id="project-name"
                          defaultValue="odyssey-console"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project-id">Project ID</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="project-id"
                            value="proj_123456789"
                            readOnly
                            className="bg-muted"
                          />
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your project..."
                          defaultValue="A spatial computing project using Odyssey services"
                        />
                      </div>
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Status</CardTitle>
                    <CardDescription>
                      Current status and resource usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Status</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Created</span>
                        <span className="text-sm text-muted-foreground">March 15, 2024</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Region</span>
                        <span className="text-sm text-muted-foreground">us-west-2</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="api-keys" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage API keys for accessing Odyssey services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Active Keys</h3>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Key
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { name: "Production Key", created: "2024-03-15", lastUsed: "2 hours ago" },
                        { name: "Development Key", created: "2024-03-10", lastUsed: "1 day ago" },
                      ].map((key, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{key.name}</span>
                              <Badge variant="outline">Active</Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Created {key.created}</span>
                              <span>Last used {key.lastUsed}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <code className="text-sm bg-muted px-2 py-1 rounded">
                                {showApiKey ? "odk_1234567890abcdef" : "odk_••••••••••••••••"}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowApiKey(!showApiKey)}
                              >
                                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="webhooks" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>
                      Configure webhooks to receive real-time notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No webhooks configured</p>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Webhook
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="danger" className="space-y-4">
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>
                      Irreversible and destructive actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Separator />
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Delete Project</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Once you delete a project, there is no going back. This will permanently delete 
                          all data, configurations, and resources associated with this project.
                        </p>
                        <Button variant="destructive">
                          Delete Project
                        </Button>
                      </div>
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
