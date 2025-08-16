import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Wallet addresses and transaction data (publicly available on blockchain)",
        "Usage analytics to improve our service",
        "Technical information like IP address and browser type",
        "Optional account information if you create an account",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To provide and improve our wallet dashboard services",
        "To analyze usage patterns and optimize performance",
        "To communicate important updates and security notices",
        "To comply with legal obligations and prevent fraud",
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "We never store your private keys or seed phrases",
        "All data transmission is encrypted using industry-standard protocols",
        "Regular security audits and penetration testing",
        "Secure cloud infrastructure with access controls",
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access and review your personal data",
        "Request correction of inaccurate information",
        "Delete your account and associated data",
        "Opt-out of non-essential communications",
      ],
    },
  ]

  return (
    <div className="container py-12 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <Badge variant="secondary" className="px-4 py-2">
          Privacy Policy
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Your Privacy Matters
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're committed to protecting your privacy and being transparent about how we handle your data. Last updated:
          December 2024
        </p>
      </div>

      {/* Overview */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Privacy Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            At Solana Web3, we believe in the principles of decentralization and user sovereignty. This means we collect
            minimal data, never store your private keys, and give you full control over your information.
          </p>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-primary mb-1">Important Note</h4>
                <p className="text-sm text-muted-foreground">
                  We are a non-custodial wallet interface. We never have access to your funds or private keys. All
                  transactions are signed locally in your browser.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Sections */}
      <div className="grid gap-8">
        {sections.map((section, index) => (
          <Card key={index} className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Questions About Privacy?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to
            contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <p className="font-medium">Email:</p>
              <a href="mailto:privacy@solanaweb3.com" className="text-primary hover:underline">
                privacy@solanaweb3.com
              </a>
            </div>
            <div>
              <p className="font-medium">Address:</p>
              <p className="text-muted-foreground">123 Blockchain Ave, Crypto City, CC 12345</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
