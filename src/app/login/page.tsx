'use client'

import { useState } from "react"
import { Design1Globe } from "../register/designGlobe"
import { Mail, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { email, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br">
      {/* Card Container */}
      <div className="w-full min-h-screen bg-white shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - 3D Globe Section */}
          <div className="relative lg:w-1/2 min-h-[40vh] lg:min-h-[75vh] overflow-hidden">
            <Design1Globe />
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-white relative overflow-hidden">
            {/* Logo */}
            <div className="absolute top-8 right-8">
              <Image 
                src="/images/login/Air 1.svg"
                alt="Logo"
                width={120}
                height={120}
                className="opacity-80"
              />
            </div>

            <div className="w-full max-w-xl relative z-10">
              {/* Welcome Text */}
              <div className="text-center mb-8">
                <h1 className="text-5xl lg:text-6xl font-bold text-[var(--theme-primary)] mb-4">Welcome</h1>
                <p className="text-gray-500 text-lg lg:text-xl">Login with Email</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-[var(--theme-primary)] text-sm lg:text-base font-medium mb-2">
                    Email Id
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="thisuix@mail.com"
                      className="w-full pl-12 pr-4 py-4 text-base border-2 border-[var(--theme-primary)] rounded-xl focus:outline-none focus:border-[var(--theme-primary2)] transition-colors text-gray-700"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-[var(--theme-primary)] text-sm lg:text-base font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="****************"
                      className="w-full pl-12 pr-4 py-4 text-base border-2 border-[var(--theme-primary)] rounded-xl focus:outline-none focus:border-[var(--theme-primary2)] transition-colors text-gray-700"
                      required
                    />
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link href="/forgot-password" className="text-gray-400 hover:text-[var(--theme-primary)] transition-colors text-base">
                    Forgot your password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary2)] text-white font-semibold py-3 text-base rounded-xl transition-colors shadow-lg shadow-[var(--theme-primary)]/30"
                >
                  LOGIN
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-base">
                    <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
                  </div>
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-gray-600 text-sm lg:text-base">
                    Don't have account?{" "}
                    <Link href="/register" className="text-[var(--theme-primary)] hover:text-[var(--theme-primary2)] font-semibold transition-colors">
                      Register Now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
