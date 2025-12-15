'use client'

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Design1Globe } from "../register/designGlobe"
import { Mail, Lock, GraduationCap, Users, Calendar, Award, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import MainLayout from "../MainLayout"

function LoginContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"student" | "employee">("student")
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [error, setError] = useState("")

  // Read tab from URL on mount
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "employee") {
      setUserType("employee")
    }
  }, [searchParams])

  // Update URL when tab changes
  const handleTabChange = (type: "student" | "employee") => {
    setUserType(type)
    if (type === "employee") {
      router.push("/login?tab=employee", { scroll: false })
    } else {
      router.push("/login", { scroll: false })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_URL}/api/alumni/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, type: userType }),
      })

      const data = await response.json()

      if (response.ok) {
        // Log full response for debugging
        console.log('Login response:', JSON.stringify(data, null, 2))
        
        // Handle nested alumni object from API response
        const alumni = data.alumni || {}
        
        // Extract user data - check alumni object first, then root data
        const userId = alumni.alumniId ?? alumni.alumni_id ?? alumni.id ?? data.alumniId ?? data.alumni_id ?? data.id
        const userEmail = alumni.emailId ?? alumni.email_id ?? alumni.email ?? data.emailId ?? data.email_id ?? data.email
        const userName = alumni.name ?? data.name
        const userToken = alumni.token ?? data.token ?? ''
        
        console.log('Extracted values:', { userId, userEmail, userName, userToken: userToken ? 'exists' : 'missing' })
        
        localStorage.setItem('token', userToken)
        localStorage.setItem('user', JSON.stringify({
          id: userId,
          email: userEmail,
          name: userName,
          type: userType,
        }))
        console.log('Stored user:', { id: userId, email: userEmail, name: userName, type: userType })

        // Fetch full user profile using the alumniId
        if (userId) {
          try {
            const profileResponse = await fetch(`${API_URL}/api/alumni/${userId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
              },
            })
            const profileData = await profileResponse.json()
            console.log('User profile API response:', profileData)
            
            // Store full profile in localStorage
            if (profileResponse.ok) {
              const fullProfile = profileData.alumni || profileData
              localStorage.setItem('userProfile', JSON.stringify(fullProfile))
              console.log('Full user profile stored:', fullProfile)
            }
          } catch (profileErr) {
            console.error('Error fetching profile:', profileErr)
          }
        }

        // Show success toast
        setShowToast(true)

        // Redirect after 1.5 seconds
        setTimeout(() => {
          window.location.href = '/home'
        }, 1500)
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Login error:', err)
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

              {/* User Type Tabs */}
              <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => handleTabChange("student")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                    userType === "student"
                      ? "bg-[var(--theme-primary)] text-white shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Alumni
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange("employee")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                    userType === "employee"
                      ? "bg-[var(--theme-primary)] text-white shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Ex-Employee
                </button>
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
                      placeholder="Email"
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
                      placeholder="Password"
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

                {/* Forgot Password */}
                <div className="text-right">
                  <Link href="/forgot-password" className="text-gray-400 hover:text-[var(--theme-primary)] transition-colors text-base">
                    Forgot your password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary2)] text-white font-semibold py-3 text-base rounded-xl transition-colors shadow-lg shadow-[var(--theme-primary)]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Logging in...' : 'LOGIN'}
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

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Login Successful!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">Loading...</div>}>
       <MainLayout>
      <LoginContent />
       </ MainLayout>
    </Suspense>
  )
}
