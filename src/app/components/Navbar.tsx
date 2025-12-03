'use client'

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "../context/ThemeContext"

export function Navbar() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  return (
    <header className="w-full">
      {/* Top bar with gradient animation and social icons */}
      <div className="h-12 bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-secondary)] to-[var(--theme-primary)] bg-[length:200%_100%] animate-gradient flex items-center justify-end px-6">
        <style jsx>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            animation: gradient 4s ease infinite;
          }
          :global(.nav-link-hover:hover) {
            color: var(--theme-primary) !important;
          }
        `}</style>

        <div className="flex items-center gap-6">
          {/* Theme Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme('blue')}
              className={`w-7 h-7 rounded-full bg-blue-600 hover:scale-110 transition-transform duration-300 ${theme === 'blue' ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}`}
              title="Blue Theme"
            />
            <button
              onClick={() => setTheme('green')}
              className={`w-7 h-7 rounded-full bg-green-600 hover:scale-110 transition-transform duration-300 ${theme === 'green' ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}`}
              title="Green Theme"
            />
            <button
              onClick={() => setTheme('purple')}
              className={`w-7 h-7 rounded-full bg-purple-600 hover:scale-110 transition-transform duration-300 ${theme === 'purple' ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}`}
              title="Purple Theme"
            />
            <button
              onClick={() => setTheme('cyan')}
              className={`w-7 h-7 rounded-full hover:scale-110 transition-transform duration-300 ${theme === 'cyan' ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}`}
              style={{ backgroundColor: '#66E9FF' }}
              title="Cyan Theme"
            />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
          <a href="#" className="w-6 h-6 flex items-center justify-center text-white hover:text-cyan-400 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href="#" className="w-6 h-6 flex items-center justify-center text-white hover:text-red-500 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
          </a>
          <a href="#" className="w-6 h-6 flex items-center justify-center text-white hover:text-blue-500 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a href="#" className="w-6 h-6 flex items-center justify-center text-white hover:text-pink-500 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
        </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and text section */}
          <div className="flex items-center gap-4">
            <Image src="/images/logo.png" alt="KVS Logo" width={70} height={70} className="object-contain" />
            <div className="flex flex-col">
              <span className="text-lg font-medium" style={{ color: 'var(--theme-primary)' }}>केन्द्रीय विद्यालय संगठन</span>
              <span className="text-xl font-semibold" style={{ color: 'var(--theme-primary)' }}>Kendriya Vidyalaya Sangathan</span>
              <span className="text-[#555] text-sm">
                An Autonomous Body Under Ministry of Education, Government of India
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link 
              href="/" 
              className="text-black font-medium hover:scale-105 transition-all duration-300 cursor-pointer nav-link-hover"
            >
              Home
            </Link>
            <Link 
              href="/member" 
              className="text-black font-medium hover:scale-105 transition-all duration-300 cursor-pointer nav-link-hover"
            >
              Member
            </Link>
            <Link 
              href="/events" 
              className="text-black font-medium hover:scale-105 transition-all duration-300 cursor-pointer nav-link-hover"
            >
              Events
            </Link>
            <Link 
              href="/alumni-news" 
              className="text-black font-medium hover:scale-105 transition-all duration-300 cursor-pointer nav-link-hover"
            >
              Alumni in News
            </Link>
            <Link 
              href="/chat" 
              className="text-black font-medium hover:scale-105 transition-all duration-300 cursor-pointer nav-link-hover"
            >
              Chat
            </Link>
            {/* Login button */}
            <button
              onClick={() => router.push('/login')}
              className="flex items-center gap-1 border-2 text-white px-5 py-2 rounded-md hover:scale-105 hover:shadow-lg transition-all duration-300"
              style={{ borderColor: 'var(--theme-primary)', backgroundColor: 'var(--theme-primary)' }}
            >
              Login
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Register button */}
            <button
              onClick={() => router.push('/register')}
              className="flex items-center gap-1 border-2 text-white px-5 py-2 rounded-md hover:scale-105 hover:shadow-lg transition-all duration-300"
              style={{ borderColor: 'var(--theme-primary)', backgroundColor: 'var(--theme-primary)' }}
            >
              Register
              <ChevronDown className="w-4 h-4" />
            </button>


          </nav>
        </div>
      </div>
    </header>
  )
}
