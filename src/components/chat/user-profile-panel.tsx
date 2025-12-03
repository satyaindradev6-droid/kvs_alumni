"use client"

import { X, Bell, BellOff, Star, Trash2, Ban } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { Conversation } from "@/lib/chat-data"

type UserProfilePanelProps = {
  conversation: Conversation
  onClose: () => void
  onToggleMute: () => void
  onTogglePin: () => void
}

export function UserProfilePanel({ conversation, onClose, onToggleMute, onTogglePin }: UserProfilePanelProps) {
  const { participant, isMuted, isPinned } = conversation

  return (
    <div className="flex h-full flex-col border-l border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-semibold text-card-foreground">Contact Info</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {/* Profile Section */}
        <div className="flex flex-col items-center py-8">
          <Avatar className="h-32 w-32">
            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
            <AvatarFallback className="text-3xl">{participant.name[0]}</AvatarFallback>
          </Avatar>
          <h3 className="mt-4 text-xl font-semibold text-card-foreground">{participant.name}</h3>
          <p className="text-sm text-muted-foreground">
            {participant.status === "online"
              ? "Online"
              : participant.lastSeen
                ? `Last seen ${participant.lastSeen}`
                : "Offline"}
          </p>
        </div>

        <Separator />

        {/* About Section */}
        <div className="p-4">
          <p className="mb-1 text-xs text-muted-foreground">About</p>
          <p className="text-sm text-card-foreground">{participant.about || "No status"}</p>
        </div>

        <Separator />

        {/* Actions */}
        <div className="p-2">
          <button
            onClick={onToggleMute}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-accent"
          >
            {isMuted ? (
              <Bell className="h-5 w-5 text-muted-foreground" />
            ) : (
              <BellOff className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="text-card-foreground">{isMuted ? "Unmute notifications" : "Mute notifications"}</span>
          </button>
          <button
            onClick={onTogglePin}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-accent"
          >
            <Star className={`h-5 w-5 ${isPinned ? "fill-primary text-primary" : "text-muted-foreground"}`} />
            <span className="text-card-foreground">{isPinned ? "Unpin chat" : "Pin chat"}</span>
          </button>
        </div>

        <Separator />

        {/* Danger Zone */}
        <div className="p-2">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-destructive/10">
            <Trash2 className="h-5 w-5 text-destructive" />
            <span className="text-destructive">Delete chat</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-destructive/10">
            <Ban className="h-5 w-5 text-destructive" />
            <span className="text-destructive">Block {participant.name}</span>
          </button>
        </div>
      </ScrollArea>
    </div>
  )
}
