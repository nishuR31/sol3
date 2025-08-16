"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, Download, QrCode, Repeat, Shield, Settings, Zap, ArrowUpDown } from "lucide-react"

interface WalletActionsProps {
  onSendSol: () => void
  onRequestAirdrop: () => void
  onGenerateQR: () => void
  onSwapTokens: () => void
  isLoading: boolean
  network: string
  balance: number
}

export function WalletActions({
  onSendSol,
  onRequestAirdrop,
  onGenerateQR,
  onSwapTokens,
  isLoading,
  network,
  balance,
}: WalletActionsProps) {
  const quickActions = [
    {
      label: "Send SOL",
      icon: Send,
      onClick: onSendSol,
      variant: "default" as const,
      disabled: false,
    },
    {
      label: "Receive",
      icon: Download,
      onClick: onGenerateQR,
      variant: "outline" as const,
      disabled: false,
    },
    {
      label: "Swap",
      icon: ArrowUpDown,
      onClick: onSwapTokens,
      variant: "outline" as const,
      disabled: false,
    },
    {
      label: "Airdrop",
      icon: Zap,
      onClick: onRequestAirdrop,
      variant: "outline" as const,
      disabled: network === "mainnet-beta" || balance > 0.5,
    },
  ]

  const utilityActions = [
    {
      label: "QR Code",
      icon: QrCode,
      description: "Generate wallet QR",
    },
    {
      label: "Stake SOL",
      icon: Shield,
      description: "Earn rewards",
    },
    {
      label: "Settings",
      icon: Settings,
      description: "Wallet preferences",
    },
    {
      label: "History",
      icon: Repeat,
      description: "View all transactions",
    },
  ]

  return (
    <Card className="glass-card p-6">
      <div className="space-y-6">
        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant}
                onClick={action.onClick}
                disabled={isLoading || action.disabled}
                className="h-12 flex flex-col gap-1"
              >
                <action.icon className="h-4 w-4" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Utility Actions */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Utilities</h3>
          <div className="space-y-2">
            {utilityActions.map((action) => (
              <Button key={action.label} variant="ghost" className="w-full justify-start gap-3 h-12">
                <div className="p-2 rounded-lg bg-muted/20">
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Network Status */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Network Status</p>
              <p className="font-semibold">Connected</p>
            </div>
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              {network.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}
