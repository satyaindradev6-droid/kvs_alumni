"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase, Pencil, Trash2, X } from "lucide-react"
import { Experience } from "@/types/profile"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchMyExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/redux/slices/experienceSlice"

export function ExperienceSection() {
  const dispatch = useAppDispatch()
  const { experiences, loading, error } = useAppSelector((state) => state.experience)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Experience>({})
  const [isCurrent, setIsCurrent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    dispatch(fetchMyExperiences())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Validate required fields
    if (!formData.designation?.trim()) {
      newErrors.designation = 'Designation/Role is required'
    } else if (formData.designation.trim().length < 2) {
      newErrors.designation = 'Designation/Role must be at least 2 characters'
    }

    if (!formData.company_name?.trim()) {
      newErrors.company_name = 'Company Name is required'
    } else if (formData.company_name.trim().length < 2) {
      newErrors.company_name = 'Company Name must be at least 2 characters'
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required'
    } else if (formData.location.trim().length < 2) {
      newErrors.location = 'Location must be at least 2 characters'
    }

    // Validate start date format if provided
    if (!formData.start_date || !formData.start_date.trim()) {
      newErrors.start_date = 'Start Date is required'
    } else if (formData.start_date && typeof formData.start_date === 'string' && formData.start_date.includes('-')) {
      const displayDate = formatDateForDisplay(formData.start_date)
      if (displayDate && displayDate.length === 10 && !validateDate(displayDate)) {
        newErrors.start_date = 'Invalid date. Please use dd-mm-yyyy format'
      } else if (formData.start_date) {
        const startDate = new Date(formData.start_date)
        const tenYearsFromNow = new Date()
        tenYearsFromNow.setFullYear(tenYearsFromNow.getFullYear() + 10)
        
        if (startDate > tenYearsFromNow) {
          newErrors.start_date = 'Start Date cannot be more than 10 years in the future'
        }
      }
    }

    // Validate end date format if provided (only if not current)
    if (!isCurrent) {
      if (!formData.end_date || !formData.end_date.trim()) {
        newErrors.end_date = 'End Date is required (or check "I currently work here")'
      } else if (formData.end_date && typeof formData.end_date === 'string' && formData.end_date.includes('-')) {
        const displayDate = formatDateForDisplay(formData.end_date)
        if (displayDate && displayDate.length === 10 && !validateDate(displayDate)) {
          newErrors.end_date = 'Invalid date. Please use dd-mm-yyyy format'
        } else if (formData.end_date) {
          const endDate = new Date(formData.end_date)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          
          if (endDate > today) {
            newErrors.end_date = 'End Date cannot be in the future. Check "I currently work here" if this is your current job'
          }
        }
      }
    }

    // Validate date range
    if (formData.start_date && formData.end_date && !isCurrent && !newErrors.start_date && !newErrors.end_date) {
      const startDate = new Date(formData.start_date)
      const endDate = new Date(formData.end_date)
      
      if (endDate < startDate) {
        newErrors.end_date = 'End Date cannot be before Start Date'
      }
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    try {
      const submitData = {
        ...formData,
        end_date: isCurrent ? null : formData.end_date
      }

      if (editingId) {
        await dispatch(updateExperience({ id: editingId, data: submitData })).unwrap()
        alert('Experience updated successfully!')
      } else {
        await dispatch(createExperience(submitData)).unwrap()
        alert('Experience added successfully!')
      }
      resetForm()
    } catch (err: any) {
      console.error('Error saving experience:', err)
      alert(err || 'Failed to save experience')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return

    try {
      await dispatch(deleteExperience(id)).unwrap()
    } catch (err: any) {
      alert(err || 'Failed to delete experience')
    }
  }

  const handleEdit = (experience: Experience) => {
    setFormData(experience)
    setEditingId(experience.id || null)
    setIsCurrent(experience.end_date === null)
  }

  // Helper function to format date for display (dd-mm-yyyy)
  const formatDateForDisplay = (dateString: string | undefined) => {
    if (!dateString) return ''
    
    // If already in display format (dd-mm-yyyy), return as is
    if (dateString.match(/^\d{2}-\d{2}-\d{4}$/)) {
      return dateString
    }
    
    // Convert from yyyy-mm-dd to dd-mm-yyyy
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  // Helper function to parse date from dd-mm-yyyy to yyyy-mm-dd for storage
  const parseDateFromDisplay = (displayDate: string) => {
    if (!displayDate) return ''
    const parts = displayDate.split('-')
    if (parts.length !== 3) return displayDate
    const [day, month, year] = parts
    if (year && month && day && year.length === 4) {
      return `${year}-${month}-${day}`
    }
    return displayDate
  }

  const validateDate = (dateStr: string): boolean => {
    if (!dateStr || dateStr.length !== 10) return false
    const [day, month, year] = dateStr.split('-').map(Number)
    
    if (!day || !month || !year) return false
    if (day < 1 || day > 31) return false
    if (month < 1 || month > 12) return false
    if (year < 1900 || year > new Date().getFullYear() + 10) return false
    
    // Check valid date
    const date = new Date(year, month - 1, day)
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year
  }

  const resetForm = () => {
    setFormData({})
    setEditingId(null)
    setIsCurrent(false)
    setErrors({})
  }

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Briefcase className="h-5 w-5 text-blue-600" />
          </div>
          Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Add/Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">
              {editingId ? 'Edit Experience' : 'Add New Experience'}
            </h3>
            {editingId && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetForm}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="designation">Designation/Role <span className="text-red-500">*</span></Label>
              <Input
                id="designation"
                value={formData.designation || ''}
                onChange={(e) => {
                  setFormData({ ...formData, designation: e.target.value })
                  if (errors.designation) setErrors({ ...errors, designation: '' })
                }}
                placeholder="Software Engineer, Manager, etc."
                maxLength={100}
                className={errors.designation ? 'border-red-500' : ''}
              />
              {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name <span className="text-red-500">*</span></Label>
              <Input
                id="company"
                value={formData.company_name || ''}
                onChange={(e) => {
                  setFormData({ ...formData, company_name: e.target.value })
                  if (errors.company_name) setErrors({ ...errors, company_name: '' })
                }}
                placeholder="Company name"
                maxLength={150}
                className={errors.company_name ? 'border-red-500' : ''}
              />
              {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="exp-location">Location <span className="text-red-500">*</span></Label>
              <Input
                id="exp-location"
                value={formData.location || ''}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value })
                  if (errors.location) setErrors({ ...errors, location: '' })
                }}
                placeholder="City, State"
                maxLength={100}
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="exp-start-date">Start Date <span className="text-red-500">*</span></Label>
              <Input
                id="exp-start-date"
                type="text"
                value={formatDateForDisplay(formData.start_date)}
                onChange={(e) => {
                  const value = e.target.value
                  if (errors.start_date) setErrors({ ...errors, start_date: '' })
                  // Allow only numbers and dashes
                  if (/^[\d-]*$/.test(value)) {
                    // Auto-format as user types
                    let formatted = value.replace(/[^\d]/g, '')
                    if (formatted.length >= 2) {
                      formatted = formatted.slice(0, 2) + '-' + formatted.slice(2)
                    }
                    if (formatted.length >= 5) {
                      formatted = formatted.slice(0, 5) + '-' + formatted.slice(5, 9)
                    }
                    // Update only if valid format or still typing
                    if (formatted.length === 10) {
                      setFormData({ ...formData, start_date: parseDateFromDisplay(formatted) })
                    } else if (formatted.length < 10) {
                      setFormData({ ...formData, start_date: formatted })
                    }
                  }
                }}
                placeholder="dd-mm-yyyy"
                maxLength={10}
                className={errors.start_date ? 'border-red-500' : ''}
              />
              {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="exp-end-date">End Date {!isCurrent && <span className="text-red-500">*</span>}</Label>
              <Input
                id="exp-end-date"
                type="text"
                value={formatDateForDisplay(formData.end_date)}
                onChange={(e) => {
                  const value = e.target.value
                  if (errors.end_date) setErrors({ ...errors, end_date: '' })
                  // Allow only numbers and dashes
                  if (/^[\d-]*$/.test(value)) {
                    // Auto-format as user types
                    let formatted = value.replace(/[^\d]/g, '')
                    if (formatted.length >= 2) {
                      formatted = formatted.slice(0, 2) + '-' + formatted.slice(2)
                    }
                    if (formatted.length >= 5) {
                      formatted = formatted.slice(0, 5) + '-' + formatted.slice(5, 9)
                    }
                    // Update only if valid format or still typing
                    if (formatted.length === 10) {
                      setFormData({ ...formData, end_date: parseDateFromDisplay(formatted) })
                    } else if (formatted.length < 10) {
                      setFormData({ ...formData, end_date: formatted })
                    }
                  }
                }}
                placeholder="dd-mm-yyyy"
                maxLength={10}
                disabled={isCurrent}
                className={errors.end_date ? 'border-red-500' : ''}
              />
              {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date}</p>}
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="current"
                  checked={isCurrent}
                  onCheckedChange={(checked) => {
                    setIsCurrent(checked as boolean)
                    if (checked) {
                      setFormData({ ...formData, end_date: undefined })
                      setErrors({ ...errors, end_date: '' })
                    }
                  }}
                />
                <Label htmlFor="current" className="text-sm font-normal cursor-pointer">
                  I currently work here
                </Label>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No experience records added yet.</p>
          ) : (
            experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{exp.designation}</h4>
                    <p className="text-slate-700 mt-1">{exp.company_name}</p>
                    <p className="text-slate-500 text-sm mt-1">{exp.location}</p>
                    <p className="text-slate-400 text-sm mt-2">
                      {exp.start_date && new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(exp)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(exp.id!)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
