"use client"

import { Card } from "@/components/ui/card"
import type { Screen, Transaction } from "./atm-interface"

interface ATMDisplayProps {
  screen: Screen
  username: string
  balance: number
  inputAmount: string
  message: string
  transactions: Transaction[]
}

export default function ATMDisplay({ screen, username, balance, inputAmount, message, transactions }: ATMDisplayProps) {
  return (
    <Card className="bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 aspect-video flex flex-col justify-between p-6 text-white font-mono">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-slate-400">WELCOME</p>
          <p className="text-lg font-bold text-emerald-400">{username}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">BALANCE</p>
          <p className="text-xl font-bold text-emerald-400">₹{balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {screen === "menu" && (
          <div className="text-center">
            <p className="text-sm text-slate-300 mb-2">SELECT TRANSACTION</p>
            <p className="text-xs text-slate-400">Use keypad to select</p>
          </div>
        )}

        {screen === "withdraw" && (
          <div className="text-center">
            <p className="text-sm text-slate-300 mb-2">WITHDRAW AMOUNT</p>
            <p className="text-3xl font-bold text-emerald-400 mb-2">₹{inputAmount || "0.00"}</p>
            <p className="text-xs text-slate-400">Enter amount and press OK</p>
          </div>
        )}

        {screen === "deposit" && (
          <div className="text-center">
            <p className="text-sm text-slate-300 mb-2">DEPOSIT AMOUNT</p>
            <p className="text-3xl font-bold text-emerald-400 mb-2">₹{inputAmount || "0.00"}</p>
            <p className="text-xs text-slate-400">Enter amount and press OK</p>
          </div>
        )}

        {screen === "balance" && (
          <div className="text-center">
            <p className="text-sm text-slate-300 mb-2">CURRENT BALANCE</p>
            <p className="text-4xl font-bold text-emerald-400">₹{balance.toFixed(2)}</p>
            <p className="text-xs text-slate-400 mt-2">Press MENU to continue</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-end">
        <div>
          {message && (
            <p
              className={`text-sm font-semibold ${
                message.includes("Insufficient") || message.includes("Invalid") ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
        <p className="text-xs text-slate-500">{new Date().toLocaleTimeString()}</p>
      </div>
    </Card>
  )
}
