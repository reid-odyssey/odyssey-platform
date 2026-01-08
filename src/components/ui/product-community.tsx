"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Star, ExternalLink } from "lucide-react"

interface CommunityPost {
  title: string
  author: string
  avatar: string
  replies: number
  likes: number
  tags: string[]
  timeAgo: string
}

interface ProductCommunityProps {
  productName: string
}

export function ProductCommunity({ productName }: ProductCommunityProps) {
  const communityPosts: CommunityPost[] = [
    {
      title: `Best practices for ${productName} performance optimization`,
      author: "Alex Chen",
      avatar: "/avatars/alex.jpg",
      replies: 23,
      likes: 45,
      tags: ["performance", "optimization"],
      timeAgo: "2 days ago"
    },
    {
      title: `New ${productName} features in v2.1 - What's changed?`,
      author: "Sarah Kim",
      avatar: "/avatars/sarah.jpg", 
      replies: 18,
      likes: 67,
      tags: ["updates", "features"],
      timeAgo: "5 days ago"
    },
    {
      title: `Troubleshooting common ${productName} integration issues`,
      author: "Mike Johnson",
      avatar: "/avatars/mike.jpg",
      replies: 31,
      likes: 89,
      tags: ["troubleshooting", "integration"],
      timeAgo: "1 week ago"
    }
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">From the Community</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of developers building with {productName}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">12.5K</div>
                    <div className="text-sm text-muted-foreground">Developers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">3.2K</div>
                    <div className="text-sm text-muted-foreground">Discussions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">850</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                </div>
                <Button className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Recent Discussions</h3>
            {communityPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium leading-tight">{post.title}</h4>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>by {post.author} • {post.timeAgo}</span>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <MessageCircle className="mr-1 h-3 w-3" />
                            {post.replies}
                          </span>
                          <span className="flex items-center">
                            <Star className="mr-1 h-3 w-3" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full">
              View All Discussions
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
