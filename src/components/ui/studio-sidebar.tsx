"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Folder, 
  FolderOpen, 
  File, 
  Image, 
  Box, 
  Layers, 
  Search,
  Plus,
  MoreHorizontal,
  ChevronRight,
  ChevronDown
} from "lucide-react"

interface FileItem {
  name: string
  type: "folder" | "file" | "asset"
  children?: FileItem[]
  isOpen?: boolean
}

const mockFiles: FileItem[] = [
  {
    name: "Scenes",
    type: "folder",
    isOpen: true,
    children: [
      { name: "Main Scene.scene", type: "file" },
      { name: "Loading Screen.scene", type: "file" },
      { name: "Menu.scene", type: "file" }
    ]
  },
  {
    name: "Assets",
    type: "folder",
    isOpen: true,
    children: [
      { name: "Models", type: "folder", children: [
        { name: "character.fbx", type: "asset" },
        { name: "environment.obj", type: "asset" }
      ]},
      { name: "Textures", type: "folder", children: [
        { name: "wood.jpg", type: "asset" },
        { name: "metal.png", type: "asset" }
      ]},
      { name: "Audio", type: "folder", children: [
        { name: "ambient.wav", type: "asset" },
        { name: "click.mp3", type: "asset" }
      ]}
    ]
  },
  {
    name: "Components",
    type: "folder",
    isOpen: false,
    children: [
      { name: "UI Components", type: "folder" },
      { name: "Interaction Scripts", type: "folder" }
    ]
  }
]

export function StudioSidebar() {
  const [activeTab, setActiveTab] = useState<"files" | "assets" | "layers">("files")
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["Scenes", "Assets"]))

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName)
    } else {
      newExpanded.add(folderName)
    }
    setExpandedFolders(newExpanded)
  }

  const renderFileTree = (items: FileItem[], depth = 0) => {
    return items.map((item, index) => (
      <div key={`${item.name}-${index}`} className="select-none">
        <div 
          className="flex items-center py-1 px-2 hover:bg-muted/50 cursor-pointer rounded-sm"
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => item.type === "folder" && toggleFolder(item.name)}
        >
          {item.type === "folder" && (
            <>
              {expandedFolders.has(item.name) ? (
                <ChevronDown className="h-3 w-3 mr-1" />
              ) : (
                <ChevronRight className="h-3 w-3 mr-1" />
              )}
              {expandedFolders.has(item.name) ? (
                <FolderOpen className="h-4 w-4 mr-2 text-blue-500" />
              ) : (
                <Folder className="h-4 w-4 mr-2 text-blue-500" />
              )}
            </>
          )}
          {item.type === "file" && (
            <File className="h-4 w-4 mr-2 ml-4 text-muted-foreground" />
          )}
          {item.type === "asset" && (
            <Image className="h-4 w-4 mr-2 ml-4 text-green-500" />
          )}
          <span className="text-sm truncate">{item.name}</span>
        </div>
        {item.type === "folder" && expandedFolders.has(item.name) && item.children && (
          <div>
            {renderFileTree(item.children, depth + 1)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <div className="w-80 bg-muted/20 border-r border-border flex flex-col">
      {/* Tab Headers */}
      <div className="flex border-b border-border">
        <Button
          variant={activeTab === "files" ? "secondary" : "ghost"}
          size="sm"
          className="flex-1 rounded-none"
          onClick={() => setActiveTab("files")}
        >
          <Folder className="h-4 w-4 mr-2" />
          Files
        </Button>
        <Button
          variant={activeTab === "assets" ? "secondary" : "ghost"}
          size="sm"
          className="flex-1 rounded-none"
          onClick={() => setActiveTab("assets")}
        >
          <Box className="h-4 w-4 mr-2" />
          Assets
        </Button>
        <Button
          variant={activeTab === "layers" ? "secondary" : "ghost"}
          size="sm"
          className="flex-1 rounded-none"
          onClick={() => setActiveTab("layers")}
        >
          <Layers className="h-4 w-4 mr-2" />
          Layers
        </Button>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search files..."
            className="pl-10 h-8 bg-background"
          />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {activeTab === "files" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Project Files
                </span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              {renderFileTree(mockFiles)}
            </div>
          )}

          {activeTab === "assets" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Asset Library
                </span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-muted rounded border hover:border-primary cursor-pointer">
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "layers" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Scene Layers
                </span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              {["Background", "Environment", "Characters", "UI Elements", "Effects"].map((layer) => (
                <div key={layer} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                  <div className="flex items-center">
                    <Layers className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{layer}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
