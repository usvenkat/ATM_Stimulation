"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ATMDisplay from "./atm-display"
import ATMKeypad from "./atm-keypad"
import TransactionHistory from "./transaction-history"

interface ATMInterfaceProps {
  username: string
  onLogout: () => void
}

export type Screen = "menu" | "withdraw" | "deposit" | "balance" | "history"
export type Transaction = {
  id: string
  type: "withdraw" | "deposit"
  amount: number
  timestamp: Date
}

export default function ATMInterface({ username, onLogout }: ATMInterfaceProps) {
  const [screen, setScreen] = useState<Screen>("menu")
  const [balance, setBalance] = useState(5000)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [inputAmount, setInputAmount] = useState("")
  const [message, setMessage] = useState("")

  const handleWithdraw = () => {
    const amount = Number.parseFloat(inputAmount)
    if (!amount || amount <= 0) {
      setMessage("Invalid amount")
      return
    }
    if (amount > balance) {
      setMessage("Insufficient funds")
      return
    }
    setBalance(balance - amount)
    setTransactions([
      {
        id: Date.now().toString(),
        type: "withdraw",
        amount,
        timestamp: new Date(),
      },
      ...transactions,
    ])
    setMessage(`Withdrawn: ₹${amount.toFixed(2)}`)
    setInputAmount("")
    setTimeout(() => setScreen("menu"), 2000)
  }

  const handleDeposit = () => {
    const amount = Number.parseFloat(inputAmount)
    if (!amount || amount <= 0) {
      setMessage("Invalid amount")
      return
    }
    setBalance(balance + amount)
    setTransactions([
      {
        id: Date.now().toString(),
        type: "deposit",
        amount,
        timestamp: new Date(),
      },
      ...transactions,
    ])
    setMessage(`Deposited: ₹${amount.toFixed(2)}`)
    setInputAmount("")
    setTimeout(() => setScreen("menu"), 2000)
  }

  return (
    <div className="w-full max-w-2xl">
      <Card className="bg-slate-800 border-slate-700 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          {/* Display Screen */}
          <div className="md:col-span-2">
            <ATMDisplay
              screen={screen}
              username={username}
              balance={balance}
              inputAmount={inputAmount}
              message={message}
              transactions={transactions}
            />
          </div>

          {/* Keypad */}
          <div className="flex flex-col gap-4">
            <ATMKeypad
              screen={screen}
              inputAmount={inputAmount}
              onNumberClick={(num) => {
                if (screen === "withdraw" || screen === "deposit") {
                  if (inputAmount.length < 10) {
                    setInputAmount(inputAmount + num)
                    setMessage("")
                  }
                }
              }}
              onClear={() => {
                setInputAmount("")
                setMessage("")
              }}
              onBackspace={() => {
                setInputAmount(inputAmount.slice(0, -1))
              }}
              onMenuClick={() => {
                setScreen("menu")
                setInputAmount("")
                setMessage("")
              }}
              onWithdrawClick={() => {
                if (screen === "withdraw") {
                  handleWithdraw()
                } else {
                  setScreen("withdraw")
                  setInputAmount("")
                  setMessage("")
                }
              }}
              onDepositClick={() => {
                if (screen === "deposit") {
                  handleDeposit()
                } else {
                  setScreen("deposit")
                  setInputAmount("")
                  setMessage("")
                }
              }}
              onBalanceClick={() => setScreen("balance")}
              onHistoryClick={() => setScreen("history")}
            />

            {/* Logout Button */}
            <Button
              onClick={onLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Transaction History Modal */}
        {screen === "history" && <TransactionHistory transactions={transactions} onClose={() => setScreen("menu")} />}
      </Card>
    </div>
  )
}
