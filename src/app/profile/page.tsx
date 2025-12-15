"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Globe, Camera, Facebook, Twitter, Linkedin, MessageCircle, FileText, Heart, Users } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
      <DashboardLayout title="Profile" activeNav="profile">

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Profile Settings</h1>
          <p className="mt-2 text-slate-600">Manage your personal information and preferences</p>
        </div>

        <form className="space-y-6">
          {/* Profile Image Card - Featured at top */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 h-24" />
            <CardContent className="relative pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
                <div className="relative group">
                  <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 text-2xl font-semibold">KT</AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="photo"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                  >
                    <Camera className="h-6 w-6 text-white" />
                  </label>
                  <Input id="photo" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
                <div className="text-center sm:text-left sm:pb-2">
                  <h2 className="text-xl font-semibold text-slate-900">Profile Image</h2>
                  <p className="text-sm text-slate-500">Upload your latest photograph</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Profile Section */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                My Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="uid" className="text-sm font-medium text-slate-700">
                    UID
                  </Label>
                  <Input
                    id="uid"
                    defaultValue="2147483647"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Krishna K Tiwari"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Id
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="krishna.techventures@gmail.com"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-medium text-slate-700">
                    Mobile No
                  </Label>
                  <Input
                    id="mobile"
                    defaultValue="8871199143"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="street" className="text-sm font-medium text-slate-700">
                    H No. / Street Name
                  </Label>
                  <Input
                    id="street"
                    defaultValue="Naimisharanya"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-slate-700">
                    City / Village
                  </Label>
                  <Input
                    id="city"
                    defaultValue="Nawdha Chauk"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium text-slate-700">
                    State / Country
                  </Label>
                  <Input
                    id="state"
                    defaultValue="Sakti"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pin" className="text-sm font-medium text-slate-700">
                    Pin
                  </Label>
                  <Input
                    id="pin"
                    defaultValue="495689"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium text-slate-700">
                    Gender
                  </Label>
                  <Select defaultValue="male">
                    <SelectTrigger id="gender" className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-sm font-medium text-slate-700">
                    DOB
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    defaultValue="1986-06-17"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expertise" className="text-sm font-medium text-slate-700">
                    Area of Expertise
                  </Label>
                  <Select>
                    <SelectTrigger id="expertise" className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Select Expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Profile Section */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <Globe className="h-5 w-5 text-sky-600" />
                </div>
                Social Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    placeholder="https://www.facebook.com/username"
                    defaultValue="https://www.facebook.com/krishn"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-sky-500" />
                    Twitter - X
                  </Label>
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/username"
                    defaultValue="https://www.facebook.com/krishn"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-700" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    defaultValue="https://linkedin.com/krishna"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blog" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-orange-500" />
                    Blog
                  </Label>
                  <Input
                    id="blog"
                    placeholder="https://yourblog.com"
                    defaultValue="https://www.facebook.com/krishn"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
              </div>
              <div className="max-w-sm">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    WhatsApp
                  </Label>
                  <Input
                    id="whatsapp"
                    placeholder="Phone number"
                    defaultValue="7470822468"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Me Section */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FileText className="h-5 w-5 text-emerald-600" />
                </div>
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                id="about"
                placeholder="Tell us about yourself..."
                className="min-h-32 bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none"
                defaultValue="Test again again and again"
              />
            </CardContent>
          </Card>

          {/* Preferences Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contribution Section */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <Heart className="h-5 w-5 text-rose-600" />
                  </div>
                  Contribution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Label htmlFor="contribute" className="text-sm font-medium text-slate-700 leading-relaxed">
                    Would you like to contribute service / assets under VIDYANJALI project
                  </Label>
                  <Select defaultValue="yes">
                    <SelectTrigger id="contribute" className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">YES</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Profile on Alumni Website Section */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Users className="h-5 w-5 text-amber-600" />
                  </div>
                  Profile on alumni website
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Label htmlFor="showcase" className="text-sm font-medium text-slate-700 leading-relaxed">
                    Would you be interested in showcasing your public profile on the alumni website?
                  </Label>
                  <Select defaultValue="no">
                    <SelectTrigger id="showcase" className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">YES</SelectItem>
                      <SelectItem value="no">NO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Update Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              className="px-8 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-200"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
    </DashboardLayout>
      )
}
