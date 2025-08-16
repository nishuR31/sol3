"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Wallet, Home, BarChart3 } from "lucide-react"

interface HeaderProps {
  wallet?: { publicKey: { toString: () => string } } | null
  onConnectWallet?: () => void
  onDisconnectWallet?: () => void
  isLoading?: boolean
}

export function Header({ wallet, onConnectWallet, onDisconnectWallet, isLoading }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/20">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sol3
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Wallet Connection */}
        <div className="flex items-center gap-4">
          {wallet ? (
            <div className="hidden sm:flex items-center gap-3">
              <Badge variant="outline" className="glass">
                Connected
              </Badge>
              <Button onClick={onDisconnectWallet} variant="destructive" size="sm">
                Disconnect
              </Button>
            </div>
          ) : (
            <Button onClick={onConnectWallet} disabled={isLoading} size="sm">
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 glass">
          <nav className="container py-4 px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            {wallet && (
              <div className="pt-2 border-t border-border/40">
                <Button onClick={onDisconnectWallet} variant="destructive" size="sm" className="w-full">
                  Disconnect Wallet
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
