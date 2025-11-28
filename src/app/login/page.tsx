"use client"

// import { LoginForm } from "@/components/login-form"
import { GraduationCap, Users, Calendar, Award } from "lucide-react"
import { Design1Globe } from "./designGlobe"
import { LoginForm } from "./loginPage"

export default function LoginPage() {

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - 3D Hero Section */}
      <div className="relative lg:w-1/2 min-h-[50vh] lg:min-h-screen overflow-hidden">
        <Design1Globe />

        {/* Overlay content */}
        <div className="absolute inset-0 z-10 p-8 lg:p-12 flex flex-col justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#01C3E5] flex items-center justify-center shadow-lg shadow-[#00D9FF]/30">
                <GraduationCap className="w-7 h-7 text-[#0a1628]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white tracking-tight">KVS Alumni Network</h1>
                <p className="text-sm text-white/70">Kendriya Vidyalaya Sangathan</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end pb-8 lg:pb-0 lg:justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight text-balance mb-6">
              Reconnect with
              <br />
              <span className="text-[#00D9FF]">your legacy</span>
            </h2>
            <p className="text-white/80 text-lg max-w-md leading-relaxed">
              Join thousands of alumni staying connected through events, mentorship, and career opportunities.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#00D9FF]/20 pointer-events-auto">
            <div className="text-center backdrop-blur-md bg-[#00D9FF]/5 border border-[#00D9FF]/20 rounded-xl p-3">
              <div className="flex justify-center mb-2">
                <Users className="w-5 h-5 text-[#00D9FF]" />
              </div>
              <p className="text-2xl font-semibold text-white">50K+</p>
              <p className="text-xs text-white/70">Active Alumni</p>
            </div>
            <div className="text-center backdrop-blur-md bg-[#00D9FF]/5 border border-[#00D9FF]/20 rounded-xl p-3">
              <div className="flex justify-center mb-2">
                <Calendar className="w-5 h-5 text-[#00D9FF]" />
              </div>
              <p className="text-2xl font-semibold text-white">200+</p>
              <p className="text-xs text-white/70">Events Yearly</p>
            </div>
            <div className="text-center backdrop-blur-md bg-[#00D9FF]/5 border border-[#00D9FF]/20 rounded-xl p-3">
              <div className="flex justify-center mb-2">
                <Award className="w-5 h-5 text-[#00D9FF]" />
              </div>
              <p className="text-2xl font-semibold text-white">61+</p>
              <p className="text-xs text-white/70">Years of Legacy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-background via-background to-[#00D9FF]/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00D9FF]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#01C3E5]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="w-full max-w-md relative z-10">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
