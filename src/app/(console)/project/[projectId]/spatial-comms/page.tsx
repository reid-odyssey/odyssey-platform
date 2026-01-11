import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { MessageSquare } from "lucide-react"

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

export default function SpatialCommsPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params
  return (
    <ProductPageTemplate
      productName="Spatial Comms"
      productDescription="Real-time communication and collaboration in spatial environments"
      productIcon={<MessageSquare className="h-8 w-8" />}
      productStatus="enabled"
      projectId={projectId}
      currentPath={`/project/${projectId}/spatial-comms`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
    />
  )
}
