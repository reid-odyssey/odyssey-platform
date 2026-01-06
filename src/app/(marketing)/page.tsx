"use client"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card"
import { ProductCommunity } from "@/components/ui/product-community"
import { products } from "@/lib/product-data"
import { ArrowRight } from "lucide-react"
import { ProductHero } from "@/components/ui/product-hero"

import Link from "next/link"

export default function MarketingHome() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-8">
            Now in Public Beta
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            The Complete Stack for <br className="hidden sm:inline" />
            the Spatial Web
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg sm:text-xl mb-10">
            Odyssey provides the infrastructure, tools, and services you need to build, deploy, and scale immersive 3D experiences on the web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/signup">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start Building Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
             </Link>
             <Link href="/docs">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  Read Documentation
                </Button>
             </Link>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[100px]" />
          <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[100px]" />
        </div>
      </section>

      {/* Products Sections */}
      <div className="flex flex-col">
        <div className="container mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Everything needed to build 3D apps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                From asset management to multi-player networking, Odyssey covers the entire lifecycle of spatial web development.
            </p>
        </div>

        {products.map((product, index) => (
          <section key={product.name} className="border-t">
            <ProductHero
              name={product.name}
              description={product.description}
              icon={product.icon}
              status={product.status}
              headingLevel="h2"
              getStartedHref={product.href}
              primaryActionLabel="Learn More"
              isReverse={index % 2 !== 0}
            />
          </section>
        ))}
      </div>

      {/* Community Section */}
      <section className="container mx-auto px-4">
         <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Built by developers, for developers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
                Join our growing community of creators building the next generation of the web.
            </p>
        </div>
        <ProductCommunity productName="Odyssey" />
      </section>
    </div>
  )
}
