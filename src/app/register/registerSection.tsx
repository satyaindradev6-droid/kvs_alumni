"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { updateRegistrationField, registerAlumni } from "@/redux/slices/alumniSlice"
import { fetchStates, fetchSchoolsByState, clearSchools } from "@/redux/slices/locationSlice"
import { useRouter } from "next/navigation"
import { alumniRegistrationSchema, exEmployeeRegistrationSchema, photoSchema } from "@/lib/validations"
import { z } from "zod"

const inputClassName = "h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700"
const inputErrorClassName = "h-12 bg-white border-2 border-red-500 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-700"
const labelClassName = "text-sm text-[var(--theme-primary)]"

type ValidationErrors = Record<string, string>

export function RegisterSection() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { registration, loading, error } = useAppSelector((state) => state.alumni)
  const { states, schools, statesLoading, schoolsLoading } = useAppSelector((state) => state.location)
  
  const [userType, setUserType] = useState<"alumni" | "ex-employee">("alumni")
  const [fileName, setFileName] = useState("")
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)

  // Fetch states on component mount
  useEffect(() => {
    if (states.length === 0) {
      dispatch(fetchStates())
    }
  }, [dispatch, states.length])

  // Fetch schools when state changes
  useEffect(() => {
    if (registration.state_id) {
      dispatch(fetchSchoolsByState(registration.state_id))
    } else {
      dispatch(clearSchools())
    }
  }, [registration.state_id, dispatch])

  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoBase64, setPhotoBase64] = useState<string>('')

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setPhotoFile(file)
      
      // Convert to base64 for JSON submission
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleInputChange = useCallback((field: string, value: any) => {
    dispatch(updateRegistrationField({ field: field as any, value }))
  }, [dispatch])

  const handleStateChange = useCallback((value: string) => {
    dispatch(updateRegistrationField({ field: 'state_id' as any, value: parseInt(value) }))
    dispatch(updateRegistrationField({ field: 'school_id' as any, value: undefined }))
  }, [dispatch])

  const validateForm = useCallback(() => {
    const errors: ValidationErrors = {}
    
    try {
      const schema = userType === "alumni" ? alumniRegistrationSchema : exEmployeeRegistrationSchema
      schema.parse(registration)
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodError = err as z.ZodError<unknown>
        zodError.issues.forEach((issue) => {
          const field = issue.path[0] as string
          errors[field] = issue.message
        })
      }
    }

    // Validate photo
    if (photoFile) {
      try {
        photoSchema.parse(photoFile)
      } catch (err) {
        if (err instanceof z.ZodError) {
          const zodError = err as z.ZodError<unknown>
          errors.photo = zodError.issues[0].message
        }
      }
    } else {
      errors.photo = "Upload Photo is required"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }, [registration, photoFile, userType])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setHasAttemptedSubmit(true)
    
    if (!validateForm()) {
      return
    }

    try {
      // Create FormData with all fields
      const formData = new FormData()
      
      // Add all form fields
      formData.append('name', registration.name)
      formData.append('father_name', registration.father_name || '')
      formData.append('mobile_number', registration.mobile_no || '')
      formData.append('email_id', registration.email_id)
      
      // Add optional fields
      if (registration.state_id) formData.append('state_id', registration.state_id.toString())
      if (registration.school_id) formData.append('school_id', registration.school_id.toString())
      if (registration.tc_year) formData.append('tc_year', registration.tc_year.toString())
      if (registration.tc_class) formData.append('tc_class', registration.tc_class)
      if (registration.admission_no) formData.append('admission_no', registration.admission_no)
      if (registration.ro_id) formData.append('ro_id', registration.ro_id.toString())
      
      formData.append('public_display', registration.public_display !== false ? 'true' : 'false')
      
      // Add the photo file
      formData.append('photo', photoFile!)
      
      await dispatch(registerAlumni(formData)).unwrap()
      router.push('/register/success')
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }, [dispatch, registration, photoFile, router, validateForm])

  const years = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - i),
    []
  )

  const classes = useMemo(() => 
    ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    []
  )

  const retirementYears = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => 2024 - i),
    []
  )

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

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Validation Error Summary */}
      {hasAttemptedSubmit && Object.keys(validationErrors).length > 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg">
          Please fill in all required fields correctly to complete your registration.
        </div>
      )}

      {/* Success Message */}
      {/* {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Registration successful! Redirecting...
        </div>
      )} */}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="min-h-[320px]">
        {/* Row 1: Name, Father Name, Mobile Number */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className={labelClassName}>Name</Label>
            <Input
              id="name"
              type="text"
              value={registration.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={hasAttemptedSubmit && validationErrors.name ? inputErrorClassName : inputClassName}
            />
            {hasAttemptedSubmit && validationErrors.name && <p className="text-xs text-red-500">{validationErrors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fatherName" className={labelClassName}>Father Name</Label>
            <Input
              id="fatherName"
              type="text"
              value={registration.father_name || ''}
              onChange={(e) => handleInputChange('father_name', e.target.value)}
              className={hasAttemptedSubmit && validationErrors.father_name ? inputErrorClassName : inputClassName}
            />
            {hasAttemptedSubmit && validationErrors.father_name && <p className="text-xs text-red-500">{validationErrors.father_name}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="mobile" className={labelClassName}>Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              value={registration.mobile_no || ''}
              onChange={(e) => handleInputChange('mobile_no', e.target.value)}
              className={hasAttemptedSubmit && validationErrors.mobile_no ? inputErrorClassName : inputClassName}
            />
            {hasAttemptedSubmit && validationErrors.mobile_no && <p className="text-xs text-red-500">{validationErrors.mobile_no}</p>}
          </div>
        </div>

        {userType === "alumni" ? (
          <>
            {/* Alumni Fields */}
            {/* Row 2: Email ID, State, School */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="email" className={labelClassName}>Email ID</Label>
                <Input
                  id="email"
                  type="email"
                  value={registration.email_id}
                  onChange={(e) => handleInputChange('email_id', e.target.value)}
                  className={hasAttemptedSubmit && validationErrors.email_id ? inputErrorClassName : inputClassName}
                />
                {hasAttemptedSubmit && validationErrors.email_id && <p className="text-xs text-red-500">{validationErrors.email_id}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="state" className={labelClassName}>State</Label>
                <Select
                  value={registration.state_id?.toString()}
                  onValueChange={handleStateChange}
                  disabled={statesLoading}
                >
                  <SelectTrigger className={hasAttemptedSubmit && validationErrors.state_id ? inputErrorClassName : inputClassName}>
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
                {hasAttemptedSubmit && validationErrors.state_id && <p className="text-xs text-red-500">{validationErrors.state_id}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="school" className={labelClassName}>Select School where last studied in KVS</Label>
                <Select
                  value={registration.school_id?.toString()}
                  onValueChange={(value) => handleInputChange('school_id', parseInt(value))}
                  disabled={schoolsLoading || !registration.state_id}
                >
                  <SelectTrigger className={hasAttemptedSubmit && validationErrors.school_id ? inputErrorClassName : inputClassName}>
                    <SelectValue placeholder={schoolsLoading ? "Loading..." : !registration.state_id ? "Select State first" : "Select School"} />
                  </SelectTrigger>
                  <SelectContent>
                    {schools.map((school) => (
                      <SelectItem key={school.kv_id} value={school.kv_id.toString()}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {hasAttemptedSubmit && validationErrors.school_id && <p className="text-xs text-red-500">{validationErrors.school_id}</p>}
              </div>
            </div>

            {/* Row 3: Year of Issue, Class, Admission No */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="year" className={labelClassName}>
                  Year of Issue of TC
                </Label>
                <Select
                  value={registration.tc_year?.toString()}
                  onValueChange={(value) => handleInputChange('tc_year', parseInt(value))}
                >
                  <SelectTrigger className={hasAttemptedSubmit && validationErrors.tc_year ? inputErrorClassName : inputClassName}>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {hasAttemptedSubmit && validationErrors.tc_year && <p className="text-xs text-red-500">{validationErrors.tc_year}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="class" className={labelClassName}>
                  Class Studied while taking TC
                </Label>
                <Select
                  value={registration.tc_class || ''}
                  onValueChange={(value) => handleInputChange('tc_class', value)}
                >
                  <SelectTrigger className={hasAttemptedSubmit && validationErrors.tc_class ? inputErrorClassName : inputClassName}>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {hasAttemptedSubmit && validationErrors.tc_class && <p className="text-xs text-red-500">{validationErrors.tc_class}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admission" className={labelClassName}>
                  Admission No (Optional)
                </Label>
                <Input
                  id="admission"
                  type="text"
                  value={registration.admission_no || ''}
                  onChange={(e) => handleInputChange('admission_no', e.target.value)}
                  className={inputClassName}
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
                  value={registration.email_id}
                  onChange={(e) => handleInputChange('email_id', e.target.value)}
                  className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="employeeCode" className="text-sm text-[var(--theme-primary)]">
                  Employee Code
                </Label>
                <Input
                  id="employeeCode"
                  type="text"
                  value={registration.admission_no || ''}
                  onChange={(e) => handleInputChange('admission_no', e.target.value)}
                  className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="retirementYear" className="text-sm text-[var(--theme-primary)]">
                  Retirement Year
                </Label>
                <Select
                  value={registration.tc_year?.toString()}
                  onValueChange={(value) => handleInputChange('tc_year', parseInt(value))}
                >
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {retirementYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}-{year + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 3: Retired From, Organization */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="retiredFrom" className="text-sm text-[var(--theme-primary)]">
                  Retired From
                </Label>
                <Select
                  value={registration.ro_id?.toString()}
                  onValueChange={(value) => handleInputChange('ro_id', parseInt(value))}
                >
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">RO</SelectItem>
                    <SelectItem value="2">KVS</SelectItem>
                    <SelectItem value="3">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="organization" className="text-sm text-[var(--theme-primary)]">
                  Organization
                </Label>
                <Select
                  value={registration.school_id?.toString()}
                  onValueChange={(value) => handleInputChange('school_id', parseInt(value))}
                >
                  <SelectTrigger className="h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">KVS Bhopal</SelectItem>
                    <SelectItem value="2">KVS Indore</SelectItem>
                    <SelectItem value="3">KVS Delhi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        {/* Upload Photo */}
        <div className="space-y-1.5">
          <Label htmlFor="photo" className={labelClassName}>
            Upload Photo *
          </Label>
          <div className={`flex gap-0 overflow-hidden rounded-lg border-2 ${hasAttemptedSubmit && validationErrors.photo ? 'border-red-500' : 'border-[var(--theme-primary)]'}`}>
            <Input
              id="photo-display"
              type="text"
              value={fileName || ""}
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
          {hasAttemptedSubmit && validationErrors.photo && <p className="text-xs text-red-500">{validationErrors.photo}</p>}
        </div>
        </div>

        {/* Register Button */}
        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            className="px-12 h-12 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary2)] text-white font-semibold text-base rounded-lg shadow-lg shadow-[var(--theme-primary)]/30 hover:shadow-xl hover:shadow-[var(--theme-primary)]/40 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "REGISTERING..." : "REGISTER"}
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
              href="/login"
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
