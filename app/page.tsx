"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import {
  Wallet,
  Shield,
  Zap,
  BarChart3,
  QrCode,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react"

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const features = [
    {
      icon: Wallet,
      title: "Wallet Management",
      description: "Connect and manage your Phantom wallet with comprehensive balance and transaction tracking.",
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Send SOL securely with built-in validation and confirmation for all transactions.",
    },
    {
      icon: QrCode,
      title: "QR Code Tools",
      description: "Generate and scan QR codes for quick wallet address sharing and transaction processing.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track your portfolio performance with detailed analytics and transaction history.",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Built on Solana's high-performance blockchain for lightning-fast transaction processing.",
    },
    {
      icon: Globe,
      title: "Multi-Network",
      description: "Switch between mainnet, devnet, and testnet environments seamlessly.",
    },
  ]

  const stats = [
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "Transactions", value: "1M+", icon: TrendingUp },
    { label: "Networks", value: "3", icon: Globe },
    { label: "Uptime", value: "99.9%", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header onConnectWallet={() => {}} onDisconnectWallet={() => {}} isLoading={false} />

      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="container max-w-6xl mx-auto relative">
            <div className="text-center space-y-8">
              <Badge variant="outline" className="glass px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                New: QR Code Scanner & Generator
              </Badge>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                  Solana Web3
                  <br />
                  Dashboard
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  The most comprehensive Solana wallet dashboard with glassmorphic design, advanced analytics, and
                  powerful Web3 utilities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="px-8 py-6 text-lg">
                    Launch Dashboard
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg glass bg-transparent">
                  View Features
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                {stats.map((stat) => (
                  <Card key={stat.label} className="glass-card p-6 text-center">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your Solana assets with style and efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                  <div className="p-3 rounded-xl bg-primary/20 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <Card className="glass-card p-12 text-center">
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-primary/20 w-fit mx-auto">
                  <Wallet className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Connect your Phantom wallet and experience the future of Solana Web3 management.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/dashboard">
                    <Button size="lg" className="px-8 py-6 text-lg">
                      Connect Wallet
                      <Wallet className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="px-8 py-6 text-lg glass bg-transparent">
                    Learn More
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
