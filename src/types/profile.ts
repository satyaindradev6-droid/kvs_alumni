// Education Types
export interface Education {
  id?: number;
  alumni_id?: string;
  grade?: string;
  program?: string;
  institute?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
}

// Experience Types
export interface Experience {
  id?: number;
  alumni_id?: string;
  designation?: string;
  company_name?: string;
  location?: string;
  start_date?: string;
  end_date?: string | null;
  created_at?: string;
  updated_at?: string;
}
