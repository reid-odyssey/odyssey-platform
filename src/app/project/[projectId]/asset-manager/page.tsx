import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { Package } from "lucide-react"

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

export default function AssetManagerPage({ params }: { params: { projectId: string } }) {
  return (
    <ProductPageTemplate
      productName="Asset Manager"
      productDescription="Manage and organize your 3D assets, textures, and media files with powerful tools for spatial computing applications. Upload, process, and deliver assets at scale."
      productIcon={<Package className="h-8 w-8" />}
      productStatus="enabled"
      projectId={params.projectId}
      currentPath={`/project/${params.projectId}/asset-manager`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
      showComingSoon={true}
      releaseDate="September 2025"
    />
  )
}
