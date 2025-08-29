import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { Server } from "lucide-react"

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

export default function HostingPage({ params }: { params: { projectId: string } }) {
  return (
    <ProductPageTemplate
      productName="Hosting"
      productDescription="Deploy and host your spatial applications with global edge delivery"
      productIcon={<Server className="h-8 w-8" />}
      productStatus="enabled"
      projectId={params.projectId}
      currentPath={`/project/${params.projectId}/hosting`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
      showComingSoon={true}
      releaseDate="December 2025"
    />
  )
}
