export interface EmployeeRegistration {
  // Basic Info
  name: string;
  fathername: string;
  mobileno: string;
  emailid: string;
  empcode: string;
  tcyear: number;
  photo?: File | string;
  password: string;
  publicurl: string;
  
  // Personal Details
  gender: string;
  dob: string;
  relationshipstatus: number;
  weddinganniversary?: string;
  
  // Address
  add1: string;
  add2: string;
  add3: string;
  add4: string;
  
  // Professional & Social
  aboutme: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  whatsapp?: string;
  blog?: string;
  
  // Academic & Organization
  tcclass: string;
  contribution: string;
  stateid: number;
  organization: string;
  organizerid: number;
  
  // System
  userid: string;
  note?: string;
}

export interface EmployeeState {
  registration: EmployeeRegistration;
  loading: boolean;
  error: string | null;
  success: boolean;
}
