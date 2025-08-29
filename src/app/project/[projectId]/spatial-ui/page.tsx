import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { Layout } from "lucide-react"

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

export default function SpatialUIPage({ params }: { params: { projectId: string } }) {
  return (
    <ProductPageTemplate
      productName="Spatial UI"
      productDescription="Build immersive user interfaces for spatial computing environments"
      productIcon={<Layout className="h-8 w-8" />}
      productStatus="enabled"
      projectId={params.projectId}
      currentPath={`/project/${params.projectId}/spatial-ui`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
      showComingSoon={true}
      releaseDate="January 2026"
    />
  )
}
