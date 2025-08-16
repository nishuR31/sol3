import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Zap, Shield, Globe, Award } from "lucide-react"

export default function AboutPage() {
  const team = [
    { name: "Alex Chen", role: "Founder & CEO", expertise: "Blockchain Architecture" },
    { name: "Sarah Kim", role: "CTO", expertise: "Web3 Development" },
    { name: "Marcus Johnson", role: "Lead Designer", expertise: "UI/UX Design" },
    { name: "Elena Rodriguez", role: "Head of Security", expertise: "Smart Contract Auditing" },
  ]

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Your assets and data are protected with enterprise-grade security",
    },
    { icon: Zap, title: "Lightning Fast", description: "Built for speed with optimized performance on Solana" },
    { icon: Globe, title: "Decentralized", description: "Embracing the true spirit of Web3 and decentralization" },
    { icon: Users, title: "Community Driven", description: "Built by the community, for the community" },
  ]

  return (
    <div className="container py-12 px-4 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <Badge variant="secondary" className="px-4 py-2">
          About Solana Web3
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Building the Future of Web3
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We're passionate about creating the most intuitive and powerful Solana wallet experience, making Web3
          accessible to everyone while maintaining the highest security standards.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              To democratize access to the Solana ecosystem by providing a comprehensive, user-friendly wallet dashboard
              that empowers users to manage their digital assets with confidence and ease.
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              To become the leading Web3 interface that bridges traditional finance with decentralized technologies,
              making blockchain interactions as simple as using any modern web application.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="glass text-center">
              <CardHeader>
                <value.icon className="h-8 w-8 text-primary mx-auto" />
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} className="glass text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent mx-auto mb-4" />
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <p className="text-sm text-primary">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.expertise}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
