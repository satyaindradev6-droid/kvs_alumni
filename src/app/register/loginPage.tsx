"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 mb-2">
          <span className="text-xs font-medium text-[var(--theme-primary)]">KVS Alumni Portal</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          Welcome back
        </h2>
        <p className="text-muted-foreground text-base">Sign in to access your alumni portal and reconnect with your KVS family</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--theme-primary)]" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-card/50 backdrop-blur-sm border-border focus:border-[var(--theme-primary)] focus:ring-[var(--theme-primary)] transition-all duration-300 hover:border-[var(--theme-primary)]/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--theme-primary)]" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 bg-card/50 backdrop-blur-sm border-border focus:border-[var(--theme-primary)] focus:ring-[var(--theme-primary)] transition-all duration-300 hover:border-[var(--theme-primary)]/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[var(--theme-primary)] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              className="border-border data-[state=checked]:bg-[var(--theme-primary)] data-[state=checked]:border-[var(--theme-primary)]"
            />
            <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
              Remember me
            </Label>
          </div>
          <a href="#" className="text-sm font-medium text-[var(--theme-primary)] hover:text-[var(--theme-primary2)] transition-colors">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary2)] hover:from-[var(--theme-primary2)] hover:to-[var(--theme-primary)] text-[#0a1628] font-semibold text-base group shadow-lg shadow-[var(--theme-primary)]/30 hover:shadow-xl hover:shadow-[var(--theme-primary)]/40 transition-all duration-300 hover:scale-[1.02]"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing in...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Sign in
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </Button>
      </form>

      <div className="relative">
        {/* <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div> */}
        {/* <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
        </div> */}
      </div>

      {/* <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="h-12 border-border hover:bg-[var(--theme-primary)]/10 hover:border-[var(--theme-primary)] bg-card/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-12 border-border hover:bg-[var(--theme-primary)]/10 hover:border-[var(--theme-primary)] bg-card/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          LinkedIn
        </Button>
      </div> */}

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          {"Don't have an account? "}
          <a href="#" className="font-semibold text-[var(--theme-primary)] hover:text-[var(--theme-primary2)] transition-colors underline-offset-4 hover:underline">
            Register as Alumni
          </a>
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/20">
          <svg className="w-4 h-4 text-[var(--theme-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs text-muted-foreground">Secure login powered by KVS</span>
        </div>
      </div>

      <div className="pt-6 border-t border-border/50">
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-[var(--theme-primary)] transition-colors hover:underline underline-offset-4">
            Privacy Policy
          </a>
          <span className="text-border">•</span>
          <a href="#" className="hover:text-[var(--theme-primary)] transition-colors hover:underline underline-offset-4">
            Terms of Service
          </a>
          <span className="text-border">•</span>
          <a href="#" className="hover:text-[var(--theme-primary)] transition-colors hover:underline underline-offset-4">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
