  "use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserAvatar } from "@/components/ui/user-avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Globe, Camera, Facebook, Twitter, Linkedin, MessageCircle, FileText, Heart, Users, CheckCircle, GraduationCap, Briefcase } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useUser } from "@/hooks/useUser"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchStates } from "@/redux/slices/locationSlice"
import { EducationSection } from "@/components/profile/education-section"
import { ExperienceSection } from "@/components/profile/experience-section"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("Profile Updated Successfully!")
  const [error, setError] = useState("")
  const { user, refetchUser } = useUser()
  const dispatch = useAppDispatch()
  const { states, statesLoading } = useAppSelector((state) => state.location)
  
  // State for Select fields
  const [gender, setGender] = useState("")
  const [expertise, setExpertise] = useState("")
  const [contribution, setContribution] = useState("")
  const [showcase, setShowcase] = useState("")
  const [selectedStateId, setSelectedStateId] = useState("")

  // Load active tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem('profileActiveTab')
    if (savedTab && (savedTab === 'profile' || savedTab === 'education-experience')) {
      setActiveTab(savedTab)
    }
  }, [])

  // Save active tab to localStorage when it changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    localStorage.setItem('profileActiveTab', value)
  }

  // Fetch states on component mount
  useEffect(() => {
    if (states.length === 0) {
      dispatch(fetchStates())
    }
  }, [dispatch, states.length])

  // Update state when user data loads
  useEffect(() => {
    if (user) {
      setGender(user.gender || "")
      setExpertise(user.experties || "")
      setContribution(user.contribution || "")
      setShowcase(user.public_display || "")
      setSelectedStateId(user.state_id?.toString() || "")
      // Set profile image from database if available
      if (user.profile_image && !profileImage) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
        const imageUrl = user.profile_image.startsWith('http') 
          ? user.profile_image 
          : `${apiUrl}${user.profile_image}`
        setProfileImage(imageUrl)
      }
    }
  }, [user, profileImage])
  
  // Create a user object with uploaded image if available, otherwise use DB image
  const displayUser = {
    ...user,
    profile_image: profileImage || user?.profile_image
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImage(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Store file for upload
    setProfileImageFile(file)

    // Upload immediately
    await uploadProfileImage(file)
  }

  const uploadProfileImage = async (file: File) => {
    setIsUploadingImage(true)
    setError("")

    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setError('Please login again')
        return
      }

      const formData = new FormData()
      formData.append('photo', file)

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const endpoint = `${API_URL}/api/alumni/profile/photo`

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        // Update profile image with the returned path
        if (data.profile_image) {
          const imageUrl = data.profile_image.startsWith('http') 
            ? data.profile_image 
            : `${API_URL}${data.profile_image}`
          setProfileImage(imageUrl)
        }
        // Refresh user profile data from API
        refetchUser()
        setToastMessage('Profile picture updated successfully!')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      } else {
        setError(data.message || 'Failed to upload profile picture')
      }
    } catch (err) {
      setError('An error occurred while uploading image. Please try again.')
      console.error('Image upload error:', err)
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData(e.currentTarget)
      const token = localStorage.getItem('token')
      
      if (!token) {
        setError('Please login again')
        return
      }

      if (!user?.alumni_id) {
        setError('User ID not found')
        return
      }

      // Prepare data based on user type
      const profileData: any = {
        name: formData.get('name') as string,
        mobile_no: formData.get('mobile') as string,
        email_id: formData.get('email') as string,
        about_me: formData.get('about') as string,
        // Address fields
        add1: formData.get('street') as string,
        add2: formData.get('city') as string,
        add3: formData.get('state') as string,
        add4: formData.get('pin') as string,
        state_id: selectedStateId ? parseInt(selectedStateId, 10) : null,
        // Social media fields
        facebook: formData.get('facebook') as string,
        twitter: formData.get('twitter') as string,
        linkedin: formData.get('linkedin') as string,
        whatsapp: formData.get('whatsapp') as string,
        blog: formData.get('blog') as string,
        // Other fields
        gender: gender,
        dob: formData.get('dob') as string,
        father_name: formData.get('fathername') as string,
        contribution: contribution,
        public_display: showcase,
      }

      // Add type-specific fields
      if (user.type === 'student') {
        const tcYear = formData.get('tc_year') as string
        profileData.tc_year = tcYear ? parseInt(tcYear, 10) : null
        profileData.tc_class = formData.get('tc_class') as string
        profileData.experties = expertise
      } else if (user.type === 'employee') {
        profileData.emp_code = formData.get('empcode') as string
        const tcYear = formData.get('tc_year') as string
        profileData.tc_year = tcYear ? parseInt(tcYear, 10) : null
        profileData.tc_class = formData.get('tc_class') as string
      }

      // API endpoint based on user type
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const endpoint = user.type === 'student' 
        ? `${API_URL}/api/alumni/student/profile/${user.alumni_id}`
        : `${API_URL}/api/alumni/employee/profile/${user.alumni_id}`

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh user profile data from API
        refetchUser()
        setToastMessage('Profile Updated Successfully!')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      } else {
        setError(data.message || 'Failed to update profile')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Profile update error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <DashboardLayout title="Profile" activeNav="profile">

    <div className="p-6">
      <div className="mx-auto max-w-full">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="inline-flex h-12 items-center justify-start rounded-lg bg-white border border-slate-200 p-1 mb-6 gap-1 shadow-sm">
            <TabsTrigger 
              value="profile" 
              className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-slate-50 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
            >
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="education-experience" 
              className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-slate-50 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm"
            >
              <GraduationCap className="h-4 w-4" />
              Education & Experience
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab Content */}
          <TabsContent value="profile">
            <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Card - Featured at top */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 h-24" />
            <CardContent className="relative pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
                <div className="relative group">
                  <UserAvatar 
                    user={displayUser} 
                    size="xl" 
                    className="border-4 border-white shadow-xl"
                  />
                  {isUploadingImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  )}
                  <label
                    htmlFor="photo"
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                  >
                    <Camera className="h-6 w-6 text-white" />
                  </label>
                  <Input 
                    id="photo" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden"
                    disabled={isUploadingImage}
                  />
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
                    defaultValue={user?.alumni_id || ""}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
{user?.type === 'employee' && user?.emp_code && (
                  <div className="space-y-2">
                    <Label htmlFor="empcode" className="text-sm font-medium text-slate-700">
                      Employee Code
                    </Label>
                    <Input
                      id="empcode"
                      name="empcode"
                      defaultValue={user?.emp_code || ""}
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={user?.name || ""}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Id
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user?.email_id || ""}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-medium text-slate-700">
                    Mobile No
                  </Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    defaultValue={user?.mobile_no || ""}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {user?.father_name && (
                  <div className="space-y-2">
                    <Label htmlFor="fathername" className="text-sm font-medium text-slate-700">
                      Father's Name
                    </Label>
                    <Input
                      id="fathername"
                      name="fathername"
                      defaultValue={user?.father_name || ""}
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="street" className="text-sm font-medium text-slate-700">
                    H No. / Street Name
                  </Label>
                  <Input
                    id="street"
                    name="street"
                    defaultValue={user?.add1 || ""}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-slate-700">
                    City / Village
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={user?.add2 || ""}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium text-slate-700">
                    State
                  </Label>
                  <Select value={selectedStateId} onValueChange={setSelectedStateId} disabled={statesLoading}>
                    <SelectTrigger id="state" className="h-11 bg-slate-50 border-slate-200">
                      <SelectValue placeholder={statesLoading ? "Loading..." : "Select State"} />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.id} value={state.id.toString()}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium text-slate-700">
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="state"
                    defaultValue={user?.add3 || ""}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pin" className="text-sm font-medium text-slate-700">
                    Pin
                  </Label>
                  <Input
                    id="pin"
                    name="pin"
                    defaultValue={user?.add4 || ""}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium text-slate-700">
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
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
                    name="dob"
                    type="date"
                    defaultValue={user?.dob || ""}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tc_year" className="text-sm font-medium text-slate-700">
                    TC Year
                  </Label>
                  <Input
                    id="tc_year"
                    name="tc_year"
                    defaultValue={user?.tc_year || ""}
                    placeholder="2021"
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tc_class" className="text-sm font-medium text-slate-700">
                    TC Class
                  </Label>
                  <Input
                    id="tc_class"
                    name="tc_class"
                    defaultValue={user?.tc_class || ""}
                    placeholder={user?.type === 'employee' ? 'Principal' : '12A'}
                    className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                  />
                </div>
                {user?.type === 'student' && (
                  <div className="space-y-2">
                    <Label htmlFor="expertise" className="text-sm font-medium text-slate-700">
                      Area of Expertise
                    </Label>
                    <Select value={expertise} onValueChange={setExpertise}>
                      <SelectTrigger id="expertise" className="h-11 bg-slate-50 border-slate-200">
                        <SelectValue placeholder="Select Expertise" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="it_software">IT & Software</SelectItem>
                        <SelectItem value="banking_finance">Banking & Finance</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="sales_marketing">Sales & Marketing</SelectItem>
                        <SelectItem value="hr_admin">HR & Admin</SelectItem>
                        <SelectItem value="accounting">Accounting</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="design_creative">Design & Creative</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="tourism">Tourism</SelectItem>
                        <SelectItem value="aviation">Aviation</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="customer_support">Customer Support</SelectItem>
                        <SelectItem value="data_analytics">Data Analytics</SelectItem>
                        <SelectItem value="cyber_security">Cyber Security</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="ngo">NGO</SelectItem>
                        <SelectItem value="defence">Defence</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="skilled_trade">Skilled Trade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
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
                    name="facebook"
                    placeholder="https://www.facebook.com/username"
                    defaultValue={user?.facebook || ""}
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
                    name="twitter"
                    placeholder="https://twitter.com/username"
                    defaultValue={user?.twitter || ""}
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
                    name="linkedin"
                    placeholder="https://linkedin.com/in/username"
                    defaultValue={user?.linkedin || ""}
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
                    name="blog"
                    placeholder="https://yourblog.com"
                    defaultValue={user?.blog || ""}
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
                    name="whatsapp"
                    placeholder="Phone number"
                    defaultValue={user?.whatsapp || ""}
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
                name="about"
                placeholder="Tell us about yourself..."
                className="min-h-32 bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none"
                defaultValue={user?.about_me || ""}
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
                  <Select value={contribution} onValueChange={setContribution}>
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
                  <Select value={showcase} onValueChange={setShowcase}>
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

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Update Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="px-8 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </form>
          </TabsContent>

          {/* Education & Experience Tab Content */}
          <TabsContent value="education-experience" className="space-y-6">
            {/* Education Section */}
            <EducationSection />

            {/* Experience Section */}
            <ExperienceSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </DashboardLayout>
      )
}
