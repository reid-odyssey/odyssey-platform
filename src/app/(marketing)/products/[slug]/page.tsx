import { products } from "@/lib/product-data"
import { ProductHero } from "@/components/ui/product-hero"
import { ProductCommunity } from "@/components/ui/product-community"
import { ProductSampleApps } from "@/components/ui/product-sample-apps"
import { notFound } from "next/navigation"
import { Metadata } from "next"

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return { title: "Product Not Found" }
  
  return {
    title: `${product.name} | Odyssey`,
    description: product.description
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-16 pb-16">
      <ProductHero 
        name={product.name}
        description={product.longDescription || product.description}
        icon={product.icon}
        status={product.status}
        getStartedHref="/signup"
      />
      
      <section className="container px-4">
        <h2 className="text-3xl font-bold tracking-tight mb-8">What you can build</h2>
        <ProductSampleApps productName={product.name} />
      </section>

      <section className="container px-4">
         <h2 className="text-3xl font-bold tracking-tight mb-8">Community & Support</h2>
         <ProductCommunity productName={product.name} />
      </section>
    </div>
  )
}
