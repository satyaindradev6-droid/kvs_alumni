import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  alumni_id: string; // Changed from number to string (e.g., "E1", "E2" for employees)
  uuid: string;
  public_url: string | null;
  public_display: string;
  admission_no: string | null;
  emp_code?: string | null; // New field for employees
  name: string;
  mobile_no: string;
  email_id: string;
  profile_image: string | null;
  gender: string | null;
  dob: string | null;
  relationship_status: number | null; // Changed to number as per migration guide
  wedding_anniversary: string | null;
  add1: string | null;
  add2: string | null;
  add3: string | null;
  add4: string | null;
  role: number | null;
  father_name: string | null;
  about_me: string | null;
  experties: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  whatsapp: string | null;
  blog: string | null;
  tc_year: string | null; // Changed to string as per migration guide
  tc_class: string | null;
  contribution: string | null;
  state_id: number | null;
  ro_id: number | null;
  school_id: number | null;
  user_id: string | null; // Changed to string as per migration guide
  organizer_id: number | null; // Added missing field
  note: string | null;
  status: string | null;
  is_deleted: number; // Changed to number (0/1) as per migration guide
  created_by: number | null;
  created_at: string;
  updated_at: string;
  type: 'student' | 'employee';
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  isLoaded: boolean;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
  isLoaded: false,
};

// Async thunk for fetching user profile by ID
// Always fetches fresh data from API - no localStorage caching
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (forceRefresh: boolean = false, { rejectWithValue }) => {
    try {
      // Get token and user from localStorage
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        return rejectWithValue('No user logged in');
      }
      
      const user = JSON.parse(userStr);
      const alumniId = user.id; // This can now be string like "E1" for employees
      
      if (!alumniId) {
        return rejectWithValue('No alumni ID found');
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      console.log('Fetching fresh user profile from API:', { alumniId, apiUrl });
      
      const response = await fetch(`${apiUrl}/api/alumni/${alumniId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      
      console.log('User profile API response:', result);

      if (!response.ok) {
        return rejectWithValue(result.message || 'Failed to fetch user profile');
      }

      // Handle response - could be nested in alumni object or direct
      const profileData = result.alumni || result;
      
      return {
        ...profileData,
        type: user.type || 'student',
      } as UserProfile;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Network error';
      return rejectWithValue(errorMessage);
    }
  }
);


// Async thunk for refreshing user profile (always fetches fresh data)
export const refreshUserProfile = createAsyncThunk(
  'user/refreshProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        return rejectWithValue('No user logged in');
      }
      
      const user = JSON.parse(userStr);
      const alumniId = user.id;
      
      if (!alumniId) {
        return rejectWithValue('No alumni ID found');
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${apiUrl}/api/alumni/${alumniId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.message || 'Failed to fetch user profile');
      }

      const profileData = result.alumni || result;
      
      return {
        ...profileData,
        type: user.type || 'student',
      } as UserProfile;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Network error';
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserProfile: (state) => {
      state.profile = null;
      state.isLoaded = false;
      state.error = null;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.isLoaded = true;
    },
    // Force refresh - clears cache and requires new fetch
    invalidateProfile: (state) => {
      state.isLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoaded = true;
      })
      .addCase(refreshUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(refreshUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserProfile, setUserProfile, invalidateProfile } = userSlice.actions;
export default userSlice.reducer;
