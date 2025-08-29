import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { Users } from "lucide-react"

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

export default function MultiPlayerPage({ params }: { params: { projectId: string } }) {
  return (
    <ProductPageTemplate
      productName="Multi-player"
      productDescription="Enable real-time multiplayer experiences in spatial environments with synchronized interactions, shared state management, and collaborative features."
      productIcon={<Users className="h-8 w-8" />}
      productStatus="enabled"
      projectId={params.projectId}
      currentPath={`/project/${params.projectId}/multi-player`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
      showComingSoon={true}
      releaseDate="January 2026"
    />
  )
}
