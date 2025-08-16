"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Transaction {
  signature: string
  slot: number
  blockTime: number | null
  meta: {
    fee: number
    preBalances: number[]
    postBalances: number[]
    err: any
  } | null
}

interface TransactionHistoryProps {
  transactions: Transaction[]
  network: string
}

export function TransactionHistory({ transactions, network }: TransactionHistoryProps) {
  const formatTime = (timestamp: number | null) => {
    if (!timestamp) return "Unknown"
    return new Date(timestamp * 1000).toLocaleString()
  }

  const getTransactionType = (tx: Transaction) => {
    if (!tx.meta) return "unknown"
    const balanceChange = tx.meta.postBalances[0] - tx.meta.preBalances[0]
    return balanceChange > 0 ? "received" : "sent"
  }

  const getBalanceChange = (tx: Transaction) => {
    if (!tx.meta) return 0
    return (tx.meta.postBalances[0] - tx.meta.preBalances[0]) / 1e9
  }

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent/20">
          <Clock className="h-5 w-5 text-accent" />
        </div>
        <h3 className="font-semibold text-lg">Recent Transactions</h3>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No transactions found</p>
          ) : (
            transactions.map((tx) => {
              const type = getTransactionType(tx)
              const change = getBalanceChange(tx)

              return (
                <div
                  key={tx.signature}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        type === "received" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                      }`}
                    >
                      {type === "received" ? (
                        <ArrowDownLeft className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{type}</p>
                      <p className="text-sm text-muted-foreground">{formatTime(tx.blockTime)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`font-semibold ${change > 0 ? "text-accent" : "text-primary"}`}>
                        {change > 0 ? "+" : ""}
                        {change.toFixed(4)} SOL
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Fee: {tx.meta ? (tx.meta.fee / 1e9).toFixed(6) : "0"} SOL
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        window.open(`https://explorer.solana.com/tx/${tx.signature}?cluster=${network}`, "_blank")
                      }
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
