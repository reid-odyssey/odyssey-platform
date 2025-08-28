"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff, Plus, RotateCcw, Trash2 } from "lucide-react"
import { useState } from "react"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  status: "active" | "inactive"
}

interface ProductApiKeysProps {
  productName: string
}

export function ProductApiKeys({ productName }: ProductApiKeysProps) {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  
  const apiKeys: ApiKey[] = [
    {
      id: "key_001",
      name: "Production Key",
      key: "od_live_1234567890abcdef1234567890abcdef",
      created: "2024-03-15",
      lastUsed: "2 hours ago",
      status: "active"
    },
    {
      id: "key_002", 
      name: "Development Key",
      key: "od_test_abcdef1234567890abcdef1234567890",
      created: "2024-03-10",
      lastUsed: "1 day ago",
      status: "active"
    }
  ]

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const maskKey = (key: string) => {
    return key.substring(0, 12) + "•".repeat(20) + key.substring(key.length - 4)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Manage your {productName} API keys for authentication
            </CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Key
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="font-medium">{apiKey.name}</h3>
                <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>
                  {apiKey.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                >
                  {showKeys[apiKey.id] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(apiKey.key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Input
                value={showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                readOnly
                className="font-mono text-sm bg-muted"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Created: {apiKey.created}</span>
                <span>Last used: {apiKey.lastUsed}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
