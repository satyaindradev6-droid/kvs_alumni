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
import { updateEmployeeField, registerEmployee } from "@/redux/slices/employeeSlice"
import { fetchStates, fetchSchoolsByState, clearSchools } from "@/redux/slices/locationSlice"
import { useRouter } from "next/navigation"
import Link from "next/link"


const inputClassName = "h-12 bg-white border-2 border-[var(--theme-primary)] rounded-lg focus:ring-[var(--theme-primary)] focus:border-[var(--theme-primary)] text-gray-700"
const inputErrorClassName = "h-12 bg-white border-2 border-red-500 rounded-lg focus:ring-red-500 focus:border-red-500 text-gray-700"
const labelClassName = "text-sm text-[var(--theme-primary)]"

type ValidationErrors = Record<string, string>

const TAB_STORAGE_KEY = 'kvs_registration_tab'

export function RegisterSection() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  
  // Initialize userType from localStorage or default to "alumni"
  const [userType, setUserType] = useState<"alumni" | "ex-employee">(() => {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem(TAB_STORAGE_KEY)
      if (savedTab === 'alumni' || savedTab === 'ex-employee') {
        return savedTab
      }
    }
    return "alumni"
  })
  
  const { registration: alumniRegistration, loading: alumniLoading, error: alumniError } = useAppSelector((state) => state.alumni)
  const { registration: employeeRegistration, loading: employeeLoading, error: employeeError } = useAppSelector((state) => state.employee)
  const { states, schools, statesLoading, schoolsLoading } = useAppSelector((state) => state.location)
  
  // Use the appropriate registration based on userType
  const registration = userType === "alumni" ? alumniRegistration : employeeRegistration
  const loading = userType === "alumni" ? alumniLoading : employeeLoading
  const error = userType === "alumni" ? alumniError : employeeError
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
    const stateId = userType === "alumni" 
      ? (registration as any).state_id 
      : (registration as any).stateid;
    
    if (stateId) {
      dispatch(fetchSchoolsByState(stateId))
    } else {
      dispatch(clearSchools())
    }
  }, [userType === "alumni" ? (registration as any).state_id : (registration as any).stateid, dispatch, userType])

  const [photoFile, setPhotoFile] = useState<File | null>(null)


  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setPhotoFile(file)
      

    }
  }, [])

  const handleInputChange = useCallback((field: string, value: any) => {
    if (userType === "alumni") {
      dispatch(updateRegistrationField({ field: field as any, value }))
    } else {
      dispatch(updateEmployeeField({ field: field as any, value }))
    }
  }, [dispatch, userType])

  const handleStateChange = useCallback((value: string) => {
    if (userType === "alumni") {
      dispatch(updateRegistrationField({ field: 'state_id' as any, value: parseInt(value) }))
      dispatch(updateRegistrationField({ field: 'school_id' as any, value: undefined }))
    } else {
      dispatch(updateEmployeeField({ field: 'stateid' as any, value: parseInt(value) }))
      dispatch(updateEmployeeField({ field: 'organizerid' as any, value: undefined }))
    }
  }, [dispatch, userType])

  const validateForm = useCallback(() => {
    const errors: ValidationErrors = {}
    
    if (userType === "ex-employee") {
      // Ex-Employee validation
      const empReg = employeeRegistration
      
      if (!empReg.name || empReg.name.trim() === '') {
        errors.name = 'Name is required'
      }
      
      if (!empReg.fathername || empReg.fathername.trim() === '') {
        errors.fathername = 'Father Name is required'
      }
      
      if (!empReg.mobileno || empReg.mobileno.trim() === '') {
        errors.mobileno = 'Mobile Number is required'
      } else if (!/^[0-9]{10}$/.test(empReg.mobileno)) {
        errors.mobileno = 'Mobile Number must be 10 digits'
      }
      
      if (!empReg.emailid || empReg.emailid.trim() === '') {
        errors.emailid = 'Email ID is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(empReg.emailid)) {
        errors.emailid = 'Please enter a valid email address'
      }
      
      if (!empReg.empcode || empReg.empcode.trim() === '') {
        errors.empcode = 'Employee Code is required'
      }
      
      if (!empReg.tcyear) {
        errors.tcyear = 'Retirement Year is required'
      }
      
      if (!empReg.organizerid) {
        errors.organizerid = 'Retired From is required'
      }
      
      if (!empReg.organization || empReg.organization.trim() === '') {
        errors.organization = 'Organization is required'
      }
      
      // Photo validation for ex-employee
      if (!photoFile) {
        errors.photo = 'Upload Photo is required'
      }
    } else {
      // Alumni validation
      const alReg = alumniRegistration
      
      if (!alReg.name || alReg.name.trim() === '') {
        errors.name = 'Name is required'
      }
      
      if (!alReg.father_name || alReg.father_name.trim() === '') {
        errors.father_name = 'Father Name is required'
      }
      
      if (!alReg.mobile_no || alReg.mobile_no.trim() === '') {
        errors.mobile_no = 'Mobile Number is required'
      } else if (!/^[0-9]{10}$/.test(alReg.mobile_no)) {
        errors.mobile_no = 'Mobile Number must be 10 digits'
      }
      
      if (!alReg.email_id || alReg.email_id.trim() === '') {
        errors.email_id = 'Email ID is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alReg.email_id)) {
        errors.email_id = 'Please enter a valid email address'
      }
      
      if (!alReg.state_id) {
        errors.state_id = 'State is required'
      }
      
      if (!alReg.school_id) {
        errors.school_id = 'School is required'
      }
      
      if (!alReg.tc_year) {
        errors.tc_year = 'Year of Issue of TC is required'
      }
      
      if (!alReg.tc_class || alReg.tc_class.trim() === '') {
        errors.tc_class = 'Class is required'
      }
      
      // admission_no is optional - no validation needed
      
      // Photo validation for alumni
      if (!photoFile) {
        errors.photo = 'Upload Photo is required'
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }, [alumniRegistration, employeeRegistration, photoFile, userType])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setHasAttemptedSubmit(true)
    
    if (!validateForm()) {
      return
    }

    try {
      const formData = new FormData()
      
      if (userType === "alumni") {
        // Alumni registration fields
        const alumniReg = alumniRegistration
        formData.append('name', alumniReg.name)
        formData.append('father_name', alumniReg.father_name || '')
        formData.append('mobile_number', alumniReg.mobile_no || '')
        formData.append('email_id', alumniReg.email_id)
        
        if (alumniReg.state_id) formData.append('state_id', alumniReg.state_id.toString())
        if (alumniReg.school_id) formData.append('school_id', alumniReg.school_id.toString())
        if (alumniReg.tc_year) formData.append('tc_year', alumniReg.tc_year.toString())
        if (alumniReg.tc_class) formData.append('tc_class', alumniReg.tc_class)
        if (alumniReg.admission_no) formData.append('admission_no', alumniReg.admission_no)
        if (alumniReg.ro_id) formData.append('ro_id', alumniReg.ro_id.toString())
        
        formData.append('public_display', alumniReg.public_display !== false ? 'true' : 'false')
        formData.append('photo', photoFile!)
        
        await dispatch(registerAlumni(formData)).unwrap()
      } else {
        // Employee registration fields
        const empReg = employeeRegistration
        formData.append('name', empReg.name)
        formData.append('fathername', empReg.fathername)
        formData.append('mobileno', empReg.mobileno)
        formData.append('emailid', empReg.emailid)
        formData.append('empcode', empReg.empcode)
        formData.append('tcyear', empReg.tcyear.toString())
        // Password not sent - will be handled by backend
        formData.append('gender', empReg.gender)
        formData.append('dob', empReg.dob || '1970-01-01')
        
        if (empReg.weddinganniversary) formData.append('weddinganniversary', empReg.weddinganniversary)
        
        formData.append('add1', empReg.add1)
        formData.append('add2', empReg.add2)
        formData.append('add3', empReg.add3)
        formData.append('add4', empReg.add4)
        formData.append('aboutme', empReg.aboutme)
        
        if (empReg.facebook) formData.append('facebook', empReg.facebook)
        if (empReg.twitter) formData.append('twitter', empReg.twitter)
        if (empReg.linkedin) formData.append('linkedin', empReg.linkedin)
        if (empReg.whatsapp) formData.append('whatsapp', empReg.whatsapp)
        if (empReg.blog) formData.append('blog', empReg.blog)
        
        formData.append('tcclass', empReg.tcclass)
        formData.append('contribution', empReg.contribution)
        formData.append('stateid', empReg.stateid.toString())
        formData.append('organization', empReg.organization)
        formData.append('organizerid', empReg.organizerid.toString())
        formData.append('userid', empReg.userid)
        
        if (empReg.note) formData.append('note', empReg.note)
        if (photoFile) formData.append('photo', photoFile)
        
        await dispatch(registerEmployee(formData)).unwrap()
      }
      
      router.push('/register/success')
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }, [dispatch, registration, employeeRegistration, photoFile, router, validateForm, userType])

  const years = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => new Date().getFullYear() - i),
    []
  )

  const classes = useMemo(() => 
    ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    []
  )

  const retirementYears = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => {
      const startYear = 1967 + i
      const endYear = (startYear + 1) % 100 // Get last 2 digits of next year
      return {
        value: startYear,
        label: `${startYear} - ${endYear.toString().padStart(2, '0')}`
      }
    }),
    []
  )

  // Handle tab change with localStorage persistence
  const handleTabChange = useCallback((tab: "alumni" | "ex-employee") => {
    setUserType(tab)
    if (typeof window !== 'undefined') {
      localStorage.setItem(TAB_STORAGE_KEY, tab)
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* Toggle Buttons */}
      <div className="flex gap-0 rounded-full border-2 border-[var(--theme-primary)] overflow-hidden w-fit ml-auto">
        <button
          type="button"
          onClick={() => handleTabChange("alumni")}
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
          onClick={() => handleTabChange("ex-employee")}
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
              value={userType === "alumni" ? alumniRegistration.name : employeeRegistration.name}
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
              value={userType === "alumni" ? (alumniRegistration.father_name || '') : employeeRegistration.fathername}
              onChange={(e) => handleInputChange(userType === "alumni" ? 'father_name' : 'fathername', e.target.value)}
              className={hasAttemptedSubmit && (validationErrors.father_name || validationErrors.fathername) ? inputErrorClassName : inputClassName}
            />
            {hasAttemptedSubmit && (validationErrors.father_name || validationErrors.fathername) && <p className="text-xs text-red-500">{validationErrors.father_name || validationErrors.fathername}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="mobile" className={labelClassName}>Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              value={userType === "alumni" ? (alumniRegistration.mobile_no || '') : employeeRegistration.mobileno}
              onChange={(e) => handleInputChange(userType === "alumni" ? 'mobile_no' : 'mobileno', e.target.value)}
              className={hasAttemptedSubmit && (validationErrors.mobile_no || validationErrors.mobileno) ? inputErrorClassName : inputClassName}
            />
            {hasAttemptedSubmit && (validationErrors.mobile_no || validationErrors.mobileno) && <p className="text-xs text-red-500">{validationErrors.mobile_no || validationErrors.mobileno}</p>}
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
                  value={userType === "alumni" ? alumniRegistration.email_id : employeeRegistration.emailid}
                  onChange={(e) => handleInputChange(userType === "alumni" ? 'email_id' : 'emailid', e.target.value)}
                  className={hasAttemptedSubmit && (validationErrors.email_id || validationErrors.emailid) ? inputErrorClassName : inputClassName}
                />
                {hasAttemptedSubmit && validationErrors.email_id && <p className="text-xs text-red-500">{validationErrors.email_id}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="state" className={labelClassName}>State</Label>
                <Select
                  value={userType === "alumni" ? alumniRegistration.state_id?.toString() : employeeRegistration.stateid?.toString()}
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
                  value={userType === "alumni" ? alumniRegistration.school_id?.toString() : ''}
                  onValueChange={(value) => handleInputChange('school_id', parseInt(value))}
                  disabled={schoolsLoading || !(userType === "alumni" ? alumniRegistration.state_id : employeeRegistration.stateid)}
                >
                  <SelectTrigger className={hasAttemptedSubmit && validationErrors.school_id ? inputErrorClassName : inputClassName}>
                    <SelectValue placeholder={schoolsLoading ? "Loading..." : !(userType === "alumni" ? alumniRegistration.state_id : employeeRegistration.stateid) ? "Select State first" : "Select School"} />
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
                  value={userType === "alumni" ? alumniRegistration.tc_year?.toString() : ''}
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
                  value={userType === "alumni" ? (alumniRegistration.tc_class || '') : ''}
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
                  value={userType === "alumni" ? (alumniRegistration.admission_no || '') : ''}
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
                <Label htmlFor="email" className={labelClassName}>
                  Email ID
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={employeeRegistration.emailid}
                  onChange={(e) => handleInputChange('emailid', e.target.value)}
                  className={hasAttemptedSubmit && validationErrors.emailid ? inputErrorClassName : inputClassName}
                />
                {hasAttemptedSubmit && validationErrors.emailid && <p className="text-xs text-red-500">{validationErrors.emailid}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="employeeCode" className={labelClassName}>
                  Employee Code
                </Label>
                <Input
                  id="employeeCode"
                  type="text"
                  value={employeeRegistration.empcode}
                  onChange={(e) => handleInputChange('empcode', e.target.value)}
                  className={hasAttemptedSubmit && validationErrors.empcode ? inputErrorClassName : inputClassName}
                />
                {hasAttemptedSubmit && validationErrors.empcode && <p className="text-xs text-red-500">{validationErrors.empcode}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="retirementYear" className={labelClassName}>
                  Retirement Year
                </Label>
                <Select
                  value={employeeRegistration.tcyear?.toString()}
                  onValueChange={(value) => handleInputChange('tcyear', parseInt(value))}
                >
                  <SelectTrigger className={hasAttemptedSubmit && validationErrors.tcyear ? inputErrorClassName : inputClassName}>
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {retirementYears.map((year) => (
                      <SelectItem key={year.value} value={year.value.toString()}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {hasAttemptedSubmit && validationErrors.tcyear && <p className="text-xs text-red-500">{validationErrors.tcyear}</p>}
              </div>
            </div>

            {/* Row 3: Retired From, Organization */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="retiredFrom" className={labelClassName}>
                  Retired From
                </Label>
                <Select
                  value={employeeRegistration.organizerid?.toString()}
                  onValueChange={(value) => handleInputChange('organizerid', parseInt(value))}
                >
                  <SelectTrigger className={hasAttemptedSubmit && validationErrors.organizerid ? inputErrorClassName : inputClassName}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">HQ</SelectItem>
                    <SelectItem value="2">ZIET</SelectItem>
                    <SelectItem value="3">RO</SelectItem>
                    <SelectItem value="4">KV</SelectItem>
                  </SelectContent>
                </Select>
                {hasAttemptedSubmit && validationErrors.organizerid && <p className="text-xs text-red-500">{validationErrors.organizerid}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="organization" className={labelClassName}>
                  Organization
                </Label>
                <Input
                  id="organization"
                  type="text"
                  value={employeeRegistration.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className={hasAttemptedSubmit && validationErrors.organization ? inputErrorClassName : inputClassName}
                />
                {hasAttemptedSubmit && validationErrors.organization && <p className="text-xs text-red-500">{validationErrors.organization}</p>}
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
