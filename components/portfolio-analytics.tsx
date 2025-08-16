"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react"

interface PortfolioAnalyticsProps {
  balance: number
  network: string
}

export function PortfolioAnalytics({ balance, network }: PortfolioAnalyticsProps) {
  // Mock data for demonstration - in real app, fetch from price API
  const solPrice = 98.45
  const portfolioValue = balance * solPrice
  const dayChange = 2.34
  const weekChange = -5.67

  const stats = [
    {
      label: "Portfolio Value",
      value: `$${portfolioValue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-primary",
    },
    {
      label: "SOL Price",
      value: `$${solPrice.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      label: "24h Change",
      value: `${dayChange > 0 ? "+" : ""}${dayChange.toFixed(2)}%`,
      icon: dayChange > 0 ? TrendingUp : TrendingDown,
      color: dayChange > 0 ? "text-accent" : "text-destructive",
    },
    {
      label: "7d Change",
      value: `${weekChange > 0 ? "+" : ""}${weekChange.toFixed(2)}%`,
      icon: weekChange > 0 ? TrendingUp : TrendingDown,
      color: weekChange > 0 ? "text-accent" : "text-destructive",
    },
  ]

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/20">
          <PieChart className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Portfolio Analytics</h3>
          <Badge variant="secondary" className="mt-1">
            {network.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-lg bg-muted/10 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total SOL Holdings</p>
            <p className="text-2xl font-bold text-primary">{balance.toFixed(4)} SOL</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">USD Value</p>
            <p className="text-xl font-semibold text-accent">${portfolioValue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
