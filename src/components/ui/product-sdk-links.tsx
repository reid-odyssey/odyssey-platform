"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Copy, Package } from "lucide-react"

interface SDK {
  name: string
  language: string
  version: string
  downloadUrl: string
  docsUrl: string
  npmPackage?: string
  description: string
}

interface ProductSdkLinksProps {
  productName: string
}

export function ProductSdkLinks({ productName }: ProductSdkLinksProps) {
  const sdks: SDK[] = [
    {
      name: "JavaScript SDK",
      language: "JavaScript",
      version: "v2.1.0",
      downloadUrl: "#",
      docsUrl: "#",
      npmPackage: `@odyssey/${productName.toLowerCase()}-js`,
      description: "Full-featured SDK for web applications"
    },
    {
      name: "React SDK",
      language: "React",
      version: "v1.8.2",
      downloadUrl: "#",
      docsUrl: "#",
      npmPackage: `@odyssey/${productName.toLowerCase()}-react`,
      description: "React components and hooks"
    },
    {
      name: "Unity SDK",
      language: "C#",
      version: "v3.0.1",
      downloadUrl: "#",
      docsUrl: "#",
      description: "Unity package for spatial applications"
    },
    {
      name: "Python SDK",
      language: "Python",
      version: "v1.5.0",
      downloadUrl: "#",
      docsUrl: "#",
      npmPackage: `odyssey-${productName.toLowerCase()}`,
      description: "Server-side integration library"
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SDKs & Libraries</CardTitle>
        <CardDescription>
          Official {productName} SDKs and libraries for different platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sdks.map((sdk, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{sdk.name}</h3>
                  <Badge variant="outline">{sdk.version}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{sdk.description}</p>
              </div>
              <Badge variant="secondary">{sdk.language}</Badge>
            </div>

            {sdk.npmPackage && (
              <div className="mb-3 p-2 bg-muted rounded border">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono">
                    npm install {sdk.npmPackage}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(`npm install ${sdk.npmPackage}`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Documentation
              </Button>
              {sdk.npmPackage && (
                <Button variant="outline" size="sm">
                  <Package className="mr-2 h-4 w-4" />
                  NPM
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
