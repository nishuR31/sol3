import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, DollarSign, Users, Rocket, Heart, Code } from "lucide-react"

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $180k",
      description: "Build beautiful and performant Web3 interfaces using React, TypeScript, and modern tools.",
    },
    {
      title: "Blockchain Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$140k - $200k",
      description: "Develop smart contracts and integrate with Solana ecosystem protocols.",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $150k",
      description: "Design intuitive user experiences for complex Web3 applications.",
    },
    {
      title: "DevRel Engineer",
      department: "Developer Relations",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $160k",
      description: "Build relationships with developers and create educational content.",
    },
  ]

  const benefits = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health, dental, and vision insurance" },
    { icon: Rocket, title: "Growth", description: "Learning budget and conference attendance support" },
    { icon: Users, title: "Remote First", description: "Work from anywhere with flexible hours" },
    { icon: Code, title: "Cutting Edge", description: "Work with the latest Web3 and blockchain technologies" },
  ]

  return (
    <div className="container py-12 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <Badge variant="secondary" className="px-4 py-2">
          Join Our Team
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Build the Future of Web3
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join our passionate team of builders creating the next generation of decentralized applications on Solana.
          We're looking for talented individuals who share our vision.
        </p>
      </div>

      {/* Benefits */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Why Work With Us?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="glass text-center">
              <CardHeader>
                <benefit.icon className="h-8 w-8 text-primary mx-auto" />
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Open Positions</h2>
        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <Card key={index} className="glass">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <p className="text-primary">{job.department}</p>
                  </div>
                  <Button>Apply Now</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{job.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{job.salary}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Culture */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Our Culture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            We're a remote-first company that values transparency, innovation, and collaboration. Our team is passionate
            about building products that empower users and advance the decentralized web.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Innovation First</h4>
              <p className="text-sm text-muted-foreground">We encourage experimentation and creative problem-solving</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">User Focused</h4>
              <p className="text-sm text-muted-foreground">
                Every decision is made with our users' best interests in mind
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Open Source</h4>
              <p className="text-sm text-muted-foreground">
                We believe in transparency and contributing back to the community
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
