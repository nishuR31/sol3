"use client"

import { useState, useEffect } from "react"
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { WalletInfoCard } from "./wallet-info-card"
import { NetworkSelector } from "./network-selector"
import { TransactionHistory } from "./transaction-history"
import { SendSolForm } from "./send-sol-form"

type Network = "devnet" | "testnet" | "mainnet-beta"

interface WalletState {
  connected: boolean
  publicKey: PublicKey | null
  balance: number
  network: Network
}

export function SolanaWalletDashboard() {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    publicKey: null,
    balance: 0,
    network: "devnet",
  })
  const [loading, setLoading] = useState(false)
  const [connection, setConnection] = useState<Connection>()
  const { toast } = useToast()

  useEffect(() => {
    const conn = new Connection(clusterApiUrl(wallet.network))
    setConnection(conn)
  }, [wallet.network])

  const connectWallet = async () => {
    try {
      setLoading(true)
      const { solana } = window as any

      if (!solana?.isPhantom) {
        toast({
          title: "Phantom Wallet Not Found",
          description: "Please install Phantom wallet to continue.",
          variant: "destructive",
        })
        return
      }

      const response = await solana.connect()
      const publicKey = new PublicKey(response.publicKey.toString())

      setWallet((prev) => ({
        ...prev,
        connected: true,
        publicKey,
      }))

      await refreshBalance(publicKey)

      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Phantom wallet!",
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const disconnectWallet = () => {
    setWallet({
      connected: false,
      publicKey: null,
      balance: 0,
      network: wallet.network,
    })
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet.",
    })
  }

  const refreshBalance = async (publicKey?: PublicKey) => {
    if (!connection || (!publicKey && !wallet.publicKey)) return

    try {
      setLoading(true)
      const key = publicKey || wallet.publicKey!
      const balance = await connection.getBalance(key)

      setWallet((prev) => ({
        ...prev,
        balance: balance / LAMPORTS_PER_SOL,
      }))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch balance.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const requestAirdrop = async () => {
    if (!connection || !wallet.publicKey || wallet.network === "mainnet-beta") return

    try {
      setLoading(true)
      const signature = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL)
      await connection.confirmTransaction(signature)

      await refreshBalance()

      toast({
        title: "Airdrop Successful",
        description: (
          <div className="flex items-center gap-2">
            <span>Received 1 SOL!</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                window.open(`https://explorer.solana.com/tx/${signature}?cluster=${wallet.network}`, "_blank")
              }
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        ),
      })
    } catch (error) {
      toast({
        title: "Airdrop Failed",
        description: "Failed to request airdrop. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyAddress = () => {
    if (wallet.publicKey) {
      navigator.clipboard.writeText(wallet.publicKey.toString())
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard!",
      })
    }
  }

  const handleNetworkChange = (network: Network) => {
    setWallet((prev) => ({ ...prev, network }))
    if (wallet.connected && wallet.publicKey) {
      refreshBalance()
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Solana Web3 Dashboard
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Connect your Phantom wallet to manage your Solana assets, send transactions, and explore the blockchain.
        </p>
      </div>

      {/* Network Selector */}
      <div className="flex justify-center">
        <NetworkSelector currentNetwork={wallet.network} onNetworkChange={handleNetworkChange} />
      </div>

      {/* Connection Card */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Wallet className="h-5 w-5" />
            Wallet Connection
          </CardTitle>
          <CardDescription>
            {wallet.connected ? "Connected to Phantom Wallet" : "Connect your Phantom wallet to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!wallet.connected ? (
            <Button
              onClick={connectWallet}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {loading ? "Connecting..." : "Connect Phantom Wallet"}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Connected
                </Badge>
                <Button variant="outline" size="sm" onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg">
                <code className="text-sm text-slate-300 flex-1 truncate">{wallet.publicKey?.toString()}</code>
                <Button variant="ghost" size="sm" onClick={copyAddress}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wallet Info and Actions */}
      {wallet.connected && wallet.publicKey && (
        <div className="grid gap-6 md:grid-cols-2">
          <WalletInfoCard
            balance={wallet.balance}
            publicKey={wallet.publicKey}
            network={wallet.network}
            onRefresh={() => refreshBalance()}
            onAirdrop={requestAirdrop}
            loading={loading}
          />

          <SendSolForm
            connection={connection}
            publicKey={wallet.publicKey}
            network={wallet.network}
            onSuccess={() => refreshBalance()}
          />
        </div>
      )}

      {/* Transaction History */}
      {wallet.connected && wallet.publicKey && connection && (
        <TransactionHistory connection={connection} publicKey={wallet.publicKey} network={wallet.network} />
      )}
    </div>
  )
}
