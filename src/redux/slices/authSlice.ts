import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  type: 'student' | 'employee';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
  type?: 'student' | 'employee';
}

interface LoginResponse {
  id: number;
  token: string;
  email: string;
  type: 'student' | 'employee';
}

// Helper to get initial state from localStorage
const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const userType = localStorage.getItem('userType') as 'student' | 'employee' | null;
    
    if (token && userId) {
      return {
        user: {
          id: parseInt(userId),
          email: userEmail || '',
          type: userType || 'student',
        },
        token,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    }
  }
  
  return {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  };
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${apiUrl}/api/alumni/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.message || result.error || 'Login failed');
      }

      // Store in localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.id.toString());
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('userType', credentials.type || 'student');

      return {
        ...result,
        email: credentials.email,
        type: credentials.type || 'student',
      } as LoginResponse;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for fetching user data
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const { user, token } = state.auth;
      
      if (!user?.id || !token) {
        return rejectWithValue('No user logged in');
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${apiUrl}/api/alumni/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.message || 'Failed to fetch user');
      }

      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userType');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');
        const userType = localStorage.getItem('userType') as 'student' | 'employee' | null;
        
        if (token && userId) {
          state.token = token;
          state.user = {
            id: parseInt(userId),
            email: userEmail || '',
            type: userType || 'student',
          };
          state.isAuthenticated = true;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          type: action.payload.type,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
