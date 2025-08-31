"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Save, 
  Undo, 
  Redo, 
  Play, 
  Share, 
  Settings,
  User,
  ChevronDown,
  Search
} from "lucide-react"
import { OdysseyLogo } from "@/components/ui/odyssey-logo"

interface StudioHeaderProps {
  onChatToggle: (isOpen: boolean) => void
}

export function StudioHeader({ onChatToggle }: StudioHeaderProps) {
  return (
    <header className="h-14 bg-background border-b border-border flex items-center justify-between px-4">
      {/* Left Section - Logo & Project */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <OdysseyLogo className="h-6 w-6" />
          <span className="font-semibold text-lg">Odyssey Studio</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Project:</span>
          <Button variant="ghost" size="sm" className="h-8">
            <span>Spatial Experience</span>
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
        
        <Badge variant="secondary" className="text-xs">
          Auto-saved
        </Badge>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search assets, components, or ask Cascade..."
            className="pl-10 bg-muted/50"
          />
        </div>
      </div>

      {/* Right Section - Actions & User */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Redo className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <Button variant="ghost" size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="default" size="sm">
          <Play className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button variant="outline" size="sm">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
        
        <div className="w-px h-6 bg-border mx-2" />
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onChatToggle(true)}
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="rounded-full p-2">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
