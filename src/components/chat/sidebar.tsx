"use client"

import { useState } from "react"
import { Home, MessageCircle, Calendar, Search, Archive, Settings, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

type SidebarProps = {
  isExpanded: boolean
  activeNav: string
  onNavChange: (navId: string) => void
}

const navItems = [
  { id: "home", icon: Home, label: "Home", href: "/home" },
  { id: "chats", icon: MessageCircle, label: "Chats", href: "/chat" },
  { id: "calendar", icon: Calendar, label: "Calendar", href: "#" },
  { id: "search", icon: Search, label: "Search", href: "#" },
  { id: "archive", icon: Archive, label: "Archive", href: "#" },
]

export function Sidebar({ isExpanded, activeNav, onNavChange }: SidebarProps) {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }
  return (
    <div className={cn(
      "flex shrink-0 flex-col items-center border-l-4 border-l-cyan-500 border-r border-gray-200 bg-white transition-all duration-300",
      isExpanded ? "w-48" : "w-16"
    )}>
      {/* KVS Logo */}
      <div className="flex items-center justify-center border-b border-gray-200 px-3 py-3.5">
        <div className={cn(
          "flex items-center gap-3",
          !isExpanded && "justify-center"
        )}>
          <img 
            src="/images/logo.png" 
            alt="KVS Logo" 
            className="h-10 w-10 shrink-0 object-contain"
          />
          {isExpanded && (
            <span className="font-semibold text-gray-900">KVS Alumni</span>
          )}
        </div>
      </div>
      
      <nav className="flex flex-col gap-2 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeNav === item.id
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onNavChange(item.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                isActive ? "bg-cyan-50 text-cyan-600" : "text-gray-600 hover:bg-gray-50",
                !isExpanded && "justify-center"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 shrink-0",
                isActive && "text-cyan-500"
              )} />
              {isExpanded && (
                <span className={cn(
                  "text-sm font-medium",
                  isActive && "text-cyan-600"
                )}>
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-3 pb-4 relative">
        <button
          onClick={() => setShowSettingsMenu(!showSettingsMenu)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
            showSettingsMenu ? "bg-cyan-50 text-cyan-600" : "text-gray-600 hover:bg-gray-50",
            !isExpanded && "justify-center"
          )}
        >
          <Settings className={cn(
            "h-5 w-5 shrink-0",
            showSettingsMenu && "text-cyan-500"
          )} />
          {isExpanded && (
            <span className={cn(
              "text-sm font-medium",
              showSettingsMenu && "text-cyan-600"
            )}>
              Settings
            </span>
          )}
        </button>

        {/* Settings Dropdown Menu */}
        {showSettingsMenu && (
          <div className={cn(
            "absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50",
            isExpanded ? "left-0 right-0 mx-3" : "left-1/2 -translate-x-1/2 min-w-[140px]"
          )}>
            <Link
              href="/profile"
              onClick={() => setShowSettingsMenu(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
