"use client"

import { Button } from "@/components/ui/button"
import type { Screen } from "./atm-interface"

interface ATMKeypadProps {
  screen: Screen
  inputAmount: string
  onNumberClick: (num: string) => void
  onClear: () => void
  onBackspace: () => void
  onMenuClick: () => void
  onWithdrawClick: () => void
  onDepositClick: () => void
  onBalanceClick: () => void
  onHistoryClick: () => void
}

export default function ATMKeypad({
  screen,
  inputAmount,
  onNumberClick,
  onClear,
  onBackspace,
  onMenuClick,
  onWithdrawClick,
  onDepositClick,
  onBalanceClick,
  onHistoryClick,
}: ATMKeypadProps) {
  const isInputScreen = screen === "withdraw" || screen === "deposit"

  return (
    <div className="space-y-2">
      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            onClick={() => onNumberClick(num.toString())}
            disabled={!isInputScreen}
            className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-all"
          >
            {num}
          </Button>
        ))}
      </div>

      {/* 0 and decimal */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          onClick={() => onNumberClick("0")}
          disabled={!isInputScreen}
          className="col-span-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-all"
        >
          0
        </Button>
        <Button
          onClick={() => onNumberClick(".")}
          disabled={!isInputScreen || inputAmount.includes(".")}
          className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-all"
        >
          .
        </Button>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={onClear}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          CLEAR
        </Button>
        <Button
          onClick={onBackspace}
          disabled={!isInputScreen}
          className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-all"
        >
          ← DEL
        </Button>
      </div>

      {/* Transaction Buttons */}
      <div className="space-y-2 pt-2 border-t border-slate-700">
        {screen === "menu" ? (
          <>
            <Button
              onClick={onWithdrawClick}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-2 rounded-lg transition-all"
            >
              WITHDRAW
            </Button>
            <Button
              onClick={onDepositClick}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 rounded-lg transition-all"
            >
              DEPOSIT
            </Button>
            <Button
              onClick={onBalanceClick}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 rounded-lg transition-all"
            >
              BALANCE
            </Button>
            <Button
              onClick={onHistoryClick}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 rounded-lg transition-all"
            >
              HISTORY
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={onWithdrawClick}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-2 rounded-lg transition-all"
            >
              OK
            </Button>
            <Button
              onClick={onMenuClick}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition-all"
            >
              MENU
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
