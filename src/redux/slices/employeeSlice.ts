import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeRegistration, EmployeeState } from '@/types/employee';

const initialState: EmployeeState = {
  registration: {
    name: '',
    fathername: '',
    mobileno: '',
    emailid: '',
    empcode: '',
    tcyear: new Date().getFullYear(),
    password: '',
    publicurl: '',
    gender: 'M', // Default gender
    dob: '',
    relationshipstatus: 1,
    add1: '',
    add2: '',
    add3: '',
    add4: '',
    aboutme: '',
    tcclass: '',
    contribution: '',
    stateid: 1,
    organization: '',
    organizerid: 1,
    userid: '',
  },
  loading: false,
  error: null,
  success: false,
};

// Async thunk for employee registration
export const registerEmployee = createAsyncThunk(
  'employee/register',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      
      const response = await fetch(`${apiUrl}/api/alumni/register-employee`, {
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

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    updateEmployeeField: (
      state,
      action: PayloadAction<{ field: keyof EmployeeRegistration; value: any }>
    ) => {
      (state.registration as any)[action.payload.field] = action.payload.value;
    },
    updateEmployeeRegistration: (state, action: PayloadAction<Partial<EmployeeRegistration>>) => {
      state.registration = { ...state.registration, ...action.payload };
    },
    resetEmployeeRegistration: (state) => {
      state.registration = initialState.registration;
      state.error = null;
      state.success = false;
    },
    clearEmployeeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerEmployee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.registration = initialState.registration;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const {
  updateEmployeeField,
  updateEmployeeRegistration,
  resetEmployeeRegistration,
  clearEmployeeError,
} = employeeSlice.actions;

export default employeeSlice.reducer;
