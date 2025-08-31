"use client"

import { useState } from "react"
import { StudioHeader } from "@/components/ui/studio-header"
import { StudioSidebar } from "@/components/ui/studio-sidebar"
import { StudioCanvas } from "@/components/ui/studio-canvas"
import { StudioPropertiesPanel } from "@/components/ui/studio-properties-panel"
import { StudioToolbar } from "@/components/ui/studio-toolbar"
import { ChatInterface } from "@/components/ui/chat-interface"

export default function Studio() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState("select")
  const [selectedElement, setSelectedElement] = useState(null)

  const handleChatToggle = (isOpen: boolean) => {
    setIsChatOpen(isOpen)
  }

  const handleToolChange = (tool: string) => {
    setSelectedTool(tool)
  }

  const handleElementSelect = (element: any) => {
    setSelectedElement(element)
  }

  return (
    <div className={`h-screen bg-background flex flex-col transition-all duration-300 ease-out ${isChatOpen ? 'mr-[640px]' : ''}`}>
      {/* Header */}
      <StudioHeader onChatToggle={handleChatToggle} />
      
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - File Explorer & Assets */}
        <StudioSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <StudioToolbar 
            selectedTool={selectedTool}
            onToolChange={handleToolChange}
          />
          
          {/* Canvas Area */}
          <div className="flex-1 flex">
            <StudioCanvas 
              selectedTool={selectedTool}
              onElementSelect={handleElementSelect}
            />
            
            {/* Right Properties Panel */}
            <StudioPropertiesPanel 
              selectedElement={selectedElement}
            />
          </div>
        </div>
      </div>
      
      {/* Chat Interface */}
      <div className={`fixed right-0 top-0 h-full transition-all duration-300 ease-out ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ChatInterface onToggle={handleChatToggle} />
      </div>
    </div>
  )
}
