export type User = {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline"
  lastSeen?: string
  about?: string
}

export type Message = {
  id: string
  content: string
  senderId: string
  senderName?: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
  type: "text" | "image" | "file"
}

export type GroupInfo = {
  name: string
  avatar?: string
  description?: string
  members: User[]
  admins: string[]
  createdAt: Date
}

export type Conversation = {
  id: string
  participant: User
  messages: Message[]
  lastMessage?: Message
  unreadCount: number
  isPinned: boolean
  isMuted: boolean
  isGroup?: boolean
  groupInfo?: GroupInfo
}

export const currentUser: User = {
  id: "current-user",
  name: "You",
  status: "online",
  about: "Available",
}

export const users: User[] = [
  {
    id: "user-1",
    name: "Ashutosh Chaurasia",
    avatar: "/images/alumni/Mask group (2).png",
    status: "offline",
    about: "Phii",
  },
  {
    id: "user-2",
    name: "Satya Indra Dev",
    avatar: "/images/alumni/Mask group (3).png",
    status: "online",
    about: "Available",
  },
  {
    id: "user-3",
    name: "Harihar Dev",
    avatar: "/images/alumni/Mask group (4).png",
    status: "offline",
    lastSeen: "1 hour ago",
    about: "Hate that's terrifying 😱",
  },
  {
    id: "user-4",
    name: "Keshava Dixit",
    avatar: "/images/alumni/Mask group (2).png",
    status: "offline",
    lastSeen: "5 hours ago",
    about: "omg, this is amazing",
  },
  {
    id: "user-5",
    name: "Ved Prakash",
    avatar: "/images/alumni/Mask group (3).png",
    status: "offline",
    lastSeen: "2 days ago",
    about: "www 😊",
  },
  {
    id: "user-6",
    name: "Rohit Sharma",
    avatar: "/images/alumni/Mask group (4).png",
    status: "offline",
    lastSeen: "1 minute ago",
    about: "perfect!",
  },
]

export const initialConversations: Conversation[] = [
  {
    id: "conv-1",
    participant: users[0],
    messages: [
      {
        id: "msg-1",
        content: "hi",
        senderId: "user-1",
        timestamp: new Date(Date.now() - 720000),
        status: "read",
        type: "text",
      },
    ],
    lastMessage: {
      id: "msg-1",
      content: "hii",
      senderId: "user-1",
      timestamp: new Date(Date.now() - 720000),
      status: "read",
      type: "text",
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
  {
    id: "conv-2",
    participant: users[1],
    messages: [
      {
        id: "msg-2",
        content: "omg, this is amazing",
        senderId: "user-2",
        timestamp: new Date(Date.now() - 1440000),
        status: "read",
        type: "text",
      },
      {
        id: "msg-3",
        content: "perfect! ✅",
        senderId: "current-user",
        timestamp: new Date(Date.now() - 1380000),
        status: "read",
        type: "text",
      },
      {
        id: "msg-4",
        content: "Wow, this is really epic",
        senderId: "user-2",
        timestamp: new Date(Date.now() - 1320000),
        status: "read",
        type: "text",
      },
    ],
    lastMessage: {
      id: "msg-4",
      content: "Wow, this is really epic",
      senderId: "user-2",
      timestamp: new Date(Date.now() - 1320000),
      status: "read",
      type: "text",
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
  {
    id: "conv-3",
    participant: users[2],
    messages: [
      {
        id: "msg-5",
        content: "Hate that's terrifying 😱",
        senderId: "user-3",
        timestamp: new Date(Date.now() - 3600000),
        status: "read",
        type: "text",
      },
    ],
    lastMessage: {
      id: "msg-5",
      content: "Hate that's terrifying 😱",
      senderId: "user-3",
      timestamp: new Date(Date.now() - 3600000),
      status: "read",
      type: "text",
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
  {
    id: "conv-4",
    participant: users[3],
    messages: [
      {
        id: "msg-6",
        content: "omg, this is amazing",
        senderId: "user-4",
        timestamp: new Date(Date.now() - 18000000),
        status: "read",
        type: "text",
      },
    ],
    lastMessage: {
      id: "msg-6",
      content: "omg, this is amazing",
      senderId: "user-4",
      timestamp: new Date(Date.now() - 18000000),
      status: "read",
      type: "text",
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
  {
    id: "conv-5",
    participant: users[4],
    messages: [
      {
        id: "msg-7",
        content: "www 😊",
        senderId: "user-5",
        timestamp: new Date(Date.now() - 86400000),
        status: "read",
        type: "text",
      },
    ],
    lastMessage: {
      id: "msg-7",
      content: "www 😊",
      senderId: "user-5",
      timestamp: new Date(Date.now() - 86400000),
      status: "read",
      type: "text",
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
  {
    id: "conv-6",
    participant: users[5],
    messages: [
      {
        id: "msg-8",
        content: "perfect!",
        senderId: "user-6",
        timestamp: new Date(Date.now() - 60000),
        status: "read",
        type: "text",
      },
    ],
    lastMessage: {
      id: "msg-8",
      content: "perfect!",
      senderId: "user-6",
      timestamp: new Date(Date.now() - 60000),
      status: "read",
      type: "text",
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
  // Group Chats
  {
    id: "group-1",
    participant: { id: "group-batch-1998", name: "Batch 1998", status: "online" as const },
    isGroup: true,
    groupInfo: {
      name: "Batch 1998",
      avatar: "/images/logo.png",
      description: "KVS Alumni Batch of 1998 - Stay connected!",
      members: [
        { id: "current-user", name: "You", status: "online" as const },
        { id: "user-1", name: "Ashutosh Chaurasia", avatar: "/images/alumni/Mask group (2).png", status: "offline" as const },
        { id: "user-2", name: "Satya Indra Dev", avatar: "/images/alumni/Mask group (3).png", status: "online" as const },
        { id: "user-3", name: "Harihar Dev", avatar: "/images/alumni/Mask group (4).png", status: "offline" as const },
        { id: "user-4", name: "Keshava Dixit", avatar: "/images/alumni/Mask group (2).png", status: "offline" as const },
        { id: "user-5", name: "Ved Prakash", avatar: "/images/alumni/Mask group (3).png", status: "offline" as const },
      ],
      admins: ["user-1"],
      createdAt: new Date("1998-06-15"),
    },
    messages: [
      {
        id: "grp-msg-1",
        content: "Hey everyone! Remember our annual day celebration? 🎉",
        senderId: "user-1",
        senderName: "Ashutosh Chaurasia",
        timestamp: new Date(Date.now() - 7200000),
        status: "read",
        type: "text",
      },
      {
        id: "grp-msg-2",
        content: "Of course! Those were the best days 😊",
        senderId: "user-2",
        senderName: "Satya Indra Dev",
        timestamp: new Date(Date.now() - 6800000),
        status: "read",
        type: "text",
      },
      {
        id: "grp-msg-3",
        content: "We should plan a reunion soon!",
        senderId: "user-3",
        senderName: "Harihar Dev",
        timestamp: new Date(Date.now() - 6400000),
        status: "read",
        type: "text",
      },
      {
        id: "grp-msg-4",
        content: "Great idea! How about next month?",
        senderId: "user-4",
        senderName: "Keshava Dixit",
        timestamp: new Date(Date.now() - 5000000),
        status: "read",
        type: "text",
      },
      {
        id: "grp-msg-5",
        content: "Count me in! 🙋‍♂️",
        senderId: "user-5",
        senderName: "Ved Prakash",
        timestamp: new Date(Date.now() - 3600000),
        status: "read",
        type: "text",
      },
    ],
    lastMessage: {
      id: "grp-msg-5",
      content: "Count me in! 🙋‍♂️",
      senderId: "user-5",
      senderName: "Ved Prakash",
      timestamp: new Date(Date.now() - 3600000),
      status: "read",
      type: "text",
    },
    unreadCount: 2,
    isPinned: true,
    isMuted: false,
  },
  {
    id: "group-2",
    participant: { id: "group-batch-1998-sports", name: "Batch 1998 - Sports Club", status: "online" as const },
    isGroup: true,
    groupInfo: {
      name: "Batch 1998 - Sports Club",
      avatar: "/images/logo.png",
      description: "Sports enthusiasts from Batch 1998",
      members: [
        { id: "current-user", name: "You", status: "online" as const },
        { id: "user-2", name: "Satya Indra Dev", avatar: "/images/alumni/Mask group (3).png", status: "online" as const },
        { id: "user-4", name: "Keshava Dixit", avatar: "/images/alumni/Mask group (2).png", status: "offline" as const },
        { id: "user-6", name: "Rohit Sharma", avatar: "/images/alumni/Mask group (4).png", status: "offline" as const },
      ],
      admins: ["user-2"],
      createdAt: new Date("1998-08-20"),
    },
    messages: [
      {
        id: "grp2-msg-1",
        content: "Anyone up for cricket this weekend? 🏏",
        senderId: "user-2",
        senderName: "Satya Indra Dev",
        timestamp: new Date(Date.now() - 86400000),
        status: "read",
        type: "text",
      },
      {
        id: "grp2-msg-2",
        content: "I'm in! Same ground as last time?",
        senderId: "user-6",
        senderName: "Rohit Sharma",
        timestamp: new Date(Date.now() - 82800000),
        status: "read",
        type: "text",
      },
      {
        id: "grp2-msg-3",
        content: "Yes! Let's meet at 7 AM",
        senderId: "user-4",
        senderName: "Keshava Dixit",
        timestamp: new Date(Date.now() - 79200000),
        status: "read",
        type: "text",
      },
    ],
    lastMessage: {
      id: "grp2-msg-3",
      content: "Yes! Let's meet at 7 AM",
      senderId: "user-4",
      senderName: "Keshava Dixit",
      timestamp: new Date(Date.now() - 79200000),
      status: "read",
      type: "text",
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
  {
    id: "group-3",
    participant: { id: "group-batch-1998-tech", name: "Batch 1998 - Tech Talk", status: "online" as const },
    isGroup: true,
    groupInfo: {
      name: "Batch 1998 - Tech Talk",
      avatar: "/images/logo.png",
      description: "Tech discussions and career updates",
      members: [
        { id: "current-user", name: "You", status: "online" as const },
        { id: "user-1", name: "Ashutosh Chaurasia", avatar: "/images/alumni/Mask group (2).png", status: "offline" as const },
        { id: "user-3", name: "Harihar Dev", avatar: "/images/alumni/Mask group (4).png", status: "offline" as const },
        { id: "user-5", name: "Ved Prakash", avatar: "/images/alumni/Mask group (3).png", status: "offline" as const },
      ],
      admins: ["user-3"],
      createdAt: new Date("1998-09-10"),
    },
    messages: [
      {
        id: "grp3-msg-1",
        content: "Has anyone tried the new AI tools? 🤖",
        senderId: "user-3",
        senderName: "Harihar Dev",
        timestamp: new Date(Date.now() - 172800000),
        status: "read",
        type: "text",
      },
      {
        id: "grp3-msg-2",
        content: "Yes! They're game changers for productivity",
        senderId: "user-1",
        senderName: "Ashutosh Chaurasia",
        timestamp: new Date(Date.now() - 169200000),
        status: "read",
        type: "text",
      },
    ],
    lastMessage: {
      id: "grp3-msg-2",
      content: "Yes! They're game changers for productivity",
      senderId: "user-1",
      senderName: "Ashutosh Chaurasia",
      timestamp: new Date(Date.now() - 169200000),
      status: "read",
      type: "text",
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
]
