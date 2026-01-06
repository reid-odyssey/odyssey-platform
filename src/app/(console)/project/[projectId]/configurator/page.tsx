import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { Settings } from "lucide-react"

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

export default function ConfiguratorPage({ params }: { params: { projectId: string } }) {
  return (
    <ProductPageTemplate
      productName="Configurator"
      productDescription="Visual configuration tools for spatial applications and environments"
      productIcon={<Settings className="h-8 w-8" />}
      productStatus="enabled"
      projectId={params.projectId}
      currentPath={`/project/${params.projectId}/configurator`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
      showComingSoon={true}
      releaseDate="December 2025"
    />
  )
}
