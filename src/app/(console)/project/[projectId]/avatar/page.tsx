import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { User } from "lucide-react"

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

export default function AvatarPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params
  return (
    <ProductPageTemplate
      productName="Avatar SSO"
      productDescription="Create and manage realistic avatars for spatial experiences"
      productIcon={<User className="h-8 w-8" />}
      productStatus="enabled"
      projectId={projectId}
      currentPath={`/project/${projectId}/avatar`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
      showComingSoon={true}
      releaseDate="November 2025"
    />
  )
}
