import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { Anchor } from "lucide-react"

const mockProject = {
  name: "agency-prod",
  id: "proj_123456789"
}

const mockProjects = [
  { name: "agency-prod", id: "proj_123456789" },
  { name: "Demo Project", id: "proj_987654321" },
]

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatars/john.jpg"
}

export default async function SpatialAnchorPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  return (
    <ProductPageTemplate
      productName="Spatial Anchor"
      productDescription="Create persistent spatial anchors and reference points for immersive experiences with precise positioning and tracking capabilities."
      productIcon={<Anchor className="h-8 w-8" />}
      productStatus="enabled"
      projectId={params.projectId}
      currentPath={`/project/${params.projectId}/spatial-anchor`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
      showComingSoon={true}
      releaseDate="January 2026"
    />
  )
}
