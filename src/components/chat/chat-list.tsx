"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Conversation } from "@/lib/chat-data"

type ChatListProps = {
  conversations: Conversation[]
  selectedConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewChat: () => void
}

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return "now"
  if (minutes < 60) return `${minutes}m`
  if (hours < 24) return `${hours}h`
  return `${days}d`
}

export function ChatList({ conversations, selectedConversationId, onSelectConversation, onNewChat }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conv) => {
    const searchName = conv.isGroup ? conv.groupInfo?.name || conv.participant.name : conv.participant.name
    return searchName.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <span className="text-base font-semibold text-gray-900">Chats</span>
        <Button onClick={onNewChat} size="icon" className="h-8 w-8 rounded-full bg-cyan-500 text-white hover:bg-cyan-600">
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
        isSelected && "bg-cyan-100/50"
      )}
    >
      <div className="relative shrink-0">
        <Avatar className="h-11 w-11">
          <AvatarImage src={displayAvatar || "/placeholder.svg"} alt={displayName} />
          <AvatarFallback className={cn("text-white font-semibold", isGroup ? "bg-cyan-500" : "bg-gray-200 text-gray-600")}>
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
              <span className="shrink-0 rounded bg-cyan-100 px-1.5 py-0.5 text-[10px] font-medium text-cyan-700">Group</span>
            )}
          </div>
          {lastMessage && <span className="shrink-0 text-xs text-gray-500 ml-2">{formatTime(lastMessage.timestamp)}</span>}
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm text-gray-600 flex-1 min-w-0">
            {isGroup && lastMessage?.senderName ? (
              <span>
                <span className="font-medium">{lastMessage.senderName.split(" ")[0]}:</span> {lastMessage.content}
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
