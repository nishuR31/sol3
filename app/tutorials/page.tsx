import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Play, Clock, User, ChevronRight } from "lucide-react"

export default function TutorialsPage() {
  const tutorials = [
    {
      title: "Getting Started with Solana Web3",
      description: "Learn the basics of connecting your wallet and navigating the dashboard",
      duration: "5 min",
      level: "Beginner",
      category: "Basics",
    },
    {
      title: "Sending Your First SOL Transaction",
      description: "Step-by-step guide to sending SOL to another wallet safely",
      duration: "8 min",
      level: "Beginner",
      category: "Transactions",
    },
    {
      title: "Understanding Token Holdings",
      description: "How to view and manage your SPL tokens and NFTs",
      duration: "10 min",
      level: "Intermediate",
      category: "Tokens",
    },
    {
      title: "Using QR Codes for Payments",
      description: "Generate and scan QR codes for easy payment requests",
      duration: "6 min",
      level: "Beginner",
      category: "Features",
    },
    {
      title: "Advanced Portfolio Analytics",
      description: "Deep dive into portfolio tracking and performance metrics",
      duration: "15 min",
      level: "Advanced",
      category: "Analytics",
    },
    {
      title: "Security Best Practices",
      description: "Keep your wallet and assets safe with these essential tips",
      duration: "12 min",
      level: "Intermediate",
      category: "Security",
    },
  ]

  const categories = ["All", "Basics", "Transactions", "Tokens", "Features", "Analytics", "Security"]

  return (
    <div className="container py-12 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <Badge variant="secondary" className="px-4 py-2">
          Learn & Grow
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Tutorials & Guides
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Master Solana Web3 with our comprehensive tutorials. From beginner basics to advanced features, we'll help you
          become a Web3 power user.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button key={category} variant="outline" size="sm">
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Tutorial */}
      <Card className="glass border-primary/20">
        <CardContent className="p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <Badge className="w-fit">Featured</Badge>
              <h2 className="text-3xl font-bold">Complete Beginner's Guide</h2>
              <p className="text-muted-foreground leading-relaxed">
                New to Solana and Web3? This comprehensive guide will take you from zero to hero, covering everything
                you need to know to use our platform confidently.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>25 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Beginner</span>
                </div>
              </div>
              <Button size="lg" className="w-full sm:w-auto">
                <Play className="h-4 w-4 mr-2" />
                Start Learning
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-8 text-center">
              <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive tutorial with hands-on exercises</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tutorial Grid */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">All Tutorials</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="glass group hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="text-xs">
                    {tutorial.category}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-lg leading-tight">{tutorial.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{tutorial.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{tutorial.duration}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tutorial.level}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Play className="h-3 w-3 mr-2" />
                  Watch Tutorial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our community and support team are here to help.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline">Join Discord Community</Button>
            <Button variant="outline">Contact Support</Button>
            <Button variant="outline">Request Tutorial</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
