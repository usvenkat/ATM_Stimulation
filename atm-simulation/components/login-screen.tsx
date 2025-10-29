"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface LoginScreenProps {
  onLogin: (username: string) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("")
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (!username.trim() || !pin.trim()) {
      setError("Please enter username and PIN")
      return
    }
    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setError("PIN must be 4 digits")
      return
    }
    setError("")
    onLogin(username)
  }

  return (
    <div className="w-full max-w-md">
      <Card className="bg-slate-800 border-slate-700 shadow-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-emerald-400 to-teal-400 p-3 rounded-lg mb-4">
              <svg className="w-8 h-8 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1C6.48 1 2 5.48 2 11v10h4v-10c0-3.32 2.68-6 6-6s6 2.68 6 6v10h4V11c0-5.52-4.48-10-10-10z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">ATM Simulator</h1>
            <p className="text-slate-400">Welcome back</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">PIN</label>
              <Input
                type="password"
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value.slice(0, 4))}
                maxLength={4}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Sign In
            </Button>
          </div>

          <p className="text-center text-slate-400 text-sm mt-6">Demo: Use any username and PIN (4 digits)</p>
        </div>
      </Card>
    </div>
  )
}
