"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Grid3x3, 
  Eye, 
  EyeOff,
  RotateCcw,
  Move3d
} from "lucide-react"

interface StudioCanvasProps {
  selectedTool: string
  onElementSelect: (element: any) => void
}

export function StudioCanvas({ selectedTool, onElementSelect }: StudioCanvasProps) {
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(true)
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d")
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 500))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25))
  const handleFitToScreen = () => setZoom(100)

  return (
    <div className="flex-1 bg-muted/10 relative overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <div className="bg-background border border-border rounded-lg p-2 shadow-sm">
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFitToScreen}
              className="h-8 w-8 p-0"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-2 shadow-sm">
          <div className="flex flex-col space-y-1">
            <Button
              variant={showGrid ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
              className="h-8 w-8 p-0"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "3d" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode(viewMode === "2d" ? "3d" : "2d")}
              className="h-8 w-8 p-0"
            >
              <Move3d className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-background border border-border rounded px-3 py-1 text-sm">
          {zoom}%
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="w-full h-full relative cursor-crosshair"
        style={{ 
          backgroundImage: showGrid ? 
            'radial-gradient(circle, #e5e7eb 1px, transparent 1px)' : 'none',
          backgroundSize: showGrid ? '20px 20px' : 'auto',
        }}
      >
        {/* 3D Viewport */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center bg-background/50">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Move3d className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">3D Viewport</h3>
                <p className="text-sm text-muted-foreground">
                  Drop 3D models, lights, and cameras here
                </p>
              </div>
              <Button variant="outline" size="sm">
                Add Object
              </Button>
            </div>
          </div>
        </div>

        {/* Sample Elements */}
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 border-2 border-blue-500 rounded cursor-pointer hover:bg-blue-500/30 transition-colors"
          onClick={() => onElementSelect({ type: "cube", id: "cube-1" })}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs font-medium text-blue-700">Cube</span>
          </div>
        </div>

        <div 
          className="absolute top-40 left-60 w-24 h-24 bg-green-500/20 border-2 border-green-500 rounded-full cursor-pointer hover:bg-green-500/30 transition-colors"
          onClick={() => onElementSelect({ type: "sphere", id: "sphere-1" })}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs font-medium text-green-700">Sphere</span>
          </div>
        </div>

        <div 
          className="absolute bottom-32 right-32 w-40 h-20 bg-purple-500/20 border-2 border-purple-500 cursor-pointer hover:bg-purple-500/30 transition-colors flex items-center justify-center"
          onClick={() => onElementSelect({ type: "text", id: "text-1" })}
        >
          <span className="text-sm font-medium text-purple-700">Sample Text</span>
        </div>
      </div>

      {/* Tool Cursor Indicator */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-background border border-border rounded px-3 py-1 text-sm flex items-center space-x-2">
          <span className="text-muted-foreground">Tool:</span>
          <span className="font-medium capitalize">{selectedTool}</span>
        </div>
      </div>
    </div>
  )
}
