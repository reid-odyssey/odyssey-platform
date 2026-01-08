import { 
  Package, 
  Truck, 
  MessageSquare, 
  User, 
  Users, 
  Palette, 
  Layout, 
  Anchor, 
  Zap, 
  Server
} from "lucide-react"

export type ProductStatus = "enabled" | "disabled" | "beta"

export interface ProductData {
  slug: string
  name: string
  description: string
  longDescription?: string
  icon: React.ReactNode
  status: ProductStatus
  href: string
}

export const products: ProductData[] = [
  {
    slug: "asset-manager",
    name: "Asset Manager",
    description: "Manage and organize your 3D assets, textures, and media files",
    longDescription: "The Odyssey Asset Manager is a centralized repository for all your 3D content. It supports automatic format conversion, optimization pipelines, and version control for GLB, USDZ, FBX, and texture files. Streamline your workflow with automated LOD generation and texture compression.",
    icon: <Package className="h-5 w-5" />,
    status: "enabled",
    href: "/products/asset-manager"
  },
  {
    slug: "content-delivery",
    name: "Content Delivery",
    description: "Global CDN for fast asset delivery to your applications",
    longDescription: "Deliver your 3D experiences with low latency anywhere in the world. Our specialized Content Delivery Network is optimized for large 3D assets, offering intelligent caching, edge compression, and resumable downloads to ensure your users get into the experience instantly.",
    icon: <Truck className="h-5 w-5" />,
    status: "enabled",
    href: "/products/content-delivery"
  },
  {
    slug: "spatial-comms",
    name: "Spatial Comms",
    description: "Real-time communication for spatial experiences",
    longDescription: "Add voice, video, and text chat to your 3D worlds with a few lines of code. Spatial Comms handles proximity-based audio, 3D positional sound, and room management so you can focus on building social interactions that feel natural and immersive.",
    icon: <MessageSquare className="h-5 w-5" />,
    status: "beta",
    href: "/products/spatial-comms"
  },
  {
    slug: "avatar",
    name: "Avatar",
    description: "Avatar creation and management system",
    longDescription: "Empower your users to express themselves with a complete avatar system. Support for Ready Player Me and custom avatar standards allows for cross-platform identity. Includes wardrobe management, animation retargeting, and customizable traits.",
    icon: <User className="h-5 w-5" />,
    status: "enabled",
    href: "/products/avatar"
  },
  {
    slug: "multi-player",
    name: "Multi-player",
    description: "Scalable multiplayer infrastructure",
    longDescription: "Build synchronized shared experiences without managing servers. Our multiplayer infrastructure handles state synchronization, physics replication, and room logic. Scale from small meeting rooms to massive events with thousands of concurrent users.",
    icon: <Users className="h-5 w-5" />,
    status: "beta",
    href: "/products/multi-player"
  },
  {
    slug: "configurator",
    name: "Configurator",
    description: "Product configuration engine",
    longDescription: "Create complex product configurators with logic-based rules. Define variant relationships, exclusion rules, and pricing logic to build 3D retail experiences. Integrates seamlessly with your existing e-commerce backend.",
    icon: <Palette className="h-5 w-5" />,
    status: "enabled",
    href: "/products/configurator"
  },
  {
    slug: "spatial-ui",
    name: "Spatial UI",
    description: "3D user interface components",
    longDescription: "A library of optimized 3D user interface components designed for spatial computing. Includes 3D panels, buttons, inputs, and layout systems that work across VR, AR, and desktop/mobile screens.",
    icon: <Layout className="h-5 w-5" />,
    status: "enabled",
    href: "/products/spatial-ui"
  },
  {
    slug: "spatial-anchor",
    name: "Spatial Anchor",
    description: "Persistent world anchors",
    longDescription: "Anchor digital content to the physical world with centimeter-level precision. Create persistent AR experiences that stay where you leave them, shared across multiple users and sessions in the same physical location.",
    icon: <Anchor className="h-5 w-5" />,
    status: "beta",
    href: "/products/spatial-anchor"
  },
  {
    slug: "real-time-engine",
    name: "Real Time Engine",
    description: "Cloud-based rendering engine",
    longDescription: "Stream high-fidelity interactive 3D content to any device. Our Pixel Streaming solution handles complex physics and ray-traced rendering on the server, delivering a video stream to the client for photorealistic experiences on low-end hardware.",
    icon: <Zap className="h-5 w-5" />,
    status: "beta",
    href: "/products/real-time-engine"
  },
  {
    slug: "hosting",
    name: "Hosting",
    description: "Deploy your spatial web experiences",
    longDescription: "The easiest way to deploy Unity, Unreal, and WebGL projects to the web. Get a public URL, SSL certificates, and version management out of the box. Supports instant rollbacks and preview deployments for your team.",
    icon: <Server className="h-5 w-5" />,
    status: "enabled",
    href: "/products/hosting"
  },
]
