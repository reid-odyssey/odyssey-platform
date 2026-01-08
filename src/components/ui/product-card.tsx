import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Settings } from "lucide-react"

interface ProductCardProps {
  name: string
  description: string
  icon: React.ReactNode
  status: "enabled" | "disabled" | "beta"
  href: string
  onConfigure?: () => void
}

export function ProductCard({ name, description, icon, status, href, onConfigure }: ProductCardProps) {
  const statusColors = {
    enabled: "bg-green-100 text-green-800 border-green-200",
    disabled: "bg-gray-100 text-gray-800 border-gray-200",
    beta: "bg-blue-100 text-blue-800 border-blue-200"
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-3 flex-1">
          <div className="p-2 rounded-lg bg-muted">
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <Badge variant="outline" className={statusColors[status]}>
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <a href={href}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          {onConfigure && (
            <Button variant="outline" size="sm" onClick={onConfigure}>
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
