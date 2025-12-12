"use client"

import { useState } from "react"
import { Sidebar } from "@/components/chat/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"

type DashboardLayoutProps = {
  children: React.ReactNode
  title: string
  activeNav?: string
}

export function DashboardLayout({ children, title, activeNav = "home" }: DashboardLayoutProps) {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [currentNav, setCurrentNav] = useState(activeNav)

  return (
    <div className="flex h-dvh w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isExpanded={isNavExpanded}
        activeNav={currentNav}
        onNavChange={setCurrentNav}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <TopBar
          title={title}
          isNavExpanded={isNavExpanded}
          onToggleNav={() => setIsNavExpanded(!isNavExpanded)}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
