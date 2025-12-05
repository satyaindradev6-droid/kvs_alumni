import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AlumniRegistration, AlumniState } from '@/types/alumni';

const initialState: AlumniState = {
  registration: {
    name: '',
    email_id: '',
    public_display: true,
  },
  loading: false,
  error: null,
  success: false,
};

// Async thunk for registration
export const registerAlumni = createAsyncThunk(
  'alumni/register',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${apiUrl}/api/alumni/register-student`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser sets it automatically with boundary
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors from API
        if (result.error && result.details) {
          const errorMessages = result.details.map((d: any) => `${d.field}: ${d.message}`).join(', ');
          return rejectWithValue(errorMessages);
        }
        return rejectWithValue(result.message || result.error || 'Registration failed');
      }

      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const alumniSlice = createSlice({
  name: 'alumni',
  initialState,
  reducers: {
    updateRegistrationField: (
      state,
      action: PayloadAction<{ field: keyof AlumniRegistration; value: any }>
    ) => {
      (state.registration as any)[action.payload.field] = action.payload.value;
    },
    updateRegistration: (state, action: PayloadAction<Partial<AlumniRegistration>>) => {
      state.registration = { ...state.registration, ...action.payload };
    },
    resetRegistration: (state) => {
      state.registration = initialState.registration;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAlumni.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerAlumni.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.registration = initialState.registration;
      })
      .addCase(registerAlumni.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const {
  updateRegistrationField,
  updateRegistration,
  resetRegistration,
  clearError,
} = alumniSlice.actions;

export default alumniSlice.reducer;
