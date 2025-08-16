"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { QrCode, Copy, Download } from "lucide-react"

interface QRGeneratorProps {
  defaultAddress?: string
}

export function QRGenerator({ defaultAddress = "" }: QRGeneratorProps) {
  const [address, setAddress] = useState(defaultAddress)
  const [amount, setAmount] = useState("")
  const [qrData, setQrData] = useState("")
  const [qrImageUrl, setQrImageUrl] = useState("")
  const { toast } = useToast()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateQR = async () => {
    if (!address) {
      toast({
        title: "Error",
        description: "Please enter a wallet address",
        variant: "destructive",
      })
      return
    }

    let qrContent = `solana:${address}`
    if (amount && Number.parseFloat(amount) > 0) {
      qrContent += `?amount=${amount}`
    }

    try {
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrContent)}`
      setQrImageUrl(qrApiUrl)
      setQrData(qrContent)

      toast({
        title: "QR Code Generated",
        description: "QR code created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrData)
    toast({
      title: "Copied",
      description: "QR data copied to clipboard",
    })
  }

  const downloadQR = async () => {
    if (!qrImageUrl) return

    try {
      const response = await fetch(qrImageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `solana-qr-${address.slice(0, 8)}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      toast({
        title: "Downloaded",
        description: "QR code saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download QR code",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="glass-card p-4 space-y-4">
      <div className="flex items-center gap-2">
        <QrCode className="h-4 w-4 text-primary" />
        <h4 className="font-medium">QR Generator</h4>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="qr-address" className="text-xs">
            Wallet Address
          </Label>
          <Input
            id="qr-address"
            placeholder="Enter Solana address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="text-xs font-mono"
          />
        </div>

        <div>
          <Label htmlFor="qr-amount" className="text-xs">
            Amount (Optional)
          </Label>
          <Input
            id="qr-amount"
            type="number"
            step="0.0001"
            placeholder="0.0000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-xs"
          />
        </div>

        <Button onClick={generateQR} size="sm" className="w-full">
          Generate QR Code
        </Button>

        {qrImageUrl && (
          <div className="space-y-2">
            <div className="p-4 bg-white rounded-lg flex items-center justify-center">
              <img
                src={qrImageUrl || "/placeholder.svg"}
                alt="Solana QR Code"
                className="w-32 h-32 rounded"
                onError={() => {
                  toast({
                    title: "Error",
                    description: "Failed to load QR code image",
                    variant: "destructive",
                  })
                }}
              />
            </div>
            <div className="text-xs text-muted-foreground text-center font-mono break-all">{qrData}</div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={copyToClipboard} className="flex-1 bg-transparent">
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
              <Button size="sm" variant="outline" onClick={downloadQR} className="flex-1 bg-transparent">
                <Download className="h-3 w-3 mr-1" />
                Save
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden canvas for potential future use */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Card>
  )
}
