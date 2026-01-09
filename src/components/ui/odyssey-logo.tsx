import Image from "next/image"
import { cn } from "@/lib/utils"

interface OdysseyLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  iconOnly?: boolean
  theme?: "auto" | "light" | "dark"
}

export function OdysseyLogo({ 
  className, 
  size = "md", 
  iconOnly = false,
  theme = "auto" 
}: OdysseyLogoProps) {
  const dimensions = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 }
  }
  
  const { width, height } = dimensions[size]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center">
        {theme === "auto" && (
          <>
            <Image 
              src="/odyssey-logo-dark.svg" 
              alt="Odyssey" 
              width={width} 
              height={height} 
              className="dark:hidden"
            />
            <Image 
              src="/odyssey-logo.svg" 
              alt="Odyssey" 
              width={width} 
              height={height} 
              className="hidden dark:block"
            />
          </>
        )}
        {theme === "light" && (
          <Image 
            src="/odyssey-logo.svg" 
            alt="Odyssey" 
            width={width} 
            height={height} 
          />
        )}
        {theme === "dark" && (
          <Image 
            src="/odyssey-logo-dark.svg" 
            alt="Odyssey" 
            width={width} 
            height={height} 
          />
        )}
      </div>
      {!iconOnly && <span className="font-semibold text-lg">Odyssey</span>}
    </div>
  )
}
