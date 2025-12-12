import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  alumniId: number;
  uuid: string;
  publicurl: string | null;
  empcode: string | null;
  name: string;
  mobileno: string;
  emailId: string;
  token: string | null;
  profileImage: string | null;
  gender: string;
  dob: string;
  relationshipstatus: string | null;
  weddinganniversary: string | null;
  add1: string | null;
  add2: string | null;
  add3: string | null;
  add4: string | null;
  role: number;
  fathername: string | null;
  aboutme: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
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
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      // Get token and user from localStorage
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
      
      console.log('Fetching user profile:', { alumniId, apiUrl });
      
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
      });
  },
});

export const { clearUserProfile, setUserProfile } = userSlice.actions;
export default userSlice.reducer;
