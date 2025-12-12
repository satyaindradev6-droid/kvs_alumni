"use client"

import { useEffect } from "react"
import { Users, Calendar, MessageCircle, Bell, Award, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useUser } from "@/hooks/useUser"

const quickStats = [
  { icon: Users, label: "Total Alumni", value: "12,458", trend: "+5.2%", color: "bg-cyan-500" },
  { icon: MessageCircle, label: "Active Chats", value: "234", trend: "+12%", color: "bg-emerald-500" },
  { icon: Calendar, label: "Upcoming Events", value: "8", trend: "This month", color: "bg-amber-500" },
  { icon: Bell, label: "Notifications", value: "15", trend: "Unread", color: "bg-rose-500" },
]

const recentActivities = [
  { id: 1, user: "Rahul Sharma", action: "joined the alumni network", time: "2 hours ago" },
  { id: 2, user: "Priya Patel", action: "posted in Class of 2015 group", time: "4 hours ago" },
  { id: 3, user: "Amit Kumar", action: "registered for Annual Meet 2025", time: "5 hours ago" },
  { id: 4, user: "Sneha Gupta", action: "shared a job opportunity", time: "Yesterday" },
]

const upcomingEvents = [
  { id: 1, title: "Annual Alumni Meet 2025", date: "Dec 25, 2025", location: "KV Campus, Delhi", attendees: 156 },
  { id: 2, title: "Career Guidance Workshop", date: "Dec 18, 2025", location: "Virtual Event", attendees: 89 },
  { id: 3, title: "Sports Day Reunion", date: "Jan 5, 2026", location: "KV Sports Ground", attendees: 234 },
]

export default function HomePage() {
  const { user, loading, error, isLoaded, isLoggedIn } = useUser()

  useEffect(() => {
    console.log('=== DASHBOARD USER DATA ===')
    console.log('User:', user)
    console.log('Loading:', loading)
    console.log('Error:', error)
    console.log('Is Loaded:', isLoaded)
    console.log('Is Logged In:', isLoggedIn)
    console.log('=========================')
    
    // Also log localStorage data for comparison
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      const userBasic = localStorage.getItem('user')
      const userProfile = localStorage.getItem('userProfile')
      
      console.log('=== LOCALSTORAGE DATA ===')
      console.log('Token:', token ? 'exists' : 'missing')
      console.log('User Basic:', userBasic ? JSON.parse(userBasic) : 'missing')
      console.log('User Profile:', userProfile ? JSON.parse(userProfile) : 'missing')
      console.log('========================')
    }
  }, [user, loading, error, isLoaded, isLoggedIn])

  return (
    <DashboardLayout title="Dashboard" activeNav="home">
      {/* Hero Banner */}
      <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-primary)] via-[var(--theme-primary2)] to-cyan-400" />
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/building.png" alt="KVS Building" fill className="object-cover" />
        </div>
        <div className="relative z-10 h-full flex items-center px-8">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-lg opacity-90">Stay connected with your KVS Alumni community</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-emerald-600 mt-1">{stat.trend}</p>
                  </div>
                  <div className={cn("p-3 rounded-lg", stat.color)}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-cyan-500" />
              Recent Activity
            </h3>
            <Link href="#" className="text-sm text-cyan-600 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <span className="text-sm font-medium text-gray-600">
                    {activity.user.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-gray-600">{activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              Upcoming Events
            </h3>
            <Link href="#" className="text-sm text-cyan-600 hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{event.location}</span>
                  <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full">
                    {event.attendees} attending
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/chat" className="flex flex-col items-center gap-3 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-cyan-200 transition-all group">
            <div className="p-3 rounded-full bg-cyan-50 group-hover:bg-cyan-100 transition-colors">
              <MessageCircle className="h-6 w-6 text-cyan-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Start Chat</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all group">
            <div className="p-3 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Find Alumni</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all group">
            <div className="p-3 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Events</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-3 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group">
            <div className="p-3 rounded-full bg-purple-50 group-hover:bg-purple-100 transition-colors">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Achievements</span>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
