'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Design1Globe } from "../register/designGlobe"
import { Mail, ArrowLeft, GraduationCap, Users, Calendar, Award, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/alumni/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setShowToast(true)
      } else {
        setError(data.message || 'Failed to send reset email')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Forgot password error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br">
      {/* Card Container */}
      <div className="w-full min-h-screen bg-white shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - 3D Globe Section */}
          <div className="relative lg:w-1/2 min-h-[40vh] lg:min-h-[75vh] overflow-hidden">
            <Design1Globe />

            {/* Overlay content */}
            <div className="absolute inset-0 z-10 p-6 lg:p-8 flex flex-col justify-between pointer-events-none">
              <div className="pointer-events-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-primary2)] flex items-center justify-center shadow-lg shadow-[var(--theme-primary)]/30">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold tracking-tight" style={{ color: 'var(--theme-primary)' }}>KVS Alumni Network</h1>
                    <p className="text-sm" style={{ color: 'var(--theme-primary)', opacity: 0.7 }}>Kendriya Vidyalaya Sangathan</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[var(--theme-primary)]/20 pointer-events-auto">
                <div className="text-center backdrop-blur-md bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/20 rounded-xl p-2">
                  <div className="flex justify-center mb-2">
                    <Users className="w-5 h-5 text-[var(--theme-primary)]" />
                  </div>
                  <p className="text-2xl font-semibold" style={{ color: 'var(--theme-primary)' }}>50K+</p>
                  <p className="text-xs" style={{ color: 'var(--theme-primary)' }}>Active Alumni</p>
                </div>
                <div className="text-center backdrop-blur-md bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/20 rounded-xl p-2">
                  <div className="flex justify-center mb-2">
                    <Calendar className="w-5 h-5 text-[var(--theme-primary)]" />
                  </div>
                  <p className="text-2xl font-semibold" style={{ color: 'var(--theme-primary)' }}>200+</p>
                  <p className="text-xs" style={{ color: 'var(--theme-primary)' }}>Events Yearly</p>
                </div>
                <div className="text-center backdrop-blur-md bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/20 rounded-xl p-2">
                  <div className="flex justify-center mb-2">
                    <Award className="w-5 h-5 text-[var(--theme-primary)]" />
                  </div>
                  <p className="text-2xl font-semibold" style={{ color: 'var(--theme-primary)' }}>61+</p>
                  <p className="text-xs" style={{ color: 'var(--theme-primary)' }}>Years of Legacy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Forgot Password Form */}
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
              {/* Back Button */}
              <div className="mb-6">
                <Link 
                  href="/login" 
                  className="inline-flex items-center gap-2 text-[var(--theme-primary)] hover:text-[var(--theme-primary2)] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Login</span>
                </Link>
              </div>

              {!success ? (
                <>
                  {/* Welcome Text */}
                  <div className="text-center mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold text-[var(--theme-primary)] mb-4">Forgot Password?</h1>
                    <p className="text-gray-500 text-lg">Enter your email address and we'll send you a link to reset your password.</p>
                  </div>

                  {/* Forgot Password Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                      <label className="block text-[var(--theme-primary)] text-sm lg:text-base font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full pl-12 pr-4 py-4 text-base border-2 border-[var(--theme-primary)] rounded-xl focus:outline-none focus:border-[var(--theme-primary2)] transition-colors text-gray-700"
                          required
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary2)] text-white font-semibold py-4 text-base rounded-xl transition-colors shadow-lg shadow-[var(--theme-primary)]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
                    </button>
                  </form>
                </>
              ) : (
                <>
                  {/* Success Message */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-[var(--theme-primary)] mb-4">Check Your Email</h1>
                    <p className="text-gray-500 text-lg mb-6">
                      We've sent a password reset link to <span className="font-semibold text-[var(--theme-primary)]">{email}</span>
                    </p>
                    <p className="text-gray-400 text-sm mb-8">
                      Didn't receive the email? Check your spam folder or try again.
                    </p>
                    
                    <div className="space-y-4">
                      <Link 
                        href="/login"
                        className="block w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary2)] text-white font-semibold py-4 text-base rounded-xl transition-colors shadow-lg shadow-[var(--theme-primary)]/30 text-center"
                      >
                        Back to Login
                      </Link>
                      
                      <button
                        onClick={() => {
                          setSuccess(false)
                          setEmail("")
                          setError("")
                        }}
                        className="block w-full border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white font-semibold py-4 text-base rounded-xl transition-colors text-center"
                      >
                        Try Different Email
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Reset link sent successfully!</span>
          </div>
        </div>
      )}
    </div>
  )
}