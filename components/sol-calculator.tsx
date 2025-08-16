"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, ArrowUpDown } from "lucide-react"

export function SOLCalculator() {
  const [solAmount, setSolAmount] = useState("")
  const [usdAmount, setUsdAmount] = useState("")
  const [solPrice, setSolPrice] = useState(98.45) // Mock price

  useEffect(() => {
    if (solAmount && !isNaN(Number.parseFloat(solAmount))) {
      const usd = Number.parseFloat(solAmount) * solPrice
      setUsdAmount(usd.toFixed(2))
    }
  }, [solAmount, solPrice])

  useEffect(() => {
    if (usdAmount && !isNaN(Number.parseFloat(usdAmount))) {
      const sol = Number.parseFloat(usdAmount) / solPrice
      setSolAmount(sol.toFixed(4))
    }
  }, [usdAmount, solPrice])

  return (
    <Card className="glass-card p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Calculator className="h-4 w-4 text-primary" />
        <h4 className="font-medium">SOL Calculator</h4>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="sol-input" className="text-xs">
            SOL Amount
          </Label>
          <Input
            id="sol-input"
            type="number"
            step="0.0001"
            placeholder="0.0000"
            value={solAmount}
            onChange={(e) => setSolAmount(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="flex justify-center">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        </div>

        <div>
          <Label htmlFor="usd-input" className="text-xs">
            USD Amount
          </Label>
          <Input
            id="usd-input"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="p-2 bg-primary/10 rounded text-center">
          <p className="text-xs text-muted-foreground">Current SOL Price</p>
          <p className="text-sm font-semibold text-primary">${solPrice.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  )
}
