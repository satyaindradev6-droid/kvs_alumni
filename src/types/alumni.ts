export interface AlumniRegistration {
  // Basic Info
  admission_no?: string;
  name: string;
  mobile_no?: string;
  email_id: string;
  password?: string;
  
  // Profile
  profile_image?: string;
  gender?: string;
  dob?: string;
  relationship_status?: string;
  wedding_anniversary?: string;
  
  // Address
  add1?: string;
  add2?: string;
  add3?: string;
  add4?: string;
  
  // Professional
  role?: string;
  about_me?: string;
  experties?: string;
  
  // Social Media
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  whatsapp?: string;
  blog?: string;
  
  // Academic
  tc_year?: number;
  tc_class?: string;
  contribution?: string;
  
  // Relations
  father_name?: string;
  state_id?: number;
  ro_id?: number;
  school_id?: number;
  
  // Settings
  public_display?: boolean;
}

export interface AlumniState {
  registration: AlumniRegistration;
  loading: boolean;
  error: string | null;
  success: boolean;
}
