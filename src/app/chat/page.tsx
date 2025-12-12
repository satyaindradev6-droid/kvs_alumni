"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/chat/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { ChatWindow } from "@/components/chat/chat-window"
import { NewChatModal } from "@/components/chat/new-chat-modal"
import { ChatList } from "@/components/chat/chat-list"
import { useMediaQuery } from "@/hooks/use-media-query"
import { users, initialConversations, type Conversation, type Message, type User } from "@/lib/chat-data"
import { cn } from "@/lib/utils"

export default function ChatApp() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [activeNav, setActiveNav] = useState("chats")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId) || null

  const handleSelectConversation = useCallback((id: string) => {
    setSelectedConversationId(id)
    setConversations((prev) => prev.map((conv) => (conv.id === id ? { ...conv, unreadCount: 0 } : conv)))
  }, [])

  const handleSendMessage = useCallback((conversationId: string, content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      senderId: "current-user",
      timestamp: new Date(),
      status: "sent",
      type: "text",
    }

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return { ...conv, messages: [...conv.messages, newMessage], lastMessage: newMessage }
        }
        return conv
      })
    )

    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: conv.messages.map((msg) =>
                msg.id === newMessage.id ? { ...msg, status: "delivered" as const } : msg
              ),
              lastMessage:
                conv.lastMessage?.id === newMessage.id
                  ? { ...conv.lastMessage, status: "delivered" as const }
                  : conv.lastMessage,
            }
          }
          return conv
        })
      )
    }, 1000)
  }, [])

  const handleNewChat = useCallback(() => {
    setIsNewChatOpen(true)
  }, [])

  const handleSelectNewChatUser = useCallback(
    (user: User) => {
      const existingConv = conversations.find((c) => c.participant.id === user.id)
      if (existingConv) {
        setSelectedConversationId(existingConv.id)
        return
      }

      const newConversation: Conversation = {
        id: `conv-${Date.now()}`,
        participant: user,
        messages: [],
        unreadCount: 0,
        isPinned: false,
        isMuted: false,
      }

      setConversations((prev) => [newConversation, ...prev])
      setSelectedConversationId(newConversation.id)
    },
    [conversations]
  )

  const handleBack = useCallback(() => {
    setSelectedConversationId(null)
  }, [])

  return (
    <div className="flex h-dvh w-full bg-gray-50 overflow-hidden">
      {/* Main Sidebar */}
      <Sidebar isExpanded={isNavExpanded} activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <TopBar title="Chat" isNavExpanded={isNavExpanded} onToggleNav={() => setIsNavExpanded(!isNavExpanded)} />

        {/* Chat Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat List */}
          <div
            className={cn(
              "h-full shrink-0 border-r border-gray-200 bg-white transition-all duration-300",
              isMobile ? "w-full" : "w-[320px]",
              isMobile && selectedConversationId && "hidden"
            )}
          >
            <ChatList
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              onSelectConversation={handleSelectConversation}
              onNewChat={handleNewChat}
            />
          </div>

          {/* Chat Window */}
          <div
            className={cn("h-full flex-1 min-w-0 transition-all duration-300", isMobile && !selectedConversationId && "hidden")}
            style={{ backgroundColor: "#00AECD0D" }}
          >
            <ChatWindow conversation={selectedConversation} onSendMessage={handleSendMessage} onBack={handleBack} isMobile={isMobile} />
          </div>
        </div>
      </div>

      {/* New Chat Modal */}
      <NewChatModal isOpen={isNewChatOpen} onClose={() => setIsNewChatOpen(false)} users={users} onSelectUser={handleSelectNewChatUser} />
    </div>
  )
}
