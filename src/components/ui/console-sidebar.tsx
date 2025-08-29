import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  Activity, 
  DollarSign, 
  Database,
  Package, 
  Truck, 
  MessageSquare, 
  User, 
  Palette, 
  Layout, 
  Server,
  Settings,
  FileText,
  Clock,
  Anchor,
  Gamepad2,
  Zap,
  Plus,
  Home,
  CreditCard
} from "lucide-react"

interface SidebarProps {
  className?: string
  currentPath?: string
  projectId?: string
  currentProject?: {
    name: string
    id: string
  }
  projects?: Array<{
    name: string
    id: string
  }>
  onProjectChange?: (projectId: string) => void
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
    isActive: true,
  },
  {
    title: "Content Delivery",
    href: "/project/[projectId]/content-delivery",
    icon: Truck,
    isActive: false,
  },
  {
    title: "Spatial Comms",
    href: "/project/[projectId]/spatial-comms",
    icon: MessageSquare,
    isActive: true,
  },
  {
    title: "Avatar SSO",
    href: "/project/[projectId]/avatar",
    icon: User,
    isActive: false,
  },
  {
    title: "Multi-player",
    href: "/project/[projectId]/multi-player",
    icon: Users,
    isActive: false,
  },
  {
    title: "Configurator",
    href: "/project/[projectId]/configurator",
    icon: Palette,
    isActive: false,
  },
  {
    title: "Spatial UI",
    href: "/project/[projectId]/spatial-ui",
    icon: Layout,
    isActive: false,
  },
  {
    title: "Spatial Anchor",
    href: "/project/[projectId]/spatial-anchor",
    icon: Anchor,
    isActive: false,
  },
  {
    title: "Real Time Engine",
    href: "/project/[projectId]/real-time-engine",
    icon: Zap,
    isActive: false,
  },
  {
    title: "Hosting",
    href: "/project/[projectId]/hosting",
    icon: Server,
    isActive: false,
  },
]

export function ConsoleSidebar({ 
  className, 
  currentPath, 
  projectId, 
  currentProject,
  projects = [],
  onProjectChange 
}: SidebarProps) {
  const getHref = (href: string) => {
    return projectId ? href.replace('[projectId]', projectId) : href
  }

  const isActive = (href: string) => {
    const actualHref = getHref(href)
    return currentPath === actualHref
  }

  return (
    <div className={cn("w-80 bg-muted/40 p-4 flex-shrink-0 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
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
        
        <div className="px-3 py-2 dark:bg-muted/60 rounded-lg border dark:border-transparent">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Products
          </h2>
          <div className="space-y-1">
            {productItems.map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start relative"
                asChild
              >
                <a href={getHref(item.href)}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                  {item.isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </a>
              </Button>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <a href="/templates">
                <Package className="mr-2 h-4 w-4" />
                Template Library
              </a>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <a href="/documentation">
                <FileText className="mr-2 h-4 w-4" />
                Documentation
              </a>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <a href="/discord" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-4 w-4" />
                Discord
              </a>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <a href="/support">
                <Settings className="mr-2 h-4 w-4" />
                Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
