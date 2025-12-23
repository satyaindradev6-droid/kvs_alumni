"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Pencil, Trash2, X } from "lucide-react"
import { Education } from "@/types/profile"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  fetchMyEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "@/redux/slices/educationSlice"

export function EducationSection() {
  const dispatch = useAppDispatch()
  const { educations, loading, error } = useAppSelector((state) => state.education)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Education>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    dispatch(fetchMyEducations())
  }, [dispatch])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Validate required fields
    if (!formData.grade?.trim()) {
      newErrors.grade = 'Grade/Degree is required'
    } else if (formData.grade.trim().length < 2) {
      newErrors.grade = 'Grade/Degree must be at least 2 characters'
    }

    if (!formData.institute?.trim()) {
      newErrors.institute = 'Institute/University is required'
    } else if (formData.institute.trim().length < 2) {
      newErrors.institute = 'Institute/University must be at least 2 characters'
    }

    if (!formData.program?.trim()) {
      newErrors.program = 'Program/Field is required'
    } else if (formData.program.trim().length < 2) {
      newErrors.program = 'Program/Field must be at least 2 characters'
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

    // Validate end date format if provided
    if (!formData.end_date || !formData.end_date.trim()) {
      newErrors.end_date = 'End Date is required'
    } else if (formData.end_date && typeof formData.end_date === 'string' && formData.end_date.includes('-')) {
      const displayDate = formatDateForDisplay(formData.end_date)
      if (displayDate && displayDate.length === 10 && !validateDate(displayDate)) {
        newErrors.end_date = 'Invalid date. Please use dd-mm-yyyy format'
      }
    }

    // Validate date range
    if (formData.start_date && formData.end_date && !newErrors.start_date && !newErrors.end_date) {
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
      if (editingId) {
        await dispatch(updateEducation({ id: editingId, data: formData })).unwrap()
        alert('Education updated successfully!')
      } else {
        await dispatch(createEducation(formData)).unwrap()
        alert('Education added successfully!')
      }
      resetForm()
    } catch (err: any) {
      console.error('Error saving education:', err)
      alert(err || 'Failed to save education')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this education?')) return

    try {
      await dispatch(deleteEducation(id)).unwrap()
    } catch (err: any) {
      alert(err || 'Failed to delete education')
    }
  }

  const handleEdit = (education: Education) => {
    setFormData(education)
    setEditingId(education.id || null)
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

  const resetForm = () => {
    setFormData({})
    setEditingId(null)
    setErrors({})
  }

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
          <div className="p-2 bg-purple-100 rounded-lg">
            <GraduationCap className="h-5 w-5 text-purple-600" />
          </div>
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">
              {editingId ? 'Edit Education' : 'Add New Education'}
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
                <Label htmlFor="grade">Grade/Degree <span className="text-red-500">*</span></Label>
                <Input
                  id="grade"
                  value={formData.grade || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, grade: e.target.value })
                    if (errors.grade) setErrors({ ...errors, grade: '' })
                  }}
                  placeholder="Bachelor's, Master's, etc."
                  maxLength={50}
                  className={errors.grade ? 'border-red-500' : ''}
                />
                {errors.grade && <p className="text-red-500 text-sm">{errors.grade}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="program">Program/Field <span className="text-red-500">*</span></Label>
                <Input
                  id="program"
                  value={formData.program || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, program: e.target.value })
                    if (errors.program) setErrors({ ...errors, program: '' })
                  }}
                  placeholder="Computer Science, MBA, etc."
                  maxLength={100}
                  className={errors.program ? 'border-red-500' : ''}
                />
                {errors.program && <p className="text-red-500 text-sm">{errors.program}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="institute">Institute/University <span className="text-red-500">*</span></Label>
                <Input
                  id="institute"
                  value={formData.institute || ''}
                  onChange={(e) => {
                    setFormData({ ...formData, institute: e.target.value })
                    if (errors.institute) setErrors({ ...errors, institute: '' })
                  }}
                  placeholder="University name"
                  maxLength={150}
                  className={errors.institute ? 'border-red-500' : ''}
                />
                {errors.institute && <p className="text-red-500 text-sm">{errors.institute}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edu-location">Location <span className="text-red-500">*</span></Label>
                <Input
                  id="edu-location"
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
                <Label htmlFor="start-date">Start Date <span className="text-red-500">*</span></Label>
                <Input
                  id="start-date"
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
                <Label htmlFor="end-date">End Date <span className="text-red-500">*</span></Label>
                <Input
                  id="end-date"
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
                  className={errors.end_date ? 'border-red-500' : ''}
                />
                {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date}</p>}
              </div>
            </div>

          <div className="flex gap-2 justify-end">
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {educations.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No education records added yet.</p>
          ) : (
            educations.map((edu) => (
              <div
                key={edu.id}
                className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">
                      {edu.grade} {edu.program && `in ${edu.program}`}
                    </h4>
                    <p className="text-slate-700 mt-1">{edu.institute}</p>
                    <p className="text-slate-500 text-sm mt-1">{edu.location}</p>
                    <p className="text-slate-400 text-sm mt-2">
                      {edu.start_date && new Date(edu.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {edu.end_date ? new Date(edu.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(edu)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(edu.id!)}
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
