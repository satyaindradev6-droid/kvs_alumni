"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function RegisterSection() {
  const [userType, setUserType] = useState<"alumni" | "ex-employee">("alumni")
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <div className="space-y-4">
      {/* Toggle Buttons */}
      <div className="flex gap-0 rounded-full border-2 border-[var(--theme-primary)] overflow-hidden w-fit ml-auto">
        <button
          type="button"
          onClick={() => setUserType("alumni")}
          className={`px-6 py-1.5 text-sm font-medium transition-all duration-300 ${
            userType === "alumni"
              ? "bg-[var(--theme-primary)] text-white"
              : "bg-transparent text-[var(--theme-primary)] hover:bg-gray-50"
          }`}
        >
          Alumni
        </button>
        <button
          type="button"
          onClick={() => setUserType("ex-employee")}
          className={`px-6 py-1.5 text-sm font-medium transition-all duration-300 ${
            userType === "ex-employee"
              ? "bg-[var(--theme-primary)] text-white"
              : "bg-transparent text-[var(--theme-primary)] hover:bg-gray-50"
          }`}
        >
          Ex-Employee
        </button>
      </div>

      {/* Title */}
      <div className="min-h-[40px] flex items-center justify-center">
        <h2 className="text-2xl font-bold text-[var(--theme-primary)] text-center">
          Register as a {userType === "alumni" ? "Alumni" : "Ex-Employee"}
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="min-h-[320px]">
        {/* Row 1: Name, Father Name, Mobile Number */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm text-[var(--theme-primary)]">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Suraj Singh"
              className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700 placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fatherName" className="text-sm text-[var(--theme-primary)]">
              Father Name
            </Label>
            <Input
              id="fatherName"
              type="text"
              placeholder="Amitabh Singh"
              className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700 placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="mobile" className="text-sm text-[var(--theme-primary)]">
              Mobile Number
            </Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="+91 25424 26554"
              className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700 placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        {userType === "alumni" ? (
          <>
            {/* Alumni Fields */}
            {/* Row 2: Email ID, State, School */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm text-[var(--theme-primary)]">
                  Email ID
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="thisuix@mail.com"
                  className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700 placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="state" className="text-sm text-[var(--theme-primary)]">
                  State
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue placeholder="Madhya Pradesh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp">Madhya Pradesh</SelectItem>
                    <SelectItem value="up">Uttar Pradesh</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="school" className="text-sm text-[var(--theme-primary)]">
                  Select School where last studied in KVS
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue placeholder="BHOPAL NO 1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bhopal1">BHOPAL NO 1</SelectItem>
                    <SelectItem value="bhopal2">BHOPAL NO 2</SelectItem>
                    <SelectItem value="indore">INDORE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 3: Year of Issue, Class, Admission No */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="year" className="text-sm text-[var(--theme-primary)]">
                  Year of Issue of TC
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue placeholder="2000" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 50 }, (_, i) => 2024 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="class" className="text-sm text-[var(--theme-primary)]">
                  Class Studied while taking TC
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue placeholder="10th" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"].map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admission" className="text-sm text-[var(--theme-primary)]">
                  Admission No (Optional)
                </Label>
                <Input
                  id="admission"
                  type="text"
                  placeholder="564486565241"
                  className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Ex-Employee Fields */}
            {/* Row 2: Email ID, Employee Code, Retirement Year */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm text-[var(--theme-primary)]">
                  Email ID
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="thisuix@mail.com"
                  className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700 placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="employeeCode" className="text-sm text-[var(--theme-primary)]">
                  Employee Code
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue placeholder="215645" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="215645">215645</SelectItem>
                    <SelectItem value="215646">215646</SelectItem>
                    <SelectItem value="215647">215647</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="retirementYear" className="text-sm text-[var(--theme-primary)]">
                  Retirement Year
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue placeholder="1985-1986" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 50 }, (_, i) => {
                      const year = 2024 - i
                      return (
                        <SelectItem key={year} value={`${year}-${year + 1}`}>
                          {year}-{year + 1}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 3: Retired From, Organization, Upload Photo */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="retiredFrom" className="text-sm text-[var(--theme-primary)]">
                  Retired From
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue placeholder="RO" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ro">RO</SelectItem>
                    <SelectItem value="kvs">KVS</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="organization" className="text-sm text-[var(--theme-primary)]">
                  Organization
                </Label>
                <Select>
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue placeholder="KVS Bhopal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kvs-bhopal">KVS Bhopal</SelectItem>
                    <SelectItem value="kvs-indore">KVS Indore</SelectItem>
                    <SelectItem value="kvs-delhi">KVS Delhi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="photo-ex" className="text-sm text-[var(--theme-primary)]">
                  Upload Photo
                </Label>
                <div className="flex gap-0 overflow-hidden rounded-lg border-2 border-[var(--theme-primary)]">
                  <Input
                    id="photo-display-ex"
                    type="text"
                    value={fileName || "photo.jpeg"}
                    readOnly
                    className="h-12 bg-white border-0 rounded-none text-gray-700 flex-1"
                  />
                  <label
                    htmlFor="photo-ex"
                    className="h-12 px-6 bg-[var(--theme-primary)] text-white font-medium flex items-center justify-center cursor-pointer hover:bg-[var(--theme-primary2)] transition-colors"
                  >
                    Choose File
                  </label>
                  <input
                    id="photo-ex"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Upload Photo - Only for Alumni */}
        {userType === "alumni" && (
          <div className="space-y-1.5">
            <Label htmlFor="photo" className="text-sm text-[var(--theme-primary)]">
              Upload Photo
            </Label>
            <div className="flex gap-0 overflow-hidden rounded-lg border-2 border-[var(--theme-primary)]">
              <Input
                id="photo-display"
                type="text"
                value={fileName || "photo.jpeg"}
                readOnly
                className="h-12 bg-white border-0 rounded-none text-gray-700 flex-1"
              />
              <label
                htmlFor="photo"
                className="h-12 px-6 bg-[var(--theme-primary)] text-white font-medium flex items-center justify-center cursor-pointer hover:bg-[var(--theme-primary2)] transition-colors"
              >
                Choose File
              </label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        )}
        </div>

        {/* Register Button */}
        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            className="px-12 h-12 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary2)] text-white font-semibold text-base rounded-lg shadow-lg shadow-[var(--theme-primary)]/30 hover:shadow-xl hover:shadow-[var(--theme-primary)]/40 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "REGISTERING..." : "REGISTER"}
          </Button>
        </div>

        {/* OR Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">OR</span>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have account?{" "}
            <a
              href="#"
              className="font-semibold text-[var(--theme-primary)] hover:text-[var(--theme-primary2)] transition-colors underline-offset-4 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
