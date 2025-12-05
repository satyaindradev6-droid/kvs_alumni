import { z } from "zod"

// Alumni Registration Schema
export const alumniRegistrationSchema = z
  .object({
    name: z.string().optional(),
    father_name: z.string().optional(),
    mobile_no: z.string().optional(),
    email_id: z.string().optional(),
    state_id: z.number().optional(),
    school_id: z.number().optional(),
    tc_year: z.number().optional(),
    tc_class: z.string().optional(),
    admission_no: z.string().optional(),
    ro_id: z.number().optional(),
    public_display: z.boolean().default(true),
  })
  .refine((data) => data.name && data.name.trim().length >= 2, {
    message: "Name is required",
    path: ["name"],
  })
  .refine((data) => data.name && /^[a-zA-Z\s]+$/.test(data.name), {
    message: "Name can only contain letters and spaces",
    path: ["name"],
  })
  .refine((data) => data.father_name && data.father_name.trim().length >= 2, {
    message: "Father Name is required",
    path: ["father_name"],
  })
  .refine((data) => data.father_name && /^[a-zA-Z\s]+$/.test(data.father_name), {
    message: "Father Name can only contain letters and spaces",
    path: ["father_name"],
  })
  .refine((data) => data.mobile_no && /^[6-9]\d{9}$/.test(data.mobile_no), {
    message: "Mobile Number is required",
    path: ["mobile_no"],
  })
  .refine((data) => data.email_id && data.email_id.includes("@"), {
    message: "Email ID is required",
    path: ["email_id"],
  })
  .refine((data) => data.state_id && data.state_id > 0, {
    message: "State is required",
    path: ["state_id"],
  })
  .refine((data) => data.school_id && data.school_id > 0, {
    message: "School is required",
    path: ["school_id"],
  })
  .refine((data) => data.tc_year && data.tc_year >= 1950, {
    message: "Year of Issue of TC is required",
    path: ["tc_year"],
  })
  .refine((data) => data.tc_class && data.tc_class.length > 0, {
    message: "Class Studied while taking TC is required",
    path: ["tc_class"],
  })

// Ex-Employee Registration Schema
export const exEmployeeRegistrationSchema = z
  .object({
    name: z.string().optional(),
    father_name: z.string().optional(),
    mobile_no: z.string().optional(),
    email_id: z.string().optional(),
    admission_no: z.string().optional(),
    tc_year: z.number().optional(),
    ro_id: z.number().optional(),
    school_id: z.number().optional(),
    public_display: z.boolean().default(true),
  })
  .refine((data) => data.name && data.name.trim().length >= 2, {
    message: "Name is required",
    path: ["name"],
  })
  .refine((data) => data.name && /^[a-zA-Z\s]+$/.test(data.name), {
    message: "Name can only contain letters and spaces",
    path: ["name"],
  })
  .refine((data) => data.father_name && data.father_name.trim().length >= 2, {
    message: "Father Name is required",
    path: ["father_name"],
  })
  .refine((data) => data.father_name && /^[a-zA-Z\s]+$/.test(data.father_name), {
    message: "Father Name can only contain letters and spaces",
    path: ["father_name"],
  })
  .refine((data) => data.mobile_no && /^[6-9]\d{9}$/.test(data.mobile_no), {
    message: "Mobile Number is required",
    path: ["mobile_no"],
  })
  .refine((data) => data.email_id && data.email_id.includes("@"), {
    message: "Email ID is required",
    path: ["email_id"],
  })

// Photo validation
export const photoSchema = z
  .instanceof(File, { message: "Photo is required" })
  .refine((file) => file.size <= 5 * 1024 * 1024, "Photo must be less than 5MB")
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Photo must be JPEG, PNG, or WebP"
  )

export type AlumniRegistration = z.infer<typeof alumniRegistrationSchema>
export type ExEmployeeRegistration = z.infer<typeof exEmployeeRegistrationSchema>
