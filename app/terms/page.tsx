import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertTriangle, Shield, Users, Gavel } from "lucide-react"

export default function TermsPage() {
  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content:
        "By accessing and using Solana Web3 dashboard, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      icon: Shield,
      title: "Service Description",
      content:
        "Solana Web3 is a non-custodial wallet interface that allows users to interact with the Solana blockchain. We provide tools for viewing balances, sending transactions, and managing digital assets. We do not custody funds or private keys.",
    },
    {
      icon: AlertTriangle,
      title: "User Responsibilities",
      content:
        "You are solely responsible for maintaining the security of your private keys and seed phrases. You acknowledge that transactions on the blockchain are irreversible. You agree to use the service in compliance with all applicable laws.",
    },
    {
      icon: Gavel,
      title: "Limitation of Liability",
      content:
        "Solana Web3 shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from your use of the service. This includes but is not limited to loss of funds, data, or profits.",
    },
  ]

  return (
    <div className="container py-12 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <Badge variant="secondary" className="px-4 py-2">
          Terms of Service
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Please read these terms carefully before using our service. Last updated: December 2024
        </p>
      </div>

      {/* Important Notice */}
      <Card className="glass border-amber-500/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-500 mb-2">Important Notice</h3>
              <p className="text-muted-foreground leading-relaxed">
                Solana Web3 is a decentralized application (dApp) that facilitates interactions with the Solana
                blockchain. We do not control the blockchain, and transactions are irreversible. Please use caution and
                only invest what you can afford to lose.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <Card key={index} className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Terms */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Prohibited Uses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Illegal activities or money laundering</li>
              <li>• Violating any applicable laws or regulations</li>
              <li>• Attempting to hack or compromise the service</li>
              <li>• Creating multiple accounts to abuse features</li>
              <li>• Interfering with other users' access to the service</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Modifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon
              posting. Your continued use of the service constitutes acceptance of the modified terms.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Questions About These Terms?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:legal@solanaweb3.com" className="text-primary hover:underline">
                legal@solanaweb3.com
              </a>
            </p>
            <p>
              <strong>Address:</strong> 123 Blockchain Ave, Crypto City, CC 12345
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
