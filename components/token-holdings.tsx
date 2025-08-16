"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Coins, ExternalLink, Plus } from "lucide-react"

interface TokenHoldingsProps {
  publicKey: string
  network: string
}

export function TokenHoldings({ publicKey, network }: TokenHoldingsProps) {
  // Mock token data - in real app, fetch from Solana token registry
  const tokens = [
    {
      symbol: "SOL",
      name: "Solana",
      balance: 5.2341,
      value: 515.67,
      change: 2.34,
      mint: "So11111111111111111111111111111111111111112",
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: 150.0,
      value: 150.0,
      change: 0.01,
      mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    },
    {
      symbol: "RAY",
      name: "Raydium",
      balance: 25.5,
      value: 89.25,
      change: -3.45,
      mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    },
  ]

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Coins className="h-5 w-5 text-accent" />
          </div>
          <h3 className="font-semibold text-lg">Token Holdings</h3>
        </div>
        <Button size="sm" variant="outline" className="glass bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Token
        </Button>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-3">
          {tokens.map((token) => (
            <div
              key={token.mint}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/50 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{token.symbol.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold">{token.symbol}</p>
                  <p className="text-sm text-muted-foreground">{token.name}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">{token.balance.toFixed(4)}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">${token.value.toFixed(2)}</p>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      token.change > 0 ? "text-accent border-accent/50" : "text-destructive border-destructive/50"
                    }`}
                  >
                    {token.change > 0 ? "+" : ""}
                    {token.change.toFixed(2)}%
                  </Badge>
                </div>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  window.open(`https://explorer.solana.com/address/${token.mint}?cluster=${network}`, "_blank")
                }
                className="h-8 w-8 p-0"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
          <span className="text-lg font-bold text-primary">$754.92</span>
        </div>
      </div>
    </Card>
  )
}
