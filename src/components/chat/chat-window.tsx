"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, MoreVertical, Send, Smile, Paperclip, Mic, Phone, Video, Info } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Conversation } from "@/lib/chat-data"

type ChatWindowProps = {
  conversation: Conversation | null
  onSendMessage: (conversationId: string, content: string) => void
  onBack: () => void
  isMobile: boolean
}

export function ChatWindow({ conversation, onSendMessage, onBack, isMobile }: ChatWindowProps) {
  const [message, setMessage] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [conversation?.messages])

  const handleSend = () => {
    if (message.trim() && conversation) {
      onSendMessage(conversation.id, message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 text-6xl">💬</div>
          <h2 className="mb-2 text-2xl font-semibold text-foreground">Select a chat</h2>
          <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    )
  }

  const { participant, messages, isGroup, groupInfo } = conversation
  const displayName = isGroup ? groupInfo?.name || participant.name : participant.name
  const displayAvatar = isGroup ? groupInfo?.avatar : participant.avatar
  const memberCount = isGroup ? groupInfo?.members.length : undefined

  return (
    <div className="flex h-full flex-col" style={{ backgroundColor: '#F2FBFC' }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          <Avatar className="h-10 w-10">
            <AvatarImage src={displayAvatar || "/placeholder.svg"} alt={displayName} />
            <AvatarFallback className={isGroup ? "bg-cyan-500 text-white font-semibold" : ""}>
              {isGroup ? displayName.substring(0, 2).toUpperCase() : displayName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-card-foreground">{displayName}</p>
            <p className="text-xs text-muted-foreground">
              {isGroup 
                ? `${memberCount} members` 
                : participant.status === "online" ? "Online" : participant.lastSeen || "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
            <span className="sr-only">Voice call</span>
          </Button> */}
          {/* <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
            <span className="sr-only">Video call</span>
          </Button> */}
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
            <span className="sr-only">Info</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => {
            const isOwn = msg.senderId === "current-user"
            const senderMember = isGroup ? groupInfo?.members.find(m => m.id === msg.senderId) : null
            return (
              <div key={msg.id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
                {isGroup && !isOwn && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 shrink-0">
                    <AvatarImage src={senderMember?.avatar || "/placeholder.svg"} alt={msg.senderName || ""} />
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                      {msg.senderName?.[0] || "?"}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={cn("max-w-[70%] space-y-1", isOwn ? "items-end" : "items-start")}>
                  {isGroup && !isOwn && msg.senderName && (
                    <p className="text-xs font-medium text-cyan-600 px-1">{msg.senderName}</p>
                  )}
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2",
                      isOwn
                        ? "bg-primary text-primary-foreground"
                        : "bg-white text-foreground border-2 border-primary",
                    )}
                    style={isOwn ? { border: '2px solid white' } : undefined}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <div className="flex items-center gap-1 px-1">
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {isOwn && (
                      <span className="text-xs text-muted-foreground">
                        {msg.status === "read" ? "✓✓" : msg.status === "delivered" ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
            <span className="sr-only">Emoji</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach</span>
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          {message.trim() ? (
            <Button onClick={handleSend} size="icon">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          ) : (
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
              <span className="sr-only">Voice message</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
