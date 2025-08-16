"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QRGenerator } from "@/components/qr-generator"
import { QRScanner } from "@/components/qr-scanner"
import { SOLCalculator } from "@/components/sol-calculator"
import { PriceTracker } from "@/components/price-tracker"
import { QrCode, Scan, Calculator, TrendingUp, Settings, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  walletAddress?: string
}

export function Sidebar({ isOpen, onToggle, walletAddress }: SidebarProps) {
  const [activeUtility, setActiveUtility] = useState<string | null>(null)

  const utilities = [
    { id: "qr-generator", label: "QR Generator", icon: QrCode, badge: "New" },
    { id: "qr-scanner", label: "QR Scanner", icon: Scan },
    { id: "calculator", label: "SOL Calculator", icon: Calculator },
    { id: "price-tracker", label: "Price Tracker", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ]

  const renderUtilityContent = () => {
    switch (activeUtility) {
      case "qr-generator":
        return <QRGenerator defaultAddress={walletAddress} />
      case "qr-scanner":
        return <QRScanner />
      case "calculator":
        return <SOLCalculator />
      case "price-tracker":
        return <PriceTracker />
      case "settings":
        return (
          <div className="glass-card p-4 py-5 space-y-3">
            <h4 className="font-medium">Settings</h4>
            <p className="text-sm text-muted-foreground">Configure your dashboard preferences.</p>
            <Button size="sm" className="w-full">
              Open Settings
            </Button>
          </div>
        )
      case "help":
        return (
          <div className="glass-card p-4 space-y-3">
            <h4 className="font-medium">Help & Support</h4>
            <p className="text-sm text-muted-foreground">Get help with using the dashboard.</p>
            <Button size="sm" className="w-full">
              View Help
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      {/* Sidebar Toggle Button */}
      <Button variant="outline" size="sm" onClick={onToggle} className="fixed top-20 left-4 z-40 glass bg-transparent">
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 bg-sidebar border-r border-sidebar-border glass transition-transform duration-300 z-30 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-sidebar-foreground mb-3 pl-15 font-bold">Utilities & Tools</h3>
            <nav className="space-y-1">
              {utilities.map((utility) => (
                <Button
                  key={utility.id}
                  variant={activeUtility === utility.id ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/10"
                  onClick={() => setActiveUtility(activeUtility === utility.id ? null : utility.id)}
                >
                  <utility.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{utility.label}</span>
                  {utility.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {utility.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </nav>
          </div>

          {/* Utility Content */}
          {activeUtility && <div className="space-y-3">{renderUtilityContent()}</div>}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden" onClick={onToggle} />}
    </>
  )
}
