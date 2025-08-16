import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Key, Server, FileText } from "lucide-react"

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Non-Custodial Architecture",
      description:
        "We never store your private keys or seed phrases. All transactions are signed locally in your browser.",
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "All data transmission is encrypted using industry-standard TLS 1.3 protocols.",
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Our servers are hosted on enterprise-grade cloud infrastructure with 24/7 monitoring.",
    },
    {
      icon: Eye,
      title: "Open Source",
      description: "Our code is open source and regularly audited by security researchers.",
    },
  ]

  const bestPractices = [
    "Never share your seed phrase or private keys with anyone",
    "Always verify transaction details before signing",
    "Use hardware wallets for large amounts",
    "Keep your browser and wallet extensions updated",
    "Be cautious of phishing websites and emails",
    "Enable two-factor authentication where possible",
  ]

  const audits = [
    {
      company: "CertiK",
      date: "December 2024",
      status: "Passed",
      scope: "Smart Contract Security",
    },
    {
      company: "Trail of Bits",
      date: "November 2024",
      status: "Passed",
      scope: "Web Application Security",
    },
    {
      company: "Quantstamp",
      date: "October 2024",
      status: "Passed",
      scope: "Infrastructure Security",
    },
  ]

  return (
    <div className="container py-12 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <Badge variant="secondary" className="px-4 py-2">
          Security Center
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Security & Trust
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your security is our top priority. Learn about our security measures and best practices to keep your assets
          safe in the Web3 ecosystem.
        </p>
      </div>

      {/* Security Promise */}
      <Card className="glass border-green-500/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-500 mb-2">Our Security Promise</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to maintaining the highest security standards. We never have access to your funds,
                private keys, or seed phrases. Your assets remain under your complete control at all times.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Security Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            Security Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Follow these essential security practices to protect your digital assets:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {bestPractices.map((practice, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{practice}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Audits */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Security Audits</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          We regularly undergo comprehensive security audits by leading blockchain security firms to ensure our platform
          meets the highest security standards.
        </p>
        <div className="grid gap-4">
          {audits.map((audit, index) => (
            <Card key={index} className="glass">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{audit.company}</h3>
                    <p className="text-sm text-muted-foreground">{audit.scope}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-green-500 border-green-500/20 mb-1">
                    {audit.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{audit.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Responsible Disclosure */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Responsible Disclosure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We welcome security researchers to help us maintain the security of our platform. If you discover a security
            vulnerability, please report it responsibly.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Bug Bounty Program</h4>
              <p className="text-sm text-muted-foreground">
                We offer rewards for valid security vulnerabilities. Rewards range from $100 to $10,000 depending on
                severity and impact.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Contact Information</h4>
              <p className="text-sm text-muted-foreground">
                Email:{" "}
                <a href="mailto:security@solanaweb3.com" className="text-primary hover:underline">
                  security@solanaweb3.com
                </a>
                <br />
                PGP Key: Available upon request
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
