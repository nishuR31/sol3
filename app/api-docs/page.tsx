import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Key, Book, Zap, Shield, ExternalLink } from "lucide-react"

export default function ApiDocsPage() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/wallet/{address}",
      description: "Get wallet balance and basic information",
      response: "{ balance: number, address: string, network: string }",
    },
    {
      method: "GET",
      path: "/api/transactions/{address}",
      description: "Get transaction history for a wallet",
      response: "{ transactions: Transaction[], total: number }",
    },
    {
      method: "GET",
      path: "/api/tokens/{address}",
      description: "Get token holdings for a wallet",
      response: "{ tokens: Token[], totalValue: number }",
    },
    {
      method: "POST",
      path: "/api/transaction/simulate",
      description: "Simulate a transaction before sending",
      response: "{ success: boolean, fee: number, error?: string }",
    },
  ]

  return (
    <div className="container py-12 px-4 space-y-12">
      {/* Header */}
      <div className="text-center space-y-6">
        <Badge variant="secondary" className="px-4 py-2">
          API Documentation
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Developer API
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Integrate Solana Web3 functionality into your applications with our comprehensive REST API. Build powerful
          Web3 experiences with reliable, fast endpoints.
        </p>
      </div>

      {/* Quick Start */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Get started with our API in minutes. All endpoints require authentication via API key.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
            <div className="text-muted-foreground mb-2"># Get wallet information</div>
            <div>curl -H "Authorization: Bearer YOUR_API_KEY" \</div>
            <div className="ml-4">https://api.solanaweb3.com/api/wallet/YOUR_WALLET_ADDRESS</div>
          </div>
          <Button className="w-full sm:w-auto">
            <Key className="h-4 w-4 mr-2" />
            Get API Key
          </Button>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass text-center">
          <CardHeader>
            <Shield className="h-8 w-8 text-primary mx-auto" />
            <CardTitle>Secure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade security with rate limiting and API key authentication
            </p>
          </CardContent>
        </Card>

        <Card className="glass text-center">
          <CardHeader>
            <Zap className="h-8 w-8 text-primary mx-auto" />
            <CardTitle>Fast</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Optimized endpoints with caching for sub-second response times
            </p>
          </CardContent>
        </Card>

        <Card className="glass text-center">
          <CardHeader>
            <Book className="h-8 w-8 text-primary mx-auto" />
            <CardTitle>Well Documented</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Comprehensive documentation with examples and SDKs</p>
          </CardContent>
        </Card>
      </div>

      {/* Endpoints */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">API Endpoints</h2>
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <Card key={index} className="glass">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>{endpoint.method}</Badge>
                  <code className="text-sm font-mono">{endpoint.path}</code>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{endpoint.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Response:</h4>
                  <div className="bg-muted/50 rounded-lg p-3 font-mono text-sm">{endpoint.response}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* SDKs */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            SDKs & Libraries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Use our official SDKs to integrate with your favorite programming language:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["JavaScript", "Python", "Go", "Rust"].map((lang) => (
              <Button key={lang} variant="outline" className="justify-between bg-transparent">
                {lang}
                <ExternalLink className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Our developer support team is here to help you integrate successfully.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button>Join Discord</Button>
            <Button variant="outline">Email Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
