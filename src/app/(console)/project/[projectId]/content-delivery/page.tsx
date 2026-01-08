import { ProductPageTemplate } from "@/components/ui/product-page-template"
import { Truck } from "lucide-react"

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

export default async function ContentDeliveryPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  return (
    <ProductPageTemplate
      productName="Content Delivery"
      productDescription="Global CDN for fast asset delivery to your applications"
      productIcon={<Truck className="h-8 w-8" />}
      productStatus="enabled"
      projectId={params.projectId}
      currentPath={`/project/${params.projectId}/content-delivery`}
      mockProject={mockProject}
      mockProjects={mockProjects}
      mockUser={mockUser}
      initialEngaged={false}
      showComingSoon={true}
      releaseDate="October 2025"
    />
  )
}
