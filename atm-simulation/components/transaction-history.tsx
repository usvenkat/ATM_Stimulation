"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Transaction } from "./atm-interface"

interface TransactionHistoryProps {
  transactions: Transaction[]
  onClose: () => void
}

export default function TransactionHistory({ transactions, onClose }: TransactionHistoryProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="bg-slate-800 border-slate-700 w-full max-w-md max-h-96 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Transaction History</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {transactions.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No transactions yet</p>
          ) : (
            transactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                <div>
                  <p className="text-white font-semibold capitalize">{tx.type}</p>
                  <p className="text-xs text-slate-400">{tx.timestamp.toLocaleString()}</p>
                </div>
                <p className={`text-lg font-bold ${tx.type === "withdraw" ? "text-red-400" : "text-emerald-400"}`}>
                  {tx.type === "withdraw" ? "-" : "+"}₹{tx.amount.toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-slate-700">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
