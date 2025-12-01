// "use client"

import { GraduationCap, Users, Calendar, Award } from "lucide-react"
import { Design1Globe } from "./designGlobe"
// import { LoginForm } from "./loginPage"
import { RegisterSection } from "./registerSection"

export default function Register() {

  return (
    <div className="min-h-screen bg-gradient-to-br">
      {/* Card Container */}
      <div className="w-full min-h-screen bg-white shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - 3D Hero Section */}
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

              {/* <div className="flex-1 flex flex-col justify-end pb-8 lg:pb-0 lg:justify-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight text-balance mb-6">
                  Reconnect with
                  <br />
                  <span className="text-[var(--theme-primary)]">your legacy</span>
                </h2>
                <p className="text-white/80 text-lg max-w-md leading-relaxed">
                  Join thousands of alumni staying connected through events, mentorship, and career opportunities.
                </p>
              </div>  */}

              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[var(--theme-primary)]/20 pointer-events-auto">
                <div className="text-center backdrop-blur-md bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/20 rounded-xl p-2">
                  <div className="flex justify-center mb-2">
                    <Users className="w-5 h-5 text-[var(--theme-primary)]" />
                  </div>
                  <p className="text-2xl font-semibold" style={{ color: 'var(--theme-primary)' }}>50K+</p>
                  <p className="text-xs text-white/70">Active Alumni</p>
                </div>
                <div className="text-center backdrop-blur-md bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/20 rounded-xl p-2">
                  <div className="flex justify-center mb-2">
                    <Calendar className="w-5 h-5 text-[var(--theme-primary)]" />
                  </div>
                  <p className="text-2xl font-semibold" style={{ color: 'var(--theme-primary)' }}>200+</p>
                  <p className="text-xs text-white/70">Events Yearly</p>
                </div>
                <div className="text-center backdrop-blur-md bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/20 rounded-xl p-2">
                  <div className="flex justify-center mb-2">
                    <Award className="w-5 h-5 text-[var(--theme-primary)]" />
                  </div>
                  <p className="text-2xl font-semibold" style={{ color: 'var(--theme-primary)' }}>61+</p>
                  <p className="text-xs text-white/70">Years of Legacy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-white relative overflow-hidden">
            <div className="w-full max-w-4xl relative z-10">
              <RegisterSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
