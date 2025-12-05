"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function RegistrationSuccess() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-start justify-center m-5" style={{ backgroundColor: 'rgba(var(--theme-primary-rgb, 59, 130, 246), 0.1)' }}>
      {/* Card Container */}
      <div className="rounded-2xl shadow-2xl p-8 max-w-lg w-full" style={{ backgroundColor: 'var(--theme-primary)' }}>
        <div className="text-center">
          {/* Shield with Lock Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Shield SVG */}
              <svg
                className="w-24 h-24"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Shield shape - lighter shade */}
                <path
                  d="M50 5 L90 20 L90 50 C90 75 70 90 50 95 C30 90 10 75 10 50 L10 20 Z"
                  fill="rgba(255, 255, 255, 0.2)"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="2"
                />
                {/* Inner shield highlight */}
                <path
                  d="M50 15 L80 27 L80 50 C80 70 65 82 50 86 C35 82 20 70 20 50 L20 27 Z"
                  fill="rgba(255, 255, 255, 0.1)"
                />
              </svg>
              {/* Lock Icon */}
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--theme-primary2)' }}>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Thank You for Registering
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base text-white/90 mb-1 leading-relaxed">
            We are reviewing your details with the school administration.
          </p>
          <p className="text-sm md:text-base text-white/90 mb-8 leading-relaxed">
            You'll be notified by email/SMS as soon as your account is approved.
          </p>

          {/* Back to Home Button */}
          <Button
            onClick={() => router.push("/")}
            className="w-full py-4 text-sm font-semibold text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white/30 hover:bg-white/10"
            style={{ backgroundColor: 'var(--theme-primary2)' }}
          >
            BACK TO HOME PAGE
          </Button>

          {/* Footer Message */}
          <p className="text-white/80 mt-6 text-sm">
            Please be in Touch.
          </p>
        </div>
      </div>
    </div>
  )
}
