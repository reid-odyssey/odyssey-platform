"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Settings, 
  Palette, 
  Move, 
  RotateCcw, 
  Scale, 
  Eye,
  Layers,
  Box,
  ChevronDown,
  ChevronRight
} from "lucide-react"

interface StudioPropertiesPanelProps {
  selectedElement: any
}

export function StudioPropertiesPanel({ selectedElement }: StudioPropertiesPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["transform", "appearance", "behavior"])
  )

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  if (!selectedElement) {
    return (
      <div className="w-80 bg-muted/20 border-l border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="font-medium text-sm">Properties</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Select an element to view properties
            </p>
          </div>
        </div>
      </div>
    )
  }

  const PropertySection = ({ 
    id, 
    title, 
    icon: Icon, 
    children 
  }: { 
    id: string
    title: string
    icon: any
    children: React.ReactNode 
  }) => (
    <Card className="border-0 shadow-none">
      <CardHeader 
        className="p-3 cursor-pointer hover:bg-muted/50"
        onClick={() => toggleSection(id)}
      >
        <CardTitle className="text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4" />
            <span>{title}</span>
          </div>
          {expandedSections.has(id) ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CardTitle>
      </CardHeader>
      {expandedSections.has(id) && (
        <CardContent className="p-3 pt-0 space-y-3">
          {children}
        </CardContent>
      )}
    </Card>
  )

  return (
    <div className="w-80 bg-muted/20 border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Box className="h-4 w-4 text-primary" />
          <div>
            <h3 className="font-medium text-sm">Properties</h3>
            <p className="text-xs text-muted-foreground capitalize">
              {selectedElement.type} - {selectedElement.id}
            </p>
          </div>
        </div>
      </div>

      {/* Properties */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {/* Transform Properties */}
          <PropertySection id="transform" title="Transform" icon={Move}>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs">X</Label>
                <Input className="h-7 text-xs" defaultValue="0" />
              </div>
              <div>
                <Label className="text-xs">Y</Label>
                <Input className="h-7 text-xs" defaultValue="0" />
              </div>
              <div>
                <Label className="text-xs">Z</Label>
                <Input className="h-7 text-xs" defaultValue="0" />
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs">Rot X</Label>
                <Input className="h-7 text-xs" defaultValue="0°" />
              </div>
              <div>
                <Label className="text-xs">Rot Y</Label>
                <Input className="h-7 text-xs" defaultValue="0°" />
              </div>
              <div>
                <Label className="text-xs">Rot Z</Label>
                <Input className="h-7 text-xs" defaultValue="0°" />
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="text-xs">Scale X</Label>
                <Input className="h-7 text-xs" defaultValue="1" />
              </div>
              <div>
                <Label className="text-xs">Scale Y</Label>
                <Input className="h-7 text-xs" defaultValue="1" />
              </div>
              <div>
                <Label className="text-xs">Scale Z</Label>
                <Input className="h-7 text-xs" defaultValue="1" />
              </div>
            </div>
          </PropertySection>

          {/* Appearance Properties */}
          <PropertySection id="appearance" title="Appearance" icon={Palette}>
            <div>
              <Label className="text-xs">Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-8 h-7 bg-blue-500 rounded border cursor-pointer"></div>
                <Input className="h-7 text-xs flex-1" defaultValue="#3B82F6" />
              </div>
            </div>
            
            <div>
              <Label className="text-xs">Opacity</Label>
              <div className="mt-1">
                <Slider defaultValue={[100]} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-xs">Material</Label>
              <Button variant="outline" className="w-full h-7 text-xs justify-start">
                Default Material
              </Button>
            </div>
          </PropertySection>

          {/* Behavior Properties */}
          <PropertySection id="behavior" title="Behavior" icon={Settings}>
            <div>
              <Label className="text-xs">Interaction</Label>
              <Button variant="outline" className="w-full h-7 text-xs justify-start">
                None
              </Button>
            </div>
            
            <div>
              <Label className="text-xs">Physics</Label>
              <Button variant="outline" className="w-full h-7 text-xs justify-start">
                Static
              </Button>
            </div>
            
            <div>
              <Label className="text-xs">Animation</Label>
              <Button variant="outline" className="w-full h-7 text-xs justify-start">
                Add Animation
              </Button>
            </div>
          </PropertySection>

          {/* Layer Properties */}
          <PropertySection id="layer" title="Layer" icon={Layers}>
            <div>
              <Label className="text-xs">Layer</Label>
              <Button variant="outline" className="w-full h-7 text-xs justify-start">
                Default Layer
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-7 flex-1">
                <Eye className="h-3 w-3 mr-1" />
                Visible
              </Button>
              <Button variant="outline" size="sm" className="h-7 flex-1">
                Lock
              </Button>
            </div>
          </PropertySection>
        </div>
      </ScrollArea>
    </div>
  )
}
