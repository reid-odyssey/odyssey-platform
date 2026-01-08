"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  MousePointer2, 
  Move, 
  RotateCcw, 
  Scale, 
  Square, 
  Circle, 
  Triangle, 
  Type, 
  Image, 
  Box,
  Lightbulb,
  Camera,
  Play,
  Pause,
  SkipForward
} from "lucide-react"

interface StudioToolbarProps {
  selectedTool: string
  onToolChange: (tool: string) => void
}

const tools = [
  { id: "select", icon: MousePointer2, label: "Select" },
  { id: "move", icon: Move, label: "Move" },
  { id: "rotate", icon: RotateCcw, label: "Rotate" },
  { id: "scale", icon: Scale, label: "Scale" },
]

const shapes = [
  { id: "rectangle", icon: Square, label: "Rectangle" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "triangle", icon: Triangle, label: "Triangle" },
]

const elements = [
  { id: "text", icon: Type, label: "Text" },
  { id: "image", icon: Image, label: "Image" },
  { id: "model", icon: Box, label: "3D Model" },
  { id: "light", icon: Lightbulb, label: "Light" },
  { id: "camera", icon: Camera, label: "Camera" },
]

export function StudioToolbar({ selectedTool, onToolChange }: StudioToolbarProps) {
  return (
    <div className="h-12 bg-background border-b border-border flex items-center px-4 space-x-2">
      {/* Transform Tools */}
      <div className="flex items-center space-x-1">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={selectedTool === tool.id ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onToolChange(tool.id)}
            className="h-8 w-8 p-0"
            title={tool.label}
          >
            <tool.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Shape Tools */}
      <div className="flex items-center space-x-1">
        {shapes.map((shape) => (
          <Button
            key={shape.id}
            variant={selectedTool === shape.id ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onToolChange(shape.id)}
            className="h-8 w-8 p-0"
            title={shape.label}
          >
            <shape.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Element Tools */}
      <div className="flex items-center space-x-1">
        {elements.map((element) => (
          <Button
            key={element.id}
            variant={selectedTool === element.id ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onToolChange(element.id)}
            className="h-8 w-8 p-0"
            title={element.label}
          >
            <element.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Playback Controls */}
      <div className="flex items-center space-x-1 ml-auto">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Play className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Pause className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
