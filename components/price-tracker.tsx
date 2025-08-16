"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PriceTracker() {
  const [prices, setPrices] = useState({
    sol: { price: 98.45, change: 2.34 },
    usdc: { price: 1.0, change: 0.01 },
    ray: { price: 3.5, change: -1.23 },
  })
  const [isLoading, setIsLoading] = useState(false)

  const refreshPrices = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setPrices({
        sol: { price: 98.45 + (Math.random() - 0.5) * 2, change: (Math.random() - 0.5) * 10 },
        usdc: { price: 1.0, change: (Math.random() - 0.5) * 0.1 },
        ray: { price: 3.5 + (Math.random() - 0.5) * 0.5, change: (Math.random() - 0.5) * 5 },
      })
      setIsLoading(false)
    }, 1000)
  }

  const tokens = [
    { symbol: "SOL", name: "Solana", ...prices.sol },
    { symbol: "USDC", name: "USD Coin", ...prices.usdc },
    { symbol: "RAY", name: "Raydium", ...prices.ray },
  ]

  return (
    <Card className="glass-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <h4 className="font-medium">Price Tracker</h4>
        </div>
        <Button size="sm" variant="ghost" onClick={refreshPrices} disabled={isLoading}>
          <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="space-y-2">
        {tokens.map((token) => (
          <div key={token.symbol} className="flex items-center justify-between p-2 rounded bg-muted/10">
            <div>
              <p className="text-sm font-medium">{token.symbol}</p>
              <p className="text-xs text-muted-foreground">{token.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">${token.price.toFixed(2)}</p>
              <Badge
                variant="outline"
                className={`text-xs ${
                  token.change > 0 ? "text-accent border-accent/50" : "text-destructive border-destructive/50"
                }`}
              >
                {token.change > 0 ? <TrendingUp className="h-2 w-2 mr-1" /> : <TrendingDown className="h-2 w-2 mr-1" />}
                {token.change > 0 ? "+" : ""}
                {token.change.toFixed(2)}%
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
