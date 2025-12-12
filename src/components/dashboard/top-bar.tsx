"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type TopBarProps = {
  title: string
  isNavExpanded: boolean
  onToggleNav: () => void
}

export function TopBar({ title, isNavExpanded, onToggleNav }: TopBarProps) {
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
      </div>

      <div className="flex items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/images/alumni/1.jpg" alt="User" />
          <AvatarFallback className="bg-cyan-500 text-white text-sm">U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
