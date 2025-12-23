"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials, getProfileImageUrl } from "@/lib/avatar-utils"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  user?: {
    name?: string | null
    profile_image?: string | null
  } | null
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  fallbackClassName?: string
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10", 
  lg: "h-16 w-16",
  xl: "h-28 w-28"
}

const fallbackSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl", 
  xl: "text-2xl"
}

export function UserAvatar({ 
  user, 
  size = "md", 
  className, 
  fallbackClassName 
}: UserAvatarProps) {
  const profileImageUrl = getProfileImageUrl(user?.profile_image ?? null)
  const userInitials = getInitials(user?.name)

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={profileImageUrl || undefined} alt={user?.name || "User"} />
      <AvatarFallback 
        className={cn(
          "bg-indigo-100 text-indigo-700 font-semibold",
          fallbackSizeClasses[size],
          fallbackClassName
        )}
      >
        {userInitials}
      </AvatarFallback>
    </Avatar>
  )
}