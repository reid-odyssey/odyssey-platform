"use client"

import { useState } from "react"
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
  mockProject: any
  mockProjects: any[]
  mockUser: any
}

export function ProductPageTemplate({
  productName,
  productDescription,
  productIcon,
  productStatus,
  projectId,
  currentPath,
  mockProject,
  mockProjects,
  mockUser
}: ProductPageTemplateProps) {
  const [isEngaged, setIsEngaged] = useState(false)

  const handleGetStarted = () => {
    setIsEngaged(true)
  }

  const handleBackToOverview = () => {
    setIsEngaged(false)
  }

  if (!isEngaged) {
    // Pre-engagement state: Firebase-style marketing page
    return (
      <div className="min-h-screen bg-background">
        <ConsoleHeader 
          currentProject={mockProject}
          projects={mockProjects}
          user={mockUser}
        />
        
        <div className="max-w-[2000px] mx-auto">
          <div className="flex">
            <ConsoleSidebar 
              projectId={projectId}
              currentPath={currentPath}
              currentProject={mockProject}
              projects={mockProjects}
            />
            
            <main className="flex-1">
              <ProductHero
                name={productName}
                description={productDescription}
                icon={productIcon}
                status={productStatus}
                onGetStarted={handleGetStarted}
              />
              
              <ProductLearnMore productName={productName} />
              
              <ProductSampleApps productName={productName} />
              
              <ProductCommunity productName={productName} />
            </main>
          </div>
        </div>
      </div>
    )
  }

  // Post-engagement state: Console dashboard
  return (
    <div className="min-h-screen bg-background">
      <ConsoleHeader 
        currentProject={mockProject}
        projects={mockProjects}
        user={mockUser}
      />
      
      <div className="max-w-[2000px] mx-auto">
        <div className="flex">
          <ConsoleSidebar 
            projectId={projectId}
            currentPath={currentPath}
            currentProject={mockProject}
            projects={mockProjects}
          />
          
          <main className="flex-1 p-6">
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
          </main>
        </div>
      </div>
    </div>
  )
}
