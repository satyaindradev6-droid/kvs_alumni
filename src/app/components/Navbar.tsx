'use client'

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navbar() {
  const router = useRouter()
  return (
    <header className="w-full">
      {/* Top dark blue bar */}
      <div className="h-4 bg-[#2c3e6e]" />

      {/* Main header */}
      <div className="bg-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and text section */}
          <div className="flex items-center gap-4">
            <Image src="/images/logo.png" alt="KVS Logo" width={70} height={70} className="object-contain" />
            <div className="flex flex-col">
              <span className="text-[#2c3e6e] text-lg font-medium">केन्द्रीय विद्यालय संगठन</span>
              <span className="text-[#2c3e6e] text-xl font-semibold">Kendriya Vidyalaya Sangathan</span>
              <span className="text-[#555] text-sm">
                An Autonomous Body Under Ministry of Education, Government of India
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link href="#" className="text-[#2c3e6e] font-medium hover:text-[#1a2a4e] transition-colors">
              Home
            </Link>
            <Link href="#" className="text-[#2c3e6e] font-medium hover:text-[#1a2a4e] transition-colors">
              Member
            </Link>
            <Link href="#" className="text-[#2c3e6e] font-medium hover:text-[#1a2a4e] transition-colors">
              Events
            </Link>
            <Link href="#" className="text-[#2c3e6e] font-medium hover:text-[#1a2a4e] transition-colors">
              Alumni in News
            </Link>

            {/* Register button */}
            <button className="flex items-center gap-1 bg-[#4a5a8a] text-white px-5 py-2 rounded-md hover:bg-[#3a4a7a] transition-colors">
              Register
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Login button */}
            <button 
              onClick={() => router.push('/login')}
              className="flex items-center gap-1 border-2 border-[#2c3e6e] text-[#2c3e6e] px-5 py-2 rounded-md hover:bg-[#f0f0f0] transition-colors"
            >
              Login
              <ChevronDown className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
