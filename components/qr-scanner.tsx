"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Scan, Camera, Upload } from "lucide-react"

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState("")
  const { toast } = useToast()

  const startScanning = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      const mockAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
      setScannedData(mockAddress)
      setIsScanning(false)
      toast({
        title: "QR Code Scanned",
        description: "Wallet address detected",
      })
    }, 2000)
  }

  const uploadImage = () => {
    toast({
      title: "Upload QR Image",
      description: "Feature coming soon",
    })
  }

  return (
    <Card className="glass-card p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Scan className="h-4 w-4 text-accent" />
        <h4 className="font-medium">QR Scanner</h4>
      </div>

      <div className="space-y-3">
        {isScanning ? (
          <div className="p-8 bg-muted/20 rounded-lg text-center">
            <Camera className="h-8 w-8 mx-auto mb-2 animate-pulse text-accent" />
            <p className="text-sm text-muted-foreground">Scanning...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Button onClick={startScanning} size="sm" className="w-full">
              <Camera className="h-3 w-3 mr-2" />
              Start Camera
            </Button>
            <Button onClick={uploadImage} size="sm" variant="outline" className="w-full bg-transparent">
              <Upload className="h-3 w-3 mr-2" />
              Upload Image
            </Button>
          </div>
        )}

        {scannedData && (
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">Scanned Address:</p>
            <p className="text-xs font-mono break-all">{scannedData}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
