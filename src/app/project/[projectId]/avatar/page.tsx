import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { User } from "lucide-react"

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

export default function AvatarPage({ params }: { params: { projectId: string } }) {
  return (
    <ProductPageTemplate
      productName="Avatar SSO"
      productDescription="Create and manage realistic avatars for spatial experiences"
      productIcon={<User className="h-8 w-8" />}
      productStatus="enabled"
      projectId={params.projectId}
      currentPath={`/project/${params.projectId}/avatar`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
      showComingSoon={true}
      releaseDate="November 2025"
    />
  )
}
