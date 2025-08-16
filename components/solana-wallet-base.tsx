"use client"

import { useState, useEffect } from "react"
import { Connection, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import {
  Copy,
  ExternalLink,
  Wallet,
  Send,
  RefreshCw,
  Search,
  AlertCircle,
  TrendingUp,
  Coins,
  Activity,
} from "lucide-react"

const getProvider = () => {
  if (typeof window !== "undefined") {
    console.log("[v0] Checking for wallet providers...")

    // Check for Glow wallet first using correct detection method
    if ((window as any).glow) {
      console.log("[v0] Glow wallet detected via window.glow")
      toast.success("Glow wallet detected!")
      return (window as any).glow
    }

    // Check for standard solana object (Phantom)
    if ("solana" in window) {
      const provider = (window as any).solana
      console.log("[v0] Solana provider found:", { isPhantom: provider.isPhantom })

      if (provider.isPhantom) {
        console.log("[v0] Phantom wallet detected")
        toast.success("Phantom wallet detected!")
        return provider
      }
    }

    // Check for multiple providers
    if ((window as any).solana?.providers) {
      const providers = (window as any).solana.providers
      console.log("[v0] Multiple providers found:", providers)

      // Look for Phantom in providers array
      const phantomProvider = providers.find((p: any) => p.isPhantom)
      if (phantomProvider) {
        console.log("[v0] Phantom found in providers array")
        toast.success("Phantom wallet detected!")
        return phantomProvider
      }
    }

    console.log("[v0] Available window objects:", {
      hasGlow: !!(window as any).glow,
      hasSolana: !!(window as any).solana,
      solanaKeys: (window as any).solana ? Object.keys((window as any).solana) : [],
    })
  }

  console.log("[v0] No supported wallet found")
  return null
}

interface WalletTransaction {
  signature: string
  slot: number
  blockTime: number | null
}

interface TokenAccount {
  mint: string
  amount: string
  decimals: number
  uiAmount: number
}

interface AccountInfo {
  lamports: number
  owner: string
  executable: boolean
  rentEpoch: number
}

interface EnhancedTransaction {
  signature: string
  slot: number
  blockTime: number | null
  fee: number
  status: string
  type: string
}

export default function SolanaWalletBase() {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [manualAddress, setManualAddress] = useState<string>("")
  const [balance, setBalance] = useState<number>(0)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isManualMode, setIsManualMode] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sendAmount, setSendAmount] = useState<string>("")
  const [recipientAddress, setRecipientAddress] = useState<string>("")
  const [transactions, setTransactions] = useState<WalletTransaction[]>([])
  const [network] = useState<string>("devnet")
  const [walletProvider, setWalletProvider] = useState<any>(null)

  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null)
  const [tokenAccounts, setTokenAccounts] = useState<TokenAccount[]>([])
  const [enhancedTransactions, setEnhancedTransactions] = useState<EnhancedTransaction[]>([])
  const [totalTransactions, setTotalTransactions] = useState<number>(0)
  const [oldestTransaction, setOldestTransaction] = useState<number | null>(null)

  const connection = new Connection(
    network === "mainnet" ? "https://api.mainnet-beta.solana.com" : "https://api.devnet.solana.com",
    "confirmed",
  )

  useEffect(() => {
    const checkWalletConnection = async () => {
      const checkProvider = () => {
        const provider = getProvider()
        if (provider) {
          setWalletProvider(provider)
          return provider
        }
        return null
      }

      // Try immediately
      let provider = checkProvider()

      // If not found, wait and try again (wallet extensions need time to load)
      if (!provider) {
        console.log("[v0] Wallet not found immediately, waiting for extension to load...")
        setTimeout(() => {
          provider = checkProvider()
          if (provider) {
            setWalletProvider(provider)
            attemptAutoConnect(provider)
          }
        }, 3000)
      } else {
        attemptAutoConnect(provider)
      }
    }

    const attemptAutoConnect = async (provider: any) => {
      try {
        let response
        if ((window as any).glow && provider === (window as any).glow) {
          response = await provider.connect({ onlyIfTrusted: true })
        } else {
          response = await provider.connect({ onlyIfTrusted: true })
        }

        if (response.publicKey) {
          console.log("[v0] Wallet already connected:", response.publicKey.toString())
          setWalletAddress(response.publicKey.toString())
          setIsConnected(true)
          setIsManualMode(false)
          await getBalance(response.publicKey)
          await getTransactions(response.publicKey)
          toast.success("Wallet reconnected automatically!")
        }
      } catch (err) {
        console.log("[v0] Wallet not previously connected or user rejected auto-connect:", err)
      }
    }

    checkWalletConnection()
  }, [])

  const connectWallet = async () => {
    const provider = walletProvider || getProvider()
    if (!provider) {
      toast.error("No wallet extension detected. Please install Phantom or Glow wallet, or use manual mode.")
      return
    }

    try {
      setIsLoading(true)
      console.log("[v0] Attempting to connect wallet...")

      let resp
      if ((window as any).glow && provider === (window as any).glow) {
        console.log("[v0] Connecting to Glow wallet...")
        resp = await provider.connect()
      } else {
        console.log("[v0] Connecting to Phantom wallet...")
        resp = await provider.connect({ onlyIfTrusted: false })
      }

      console.log("[v0] Wallet connection response:", resp)

      if (resp.publicKey) {
        const address = resp.publicKey.toString()
        console.log("[v0] Connected to address:", address)
        setWalletAddress(address)
        setIsConnected(true)
        setIsManualMode(false)
        toast.success("Wallet connected successfully!")
        await getBalance(resp.publicKey)
        await getTransactions(resp.publicKey)
        await getTokenAccounts(resp.publicKey)
      } else {
        throw new Error("No public key received from wallet")
      }
    } catch (err: any) {
      console.error("[v0] Wallet connection failed:", err)
      if (err.code === 4001 || err.message?.includes("User rejected")) {
        toast.error("Connection rejected by user")
      } else {
        toast.error(`Wallet connection failed: ${err.message || "Unknown error"}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const lookupManualAddress = async () => {
    if (!manualAddress.trim()) {
      toast.error("Please enter a wallet address")
      return
    }

    try {
      setIsLoading(true)
      const publicKey = new PublicKey(manualAddress.trim())

      // Validate the address by trying to get balance
      const balance = await connection.getBalance(publicKey)

      setWalletAddress(manualAddress.trim())
      setBalance(balance / LAMPORTS_PER_SOL)
      setIsManualMode(true)
      setIsConnected(false) // Not connected to wallet, just viewing

      await getBalance(publicKey)
      await getTransactions(publicKey)
      await getTokenAccounts(publicKey)
      toast.success("Wallet address loaded successfully!")
    } catch (err: any) {
      console.error("[v0] Manual address lookup failed:", err)
      if (err.message?.includes("Invalid public key")) {
        toast.error("Invalid Solana address format")
      } else {
        toast.error(`Failed to lookup address: ${err.message || "Unknown error"}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = async () => {
    if (walletProvider && isConnected) {
      try {
        await walletProvider.disconnect()
        toast.success("Wallet disconnected")
      } catch (err) {
        console.error("[v0] Disconnect failed:", err)
      }
    }

    // Reset all state
    setWalletAddress("")
    setManualAddress("")
    setBalance(0)
    setIsConnected(false)
    setIsManualMode(false)
    setTransactions([])
    setAccountInfo(null)
    setTokenAccounts([])
    setEnhancedTransactions([])
    setTotalTransactions(0)
    setOldestTransaction(null)
    if (isManualMode) {
      toast.success("Manual mode cleared")
    }
  }

  const getBalance = async (publicKey: PublicKey) => {
    try {
      const balance = await connection.getBalance(publicKey)
      setBalance(balance / LAMPORTS_PER_SOL)

      // Get detailed account info
      const accountInfo = await connection.getAccountInfo(publicKey)
      if (accountInfo) {
        setAccountInfo({
          lamports: accountInfo.lamports,
          owner: accountInfo.owner.toString(),
          executable: accountInfo.executable,
          rentEpoch: accountInfo.rentEpoch,
        })
      }
    } catch (err) {
      console.error("[v0] Failed to get balance:", err)
      toast.error("Failed to fetch balance")
    }
  }

  const getTokenAccounts = async (publicKey: PublicKey) => {
    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      })

      const tokens: TokenAccount[] = tokenAccounts.value
        .map((account) => {
          const info = account.account.data.parsed.info
          return {
            mint: info.mint,
            amount: info.tokenAmount.amount,
            decimals: info.tokenAmount.decimals,
            uiAmount: info.tokenAmount.uiAmount || 0,
          }
        })
        .filter((token) => token.uiAmount > 0)

      setTokenAccounts(tokens)
    } catch (err) {
      console.error("[v0] Failed to get token accounts:", err)
    }
  }

  const getTransactions = async (publicKey: PublicKey) => {
    try {
      const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 20 })
      setTransactions(signatures)
      setTotalTransactions(signatures.length)

      if (signatures.length > 0) {
        setOldestTransaction(signatures[signatures.length - 1].blockTime)
      }

      // Get detailed transaction info for recent transactions
      const detailedTxs: EnhancedTransaction[] = []
      for (const sig of signatures.slice(0, 10)) {
        try {
          const tx = await connection.getParsedTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0,
          })

          if (tx) {
            detailedTxs.push({
              signature: sig.signature,
              slot: sig.slot,
              blockTime: sig.blockTime,
              fee: tx.meta?.fee || 0,
              status: tx.meta?.err ? "Failed" : "Success",
              type: tx.transaction.message.instructions[0]?.programId
                .toString()
                .includes("11111111111111111111111111111111")
                ? "Transfer"
                : "Program",
            })
          }
        } catch (err) {
          console.error(`[v0] Failed to get transaction details for ${sig.signature}:`, err)
        }
      }

      setEnhancedTransactions(detailedTxs)
    } catch (err) {
      console.error("[v0] Failed to get transactions:", err)
      toast.error("Failed to fetch transactions")
    }
  }

  const sendSOL = async () => {
    if (!walletAddress || !sendAmount || !recipientAddress) {
      toast.error("Please fill in all fields")
      return
    }

    if (isManualMode) {
      toast.error("Sending SOL requires wallet connection, not available in manual mode")
      return
    }

    const provider = walletProvider || getProvider()
    if (!provider) {
      toast.error("No wallet connection available")
      return
    }

    try {
      setIsLoading(true)
      console.log("[v0] Preparing transaction...")

      const fromPubkey = new PublicKey(walletAddress)
      const toPubkey = new PublicKey(recipientAddress)
      const lamports = Number.parseFloat(sendAmount) * LAMPORTS_PER_SOL

      if (lamports <= 0) {
        toast.error("Amount must be greater than 0")
        return
      }

      if (lamports > balance * LAMPORTS_PER_SOL) {
        toast.error("Insufficient balance")
        return
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports,
        }),
      )

      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = fromPubkey

      console.log("[v0] Requesting transaction signature...")
      const signedTransaction = await provider.signTransaction(transaction)

      console.log("[v0] Sending transaction...")
      const signature = await connection.sendRawTransaction(signedTransaction.serialize())

      console.log("[v0] Transaction sent, confirming...")
      await connection.confirmTransaction(signature)

      toast.success(`Transaction sent successfully! Signature: ${signature.slice(0, 8)}...`)
      setSendAmount("")
      setRecipientAddress("")
      await getBalance(fromPubkey)
      await getTransactions(fromPubkey)
    } catch (err: any) {
      console.error("[v0] Send transaction failed:", err)
      if (err.message?.includes("Invalid public key")) {
        toast.error("Invalid recipient address")
      } else if (err.message?.includes("insufficient")) {
        toast.error("Insufficient balance for transaction")
      } else {
        toast.error(`Transaction failed: ${err.message || "Unknown error"}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    toast.success("Address copied to clipboard!")
  }

  const refreshData = async () => {
    if (!walletAddress) return

    try {
      setIsLoading(true)
      const publicKey = new PublicKey(walletAddress)
      await getBalance(publicKey)
      await getTransactions(publicKey)
      if (isManualMode) {
        await getTokenAccounts(publicKey)
      }
      toast.success("Data refreshed")
    } catch (err) {
      console.error("[v0] Refresh failed:", err)
      toast.error("Failed to refresh data")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Solana Web3 Wallet
            </CardTitle>
            <CardDescription className="text-gray-300">
              Connect your wallet or enter an address manually to explore
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Wallet Connection */}
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Wallet className="h-5 w-5" />
              Wallet Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!walletAddress ? (
              <Tabs defaultValue="connect" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/5">
                  <TabsTrigger value="connect" className="data-[state=active]:bg-purple-600">
                    Connect Wallet
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="data-[state=active]:bg-purple-600">
                    Manual Address
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="connect" className="space-y-4">
                  <div className="text-center space-y-4">
                    {!walletProvider && (
                      <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-yellow-200">
                          No wallet extension detected. Install Phantom or Glow wallet.
                        </span>
                      </div>
                    )}
                    <Button
                      onClick={connectWallet}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {isLoading ? "Connecting..." : "Connect Wallet"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="manual-address" className="text-gray-300">
                        Solana Wallet Address
                      </Label>
                      <Input
                        id="manual-address"
                        value={manualAddress}
                        onChange={(e) => setManualAddress(e.target.value)}
                        placeholder="Enter Solana address (e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU)"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <Button
                      onClick={lookupManualAddress}
                      disabled={isLoading || !manualAddress.trim()}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      {isLoading ? "Looking up..." : "Lookup Address"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-300">
                      {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {isManualMode ? "Manual Mode (Read-only)" : isConnected ? "Connected" : "Viewing"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={copyAddress}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={refreshData} disabled={isLoading}>
                      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-gray-300 flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        Balance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-white">{balance.toFixed(4)} SOL</p>
                      <p className="text-xs text-gray-400">≈ ${(balance * 100).toFixed(2)} USD</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-gray-300 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-white">{totalTransactions}</p>
                      <p className="text-xs text-gray-400">
                        {oldestTransaction
                          ? `Since ${new Date(oldestTransaction * 1000).toLocaleDateString()}`
                          : "Recent activity"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-gray-300 flex items-center gap-2">
                        <Coins className="h-4 w-4" />
                        Tokens
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-white">{tokenAccounts.length}</p>
                      <p className="text-xs text-gray-400">SPL Token types</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Account Details */}
                {accountInfo && (
                  <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Address:</span>
                          <p className="text-white font-mono break-all">{walletAddress}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Owner Program:</span>
                          <p className="text-white font-mono">{accountInfo.owner.slice(0, 20)}...</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Rent Epoch:</span>
                          <p className="text-white">{accountInfo.rentEpoch}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Executable:</span>
                          <p className="text-white">{accountInfo.executable ? "Yes" : "No"}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={copyAddress}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy Address
                        </Button>
                        <Button size="sm" variant="ghost" onClick={refreshData} disabled={isLoading}>
                          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
                          Refresh
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Token Holdings */}
                {tokenAccounts.length > 0 && (
                  <Card className="bg-black/20 backdrop-blur-xl border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Coins className="h-5 w-5" />
                        Token Holdings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {tokenAccounts.map((token, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div className="flex flex-col">
                              <span className="text-sm text-white font-medium">
                                {token.uiAmount.toFixed(token.decimals > 6 ? 6 : token.decimals)} tokens
                              </span>
                              <span className="text-xs text-gray-400 font-mono">
                                {token.mint.slice(0, 8)}...{token.mint.slice(-8)}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                window.open(
                                  `https://explorer.solana.com/address/${token.mint}?cluster=${network}`,
                                  "_blank",
                                )
                              }
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Send SOL */}
        {walletAddress && (
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Send className="h-5 w-5" />
                Send SOL
                {isManualMode && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                    Requires Wallet Connection
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipient" className="text-gray-300">
                  Recipient Address
                </Label>
                <Input
                  id="recipient"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter Solana address"
                  className="bg-white/5 border-white/10 text-white"
                  disabled={isManualMode}
                />
              </div>
              <div>
                <Label htmlFor="amount" className="text-gray-300">
                  Amount (SOL)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.0"
                  className="bg-white/5 border-white/10 text-white"
                  disabled={isManualMode}
                />
              </div>
              <Button
                onClick={sendSOL}
                disabled={isLoading || !sendAmount || !recipientAddress || isManualMode}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {isLoading ? "Sending..." : "Send SOL"}
              </Button>
            </CardContent>
          </Card>
        )}

        {walletAddress && enhancedTransactions.length > 0 && (
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {enhancedTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300 font-mono">
                          {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            tx.status === "Success" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {tx.status}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-300">{tx.type}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">
                          {tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : "Pending"}
                        </span>
                        <span className="text-xs text-gray-500">Fee: {(tx.fee / LAMPORTS_PER_SOL).toFixed(6)} SOL</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        window.open(`https://explorer.solana.com/tx/${tx.signature}?cluster=${network}`, "_blank")
                      }
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
