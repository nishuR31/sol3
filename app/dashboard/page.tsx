"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import SolanaWalletBase from "@/components/solana-wallet-base"
import { Wallet } from "lucide-react"

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header onConnectWallet={() => {}} onDisconnectWallet={() => {}} isLoading={false} />

      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : ""} p-4 md:p-8`}>
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="p-3 rounded-xl bg-primary/20">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Wallet Dashboard
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Manage your Solana assets with comprehensive wallet tools and analytics.
            </p>
          </div>

          <SolanaWalletBase />
        </div>
      </main>

      <Footer />
    </div>
  )
}
