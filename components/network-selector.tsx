"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"

interface NetworkSelectorProps {
  network: string
  onNetworkChange: (network: string) => void
}

export function NetworkSelector({ network, onNetworkChange }: NetworkSelectorProps) {
  const networks = [
    { value: "devnet", label: "Devnet", color: "bg-yellow-500/20 text-yellow-400" },
    { value: "testnet", label: "Testnet", color: "bg-blue-500/20 text-blue-400" },
    { value: "mainnet-beta", label: "Mainnet", color: "bg-green-500/20 text-green-400" },
  ]

  const currentNetwork = networks.find((n) => n.value === network)

  return (
    <div className="flex items-center gap-3">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={network} onValueChange={onNetworkChange}>
        <SelectTrigger className="w-[140px] glass">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {networks.map((net) => (
            <SelectItem key={net.value} value={net.value}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${net.color}`} />
                {net.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {currentNetwork && <Badge className={currentNetwork.color}>{currentNetwork.label}</Badge>}
    </div>
  )
}
