"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, User, LogOut } from "lucide-react"
import { UserAvatar } from "@/components/ui/user-avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/useUser"

type TopBarProps = {
  title: string
  isNavExpanded: boolean
  onToggleNav: () => void
}

export function TopBar({ title, isNavExpanded, onToggleNav }: TopBarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()
  const { user, loading } = useUser()
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }


  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleNav}
          className="flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-100 p-1.5 transition-colors"
        >
          {isNavExpanded ? (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          )}
        </button>
        <h1 className="text-base font-medium text-gray-900">{title}</h1>
        {user?.name && (
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-1 ml-2 px-2 py-1 rounded hover:bg-gray-50 transition-colors"
          >
          
           
          </button>
        )}
      </div>

      <div className="flex items-center relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-1 transition-colors"
          disabled={loading}
        >
          <UserAvatar 
            user={user} 
            size="sm" 
            fallbackClassName="bg-cyan-500 text-white"
          />
          {user?.name && (
            <span className="text-sm font-medium text-gray-700 hidden md:block">
              {user.name}
            </span>
          )}
           {showUserMenu ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
        </button>

        {/* User Dropdown Menu */}
        {showUserMenu && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[160px]">
            <Link
              href="/profile"
              onClick={() => setShowUserMenu(false)}
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
