"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { OdysseyLogo } from "@/components/ui/odyssey-logo"
import { ChatInterface } from "@/components/ui/chat-interface"
import { Github, Mail } from "lucide-react"

export default function LoginPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleChatToggle = (isOpen: boolean) => {
    setIsChatOpen(isOpen)
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 transition-all duration-300 ease-out ${isChatOpen ? 'mr-[640px]' : ''}`}>
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <OdysseyLogo size="lg" />
          <h1 className="text-2xl font-bold">Welcome to Odyssey Console</h1>
          <p className="text-muted-foreground text-center">
            Sign in to access your projects and services
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>

            <div className="text-center text-sm">
              <a href="#" className="text-primary hover:underline">
                Forgot your password?
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-primary hover:underline">
            Sign up
          </a>
        </div>
      </div>
      
      {/* Chat Interface */}
      <div className={`fixed right-0 top-0 h-full transition-all duration-300 ease-out ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ChatInterface onToggle={handleChatToggle} />
      </div>
    </div>
  )
}
