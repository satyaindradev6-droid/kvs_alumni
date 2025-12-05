import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface State {
  id: number;
  name: string;
}

export interface School {
  id: number;
  kv_id: number;
  name: string;
  state_id: number;
}

interface LocationState {
  states: State[];
  schools: School[];
  statesLoading: boolean;
  schoolsLoading: boolean;
  statesError: string | null;
  schoolsError: string | null;
}

const initialState: LocationState = {
  states: [],
  schools: [],
  statesLoading: false,
  schoolsLoading: false,
  statesError: null,
  schoolsError: null,
};

// Helper to extract array from API response
const extractArray = (data: any): any[] => {
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.states && Array.isArray(data.states)) return data.states;
  if (data?.schools && Array.isArray(data.schools)) return data.schools;
  return [];
};

// Normalize state object to ensure id and name properties
const normalizeState = (item: any): State => ({
  id: item.id ?? item.state_id ?? item.stateId ?? 0,
  name: item.name ?? item.state_name ?? item.stateName ?? '',
});

// Normalize school object to ensure id, kv_id and name properties
const normalizeSchool = (item: any): School => ({
  id: item.id ?? item.school_id ?? item.schoolId ?? 0,
  kv_id: item.kv_id ?? item.kvId ?? item.id ?? 0,
  name: item.name ?? item.school_name ?? item.schoolName ?? '',
  state_id: item.state_id ?? item.stateId ?? 0,
});

// Fetch all states
export const fetchStates = createAsyncThunk(
  'location/fetchStates',
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/states`);
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch states');
      }
      
      const result = await response.json();
      const arr = extractArray(result);
      return arr.map(normalizeState);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Fetch schools by state ID
export const fetchSchoolsByState = createAsyncThunk(
  'location/fetchSchoolsByState',
  async (stateId: number, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/states/${stateId}/schools`);
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch schools');
      }
      
      const result = await response.json();
      const arr = extractArray(result);
      return arr.map(normalizeSchool);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    clearSchools: (state) => {
      state.schools = [];
      state.schoolsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch States
      .addCase(fetchStates.pending, (state) => {
        state.statesLoading = true;
        state.statesError = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.statesLoading = false;
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.statesLoading = false;
        state.statesError = action.payload as string;
      })
      // Fetch Schools
      .addCase(fetchSchoolsByState.pending, (state) => {
        state.schoolsLoading = true;
        state.schoolsError = null;
      })
      .addCase(fetchSchoolsByState.fulfilled, (state, action) => {
        state.schoolsLoading = false;
        state.schools = action.payload;
      })
      .addCase(fetchSchoolsByState.rejected, (state, action) => {
        state.schoolsLoading = false;
        state.schoolsError = action.payload as string;
      });
  },
});

export const { clearSchools } = locationSlice.actions;
export default locationSlice.reducer;
