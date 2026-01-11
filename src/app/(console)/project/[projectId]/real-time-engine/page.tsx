import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { Zap } from "lucide-react"

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

export default function RealTimeEnginePage({ params }: { params: { projectId: string } }) {
  const { projectId } = params
  return (
    <ProductPageTemplate
      productName="Real Time Engine"
      productDescription="High-performance real-time rendering engine optimized for spatial computing with advanced physics, lighting, and interactive capabilities."
      productIcon={<Zap className="h-8 w-8" />}
      productStatus="enabled"
      projectId={projectId}
      currentPath={`/project/${projectId}/real-time-engine`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
      showComingSoon={true}
      releaseDate="January 2026"
    />
  )
}
