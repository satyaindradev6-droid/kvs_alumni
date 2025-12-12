export interface LoginCredentials {
  email: string;
  password: string;
  type?: 'student' | 'employee';
}

export interface AuthUser {
  id: number;
  email: string;
  type: 'student' | 'employee';
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  id: number;
  token: string;
  message?: string;
}
