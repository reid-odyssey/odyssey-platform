import { ConsoleHeader } from "@/components/ui/console-header"
import { ConsoleSidebar } from "@/components/ui/console-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "@/components/ui/stats-card"
import { Input } from "@/components/ui/input"
import { 
  Package, 
  Upload, 
  Download, 
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Trash2,
  Copy,
  FileImage,
  File,
  FileVideo,
  FileAudio
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockProject = {
  name: "odyssey-console",
  id: "proj_123456789"
}

const mockProjects = [
  { name: "odyssey-console", id: "proj_123456789" },
  { name: "Demo Project", id: "proj_987654321" },
]

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatars/john.jpg"
}

const mockAssets = [
  {
    id: "asset_001",
    name: "character_model_v2.glb",
    type: "3D Model",
    size: "2.4 MB",
    uploadedAt: "2024-03-20",
    downloads: 156,
    status: "Active"
  },
  {
    id: "asset_002", 
    name: "environment_texture.jpg",
    type: "Texture",
    size: "1.8 MB",
    uploadedAt: "2024-03-19",
    downloads: 89,
    status: "Active"
  },
  {
    id: "asset_003",
    name: "ambient_sound.mp3",
    type: "Audio",
    size: "3.2 MB", 
    uploadedAt: "2024-03-18",
    downloads: 45,
    status: "Active"
  },
  {
    id: "asset_004",
    name: "intro_video.mp4",
    type: "Video",
    size: "15.6 MB",
    uploadedAt: "2024-03-17",
    downloads: 23,
    status: "Processing"
  }
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "3D Model": return <File className="h-4 w-4" />
    case "Texture": return <FileImage className="h-4 w-4" />
    case "Video": return <FileVideo className="h-4 w-4" />
    case "Audio": return <FileAudio className="h-4 w-4" />
    default: return <Package className="h-4 w-4" />
  }
}

export default function AssetManagerPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <ConsoleHeader 
        currentProject={mockProject}
        projects={mockProjects}
        user={mockUser}
      />
      
      <div className="flex">
        <ConsoleSidebar 
          projectId={params.projectId}
          currentPath={`/project/${params.projectId}/asset-manager`}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  <Package className="mr-3 h-8 w-8" />
                  Asset Manager
                </h1>
                <p className="text-muted-foreground">
                  Manage and organize your 3D assets, textures, and media files
                </p>
              </div>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Asset
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Assets"
                value="1,247"
                description="across all types"
                icon={Package}
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Storage Used"
                value="12.4 GB"
                description="of 100 GB"
                icon={Package}
              />
              <StatsCard
                title="Downloads"
                value="8,456"
                description="this month"
                icon={Download}
                trend={{ value: 23, isPositive: true }}
              />
              <StatsCard
                title="Processing"
                value="3"
                description="assets in queue"
                icon={Package}
              />
            </div>

            <Tabs defaultValue="assets" className="space-y-4">
              <TabsList>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="collections">Collections</TabsTrigger>
                <TabsTrigger value="cdn">CDN Settings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="assets" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Asset Library</CardTitle>
                        <CardDescription>
                          Browse and manage your uploaded assets
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search assets..." className="pl-8 w-[300px]" />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Asset</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Uploaded</TableHead>
                          <TableHead>Downloads</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockAssets.map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                {getFileIcon(asset.type)}
                                <div>
                                  <div className="font-medium">{asset.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {asset.id}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{asset.type}</Badge>
                            </TableCell>
                            <TableCell>{asset.size}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {asset.uploadedAt}
                            </TableCell>
                            <TableCell>{asset.downloads}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={asset.status === "Active" ? "default" : "secondary"}
                              >
                                {asset.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy URL
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="collections" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Asset Collections</CardTitle>
                    <CardDescription>
                      Organize your assets into collections for better management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">No collections created yet</p>
                      <Button>Create Collection</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cdn" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>CDN Configuration</CardTitle>
                    <CardDescription>
                      Configure content delivery network settings for optimal performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h3 className="font-medium">CDN Endpoint</h3>
                        <div className="flex space-x-2">
                          <Input 
                            value="https://cdn.odyssey.com/proj_123456789" 
                            readOnly 
                            className="bg-muted"
                          />
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Cache TTL</h3>
                        <Input defaultValue="3600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Download Analytics</CardTitle>
                      <CardDescription>Asset download statistics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Analytics data will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Storage Analytics</CardTitle>
                      <CardDescription>Storage usage breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Storage analytics will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
