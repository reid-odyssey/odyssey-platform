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
    longDescription: "The Odyssey Asset Manager is a centralized repository for all your 3D content. It supports automatic format conversion, optimization pipelines, and version control for GLB, USDZ,FBX, and texture files.",
    icon: <Package className="h-5 w-5" />,
    status: "enabled",
    href: "/products/asset-manager"
  },
  {
    slug: "content-delivery",
    name: "Content Delivery",
    description: "Global CDN for fast asset delivery to your applications",
    icon: <Truck className="h-5 w-5" />,
    status: "enabled",
    href: "/products/content-delivery"
  },
  {
    slug: "spatial-comms",
    name: "Spatial Comms",
    description: "Real-time communication for spatial experiences",
    icon: <MessageSquare className="h-5 w-5" />,
    status: "beta",
    href: "/products/spatial-comms"
  },
  {
    slug: "avatar",
    name: "Avatar",
    description: "Avatar creation and management system",
    icon: <User className="h-5 w-5" />,
    status: "enabled",
    href: "/products/avatar"
  },
  {
    slug: "multi-player",
    name: "Multi-player",
    description: "Scalable multiplayer infrastructure",
    icon: <Users className="h-5 w-5" />,
    status: "beta",
    href: "/products/multi-player"
  },
  {
    slug: "configurator",
    name: "Configurator",
    description: "Product configuration engine",
    icon: <Palette className="h-5 w-5" />,
    status: "enabled",
    href: "/products/configurator"
  },
  {
    slug: "spatial-ui",
    name: "Spatial UI",
    description: "3D user interface components",
    icon: <Layout className="h-5 w-5" />,
    status: "enabled",
    href: "/products/spatial-ui"
  },
  {
    slug: "spatial-anchor",
    name: "Spatial Anchor",
    description: "Persistent world anchors",
    icon: <Anchor className="h-5 w-5" />,
    status: "beta",
    href: "/products/spatial-anchor"
  },
  {
    slug: "real-time-engine",
    name: "Real Time Engine",
    description: "Cloud-based rendering engine",
    icon: <Zap className="h-5 w-5" />,
    status: "beta",
    href: "/products/real-time-engine"
  },
  {
    slug: "hosting",
    name: "Hosting",
    description: "Deploy your spatial web experiences",
    icon: <Server className="h-5 w-5" />,
    status: "enabled",
    href: "/products/hosting"
  },
]
