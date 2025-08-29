"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ConsoleHeader } from "@/components/ui/console-header"
import { ConsoleSidebar } from "@/components/ui/console-sidebar"
import { ProductHero } from "@/components/ui/product-hero"
import { ProductLearnMore } from "@/components/ui/product-learn-more"
import { ProductSampleApps } from "@/components/ui/product-sample-apps"
import { ProductCommunity } from "@/components/ui/product-community"
import { ProductApiKeys } from "@/components/ui/product-api-keys"
import { ProductSdkLinks } from "@/components/ui/product-sdk-links"
import { ProductMonitoring } from "@/components/ui/product-monitoring"
import { ProductAnalytics } from "@/components/ui/product-analytics"
import { ProductUsage } from "@/components/ui/product-usage"
import { ProductQuickStart } from "@/components/ui/product-quick-start"
import { ChatInterface } from "@/components/ui/chat-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface ProductPageTemplateProps {
  productName: string
  productDescription: string
  productIcon: React.ReactNode
  productStatus: "enabled" | "disabled" | "beta"
  projectId: string
  currentPath: string
  mockProject?: { id: string; name: string }
  mockProjects?: Array<{ id: string; name: string }>
  mockUser?: { name: string; email: string; avatar?: string }
  initialEngaged?: boolean
  showComingSoon?: boolean
  releaseDate?: string
}

export function ProductPageTemplate({
  productName,
  productDescription,
  productIcon,
  productStatus,
  projectId,
  currentPath,
  mockProject: propMockProject,
  mockProjects: propMockProjects,
  mockUser: propMockUser,
  initialEngaged = false,
  showComingSoon = false,
  releaseDate,
}: ProductPageTemplateProps) {
  const router = useRouter()
  const [isEngaged, setIsEngaged] = useState(initialEngaged)
  const [hasEverEngaged, setHasEverEngaged] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`odyssey-engaged-${productName}`)
      return stored === 'true' || initialEngaged
    }
    return initialEngaged
  })
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleGetStarted = () => {
    setIsEngaged(true)
    setHasEverEngaged(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`odyssey-engaged-${productName}`, 'true')
    }
  }

  const handleBackToOverview = () => {
    setIsEngaged(false)
  }

  const handleChatToggle = (isOpen: boolean) => {
    setIsChatOpen(isOpen)
  }

  // Use provided mock data or fallback to defaults
  const mockProject = propMockProject || { id: projectId, name: "Sample Project" }
  const mockProjects = propMockProjects || [mockProject]
  const mockUser = propMockUser || { name: "User", email: "user@example.com" }
  
  if (!isEngaged) {
    // Pre-engagement state: Firebase-style marketing page
    return (
      <div className={`min-h-screen bg-background transition-all duration-300 ease-out ${isChatOpen ? 'mr-[640px]' : ''} relative`}>
        <ConsoleHeader 
          currentProject={mockProject}
          projects={mockProjects}
          user={mockUser}
          isChatOpen={false}
        />
        <div className="max-w-[2000px] mx-auto">
          <div className="flex">
            <ConsoleSidebar 
              projectId={projectId}
              currentPath={currentPath}
              currentProject={mockProject}
              projects={mockProjects}
            />
            <main className="flex-1 px-6 py-12 relative overflow-hidden">
              <ProductHero 
                name={productName}
                description={productDescription}
                icon={productIcon}
                status={productStatus}
                onGetStarted={handleGetStarted}
                hasEverEngaged={hasEverEngaged}
              />
              <div className="mt-16 space-y-16">
                <ProductLearnMore productName={productName} />
                <ProductSampleApps productName={productName} />
                <ProductCommunity productName={productName} />
              </div>
              
              {/* Coming Soon Banner - Only covers this main content */}
              {showComingSoon && (
                <div className="absolute inset-0 bg-background/45 backdrop-blur-sm z-50 flex items-start justify-center pt-40">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      {productIcon}
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-foreground">{productName}</h2>
                    <p className="text-muted-foreground mb-6">Coming Soon</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      This product is scheduled for pre-release beta.
                    </p>
                    {releaseDate && (
                      <p className="text-sm font-medium text-primary">
                        Expected Pre-release: {releaseDate}
                      </p>
                    )}
                  </div>
                </div>
              )}
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

  // Post-engagement state: Console dashboard
  return (
    <div className={`min-h-screen bg-background transition-all duration-300 ease-out ${isChatOpen ? 'mr-[640px]' : ''} relative`}>
      <ConsoleHeader 
        currentProject={mockProject}
        projects={mockProjects}
        user={mockUser}
        isChatOpen={false}
      />
      
      <div className="max-w-[2000px] mx-auto">
        <div className="flex">
          <ConsoleSidebar 
            projectId={projectId}
            currentPath={currentPath}
            currentProject={mockProject}
            projects={mockProjects}
          />
          
          <main className="flex-1 p-6 relative overflow-hidden">
            {/* Page Header Section */}
            <div className="pb-8 mb-8">
              <div className="space-y-6">
                <Button variant="ghost" onClick={handleBackToOverview} className="self-start">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Overview
                </Button>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <div className="h-8 w-8">
                        {productIcon}
                      </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                      {productName}
                    </h1>
                  </div>
                  <p className="text-xl text-muted-foreground max-w-2xl">
                    {productDescription}
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Console</TabsTrigger>
                  <TabsTrigger value="monitoring">Analytics</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <ProductApiKeys productName={productName} />
                    <ProductSdkLinks productName={productName} />
                  </div>
                  
                  <ProductQuickStart productName={productName} />
                </TabsContent>

                <TabsContent value="monitoring" className="space-y-6">
                  <ProductMonitoring productName={productName} />
                </TabsContent>

                <TabsContent value="usage" className="space-y-6">
                  <ProductUsage productName={productName} />
                </TabsContent>
              </Tabs>
              
              {/* Coming Soon Banner - Only covers this main content */}
              {showComingSoon && (
                <div className="absolute inset-0 bg-background/45 backdrop-blur-sm z-50 flex items-start justify-center pt-40">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      {productIcon}
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-foreground">{productName}</h2>
                    <p className="text-muted-foreground mb-6">Coming Soon</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      This product is scheduled for pre-release beta.
                    </p>
                    {releaseDate && (
                      <p className="text-sm font-medium text-primary">
                        Expected Pre-release: {releaseDate}
                      </p>
                    )}
                  </div>
                </div>
              )}
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
