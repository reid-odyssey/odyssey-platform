import { cn } from "@/lib/utils"

interface OdysseyLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function OdysseyLogo({ className, size = "md" }: OdysseyLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center",
        sizeClasses[size]
      )}>
        <span className="text-white font-bold text-sm">O</span>
      </div>
      <span className="font-semibold text-lg">Odyssey</span>
    </div>
  )
}
