"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SendSolFormProps {
  onSendSol: (recipient: string, amount: number) => Promise<void>
  isLoading: boolean
}

export function SendSolForm({ onSendSol, isLoading }: SendSolFormProps) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recipient || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const amountNum = Number.parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    try {
      await onSendSol(recipient, amountNum)
      setRecipient("")
      setAmount("")
    } catch (error) {
      console.error("Send failed:", error)
    }
  }

  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/20">
          <Send className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">Send SOL</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            type="text"
            placeholder="Enter Solana address..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 font-mono text-sm"
          />
        </div>

        <div>
          <Label htmlFor="amount">Amount (SOL)</Label>
          <Input
            id="amount"
            type="number"
            step="0.0001"
            placeholder="0.0000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send SOL
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
