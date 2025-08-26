import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Home, 
  Settings, 
  Users, 
  CreditCard, 
  Package, 
  Truck, 
  MessageSquare, 
  User, 
  Palette, 
  Layout, 
  Server 
} from "lucide-react"

interface SidebarProps {
  className?: string
  currentPath?: string
  projectId?: string
}

const navigationItems = [
  {
    title: "Overview",
    href: "/project/[projectId]",
    icon: Home,
  },
  {
    title: "Settings",
    href: "/project/[projectId]/settings",
    icon: Settings,
  },
  {
    title: "Users & Permissions",
    href: "/project/[projectId]/users",
    icon: Users,
  },
  {
    title: "Billing",
    href: "/project/[projectId]/billing",
    icon: CreditCard,
  },
]

const productItems = [
  {
    title: "Asset Manager",
    href: "/project/[projectId]/asset-manager",
    icon: Package,
  },
  {
    title: "Content Delivery",
    href: "/project/[projectId]/content-delivery",
    icon: Truck,
  },
  {
    title: "Spatial Comms",
    href: "/project/[projectId]/spatial-comms",
    icon: MessageSquare,
  },
  {
    title: "Avatar",
    href: "/project/[projectId]/avatar",
    icon: User,
  },
  {
    title: "Configurator",
    href: "/project/[projectId]/configurator",
    icon: Palette,
  },
  {
    title: "Spatial UI",
    href: "/project/[projectId]/spatial-ui",
    icon: Layout,
  },
  {
    title: "Hosting",
    href: "/project/[projectId]/hosting",
    icon: Server,
  },
]

export function ConsoleSidebar({ className, currentPath, projectId }: SidebarProps) {
  const getHref = (href: string) => {
    return projectId ? href.replace('[projectId]', projectId) : href
  }

  const isActive = (href: string) => {
    const actualHref = getHref(href)
    return currentPath === actualHref
  }

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Project
          </h2>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <a href={getHref(item.href)}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </a>
              </Button>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Products
          </h2>
          <div className="space-y-1">
            {productItems.map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <a href={getHref(item.href)}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
