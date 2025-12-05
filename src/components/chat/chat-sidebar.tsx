"use client"

import { useState } from "react"
import { Search, Home, MessageCircle, Calendar, Archive, Settings, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Conversation, User } from "@/lib/chat-data"

type ChatSidebarProps = {
  conversations: Conversation[]
  currentUser: User
  selectedConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewChat: () => void
  isNavExpanded: boolean
  onToggleNav: () => void
}

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) {
    return "now"
  } else if (minutes < 60) {
    return `${minutes}m`
  } else if (hours < 24) {
    return `${hours}h`
  } else {
    return `${days}d`
  }
}

export function ChatSidebar({
  conversations,
  currentUser,
  selectedConversationId,
  onSelectConversation,
  onNewChat,
  isNavExpanded,
  onToggleNav,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeNav, setActiveNav] = useState("chats")

  const filteredConversations = conversations.filter((conv) => {
    const searchName = conv.isGroup ? conv.groupInfo?.name || conv.participant.name : conv.participant.name
    return searchName.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "chats", icon: MessageCircle, label: "Chats" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "search", icon: Search, label: "Search" },
    { id: "archive", icon: Archive, label: "Archive" },
  ]

  return (
    <div className="flex h-full w-full bg-white overflow-hidden">
      {/* Left Navigation Bar */}
      <div className={cn(
        "flex shrink-0 flex-col items-center border-l-4 border-l-cyan-500 border-r border-gray-200 bg-white transition-all duration-300",
        isNavExpanded ? "w-48" : "w-16"
      )}>
        {/* KVS Logo */}
        <div className="flex items-center justify-center border-b border-gray-200 px-3 py-3.5">
          <div className={cn(
            "flex items-center gap-3",
            !isNavExpanded && "justify-center"
          )}>
            <img 
              src="/images/logo.png" 
              alt="KVS Logo" 
              className="h-10 w-10 shrink-0 object-contain"
            />
            {isNavExpanded && (
              <span className="font-semibold text-gray-900">KVS Alumni</span>
            )}
          </div>
        </div>
        
        <nav className="flex flex-col gap-2 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                  isActive ? "bg-cyan-50 text-cyan-600" : "text-gray-600 hover:bg-gray-50",
                  !isNavExpanded && "justify-center"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 shrink-0",
                  isActive && "text-cyan-500"
                )} />
                {isNavExpanded && (
                  <span className={cn(
                    "text-sm font-medium",
                    isActive && "text-cyan-600"
                  )}>
                    {item.label}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto px-3">
          <button
            onClick={() => setActiveNav("settings")}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
              activeNav === "settings" ? "bg-cyan-50 text-cyan-600" : "text-gray-600 hover:bg-gray-50",
              !isNavExpanded && "justify-center"
            )}
          >
            <Settings className={cn(
              "h-5 w-5 shrink-0",
              activeNav === "settings" && "text-cyan-500"
            )} />
            {isNavExpanded && (
              <span className={cn(
                "text-sm font-medium",
                activeNav === "settings" && "text-cyan-600"
              )}>
                Settings
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4">
          <div className="flex items-center gap-2">
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
            <span className="text-lg font-semibold text-gray-900">Chats</span>
          </div>
          <Button
            onClick={onNewChat}
            size="icon"
            className="h-9 w-9 rounded-full bg-cyan-500 text-white hover:bg-cyan-600"
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">New chat</span>
          </Button>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-gray-200 bg-gray-50 pl-10 pr-4 text-sm focus-visible:ring-cyan-500"
            />
          </div>
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1">
          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversationId === conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

function ConversationItem({
  conversation,
  isSelected,
  onClick,
}: {
  conversation: Conversation
  isSelected: boolean
  onClick: () => void
}) {
  const { participant, lastMessage, isGroup, groupInfo, unreadCount } = conversation
  const displayName = isGroup ? groupInfo?.name || participant.name : participant.name
  const displayAvatar = isGroup ? groupInfo?.avatar : participant.avatar
  const memberCount = isGroup ? groupInfo?.members.length : undefined

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50",
        isSelected && "bg-cyan-100/50",
      )}
    >
      <div className="relative shrink-0">
        <Avatar className="h-12 w-12">
          <AvatarImage src={displayAvatar || "/placeholder.svg"} alt={displayName} />
          <AvatarFallback className={cn(
            "text-white font-semibold",
            isGroup ? "bg-cyan-500" : "bg-gray-200 text-gray-600"
          )}>
            {isGroup ? displayName.substring(0, 2).toUpperCase() : displayName[0]}
          </AvatarFallback>
        </Avatar>
        {!isGroup && participant.status === "online" && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
        )}
        {isGroup && (
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-medium text-white border-2 border-white">
            {memberCount}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="truncate font-medium text-gray-900">{displayName}</span>
            {isGroup && (
              <span className="shrink-0 rounded bg-cyan-100 px-1.5 py-0.5 text-[10px] font-medium text-cyan-700">
                Group
              </span>
            )}
          </div>
          {lastMessage && (
            <span className="shrink-0 text-xs text-gray-500 ml-2">
              {formatTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm text-gray-600 flex-1 min-w-0">
            {isGroup && lastMessage?.senderName ? (
              <span>
                <span className="font-medium">{lastMessage.senderName.split(' ')[0]}:</span> {lastMessage.content}
              </span>
            ) : (
              lastMessage?.content || "No messages yet"
            )}
          </p>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500 px-1.5 text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
