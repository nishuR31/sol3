"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface WalletInfoCardProps {
  publicKey: string
  balance: number
  network: string
}

export function WalletInfoCard({ publicKey, balance, network }: WalletInfoCardProps) {
  const { toast } = useToast()

  const copyAddress = () => {
    navigator.clipboard.writeText(publicKey)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  const openExplorer = () => {
    window.open(`https://explorer.solana.com/address/${publicKey}?cluster=${network}`, "_blank")
  }

  return (
    <Card className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/20">
          <Wallet className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Wallet Overview</h3>
          <Badge variant="secondary" className="mt-1">
            {network.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Balance</p>
          <p className="text-2xl font-bold text-primary">{balance.toFixed(4)} SOL</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 border">
            <code className="text-sm font-mono flex-1 truncate">{publicKey}</code>
            <Button size="sm" variant="ghost" onClick={copyAddress} className="h-8 w-8 p-0">
              <Copy className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={openExplorer} className="h-8 w-8 p-0">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
