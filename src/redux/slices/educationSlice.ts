import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Education } from '@/types/profile';

interface EducationState {
  educations: Education[];
  loading: boolean;
  error: string | null;
  currentEducation: Education | null;
}

const initialState: EducationState = {
  educations: [],
  loading: false,
  error: null,
  currentEducation: null,
};

// Helper to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper to get API URL
const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Fetch my educations
export const fetchMyEducations = createAsyncThunk(
  'education/fetchMyEducations',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/educations/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch educations');
      }

      const result = await response.json();
      return result.data || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Fetch educations by alumni ID
export const fetchEducationsByAlumni = createAsyncThunk(
  'education/fetchEducationsByAlumni',
  async (alumniId: string, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/educations/alumni/${alumniId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch educations');
      }

      const result = await response.json();
      return result.data || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Fetch single education
export const fetchEducationById = createAsyncThunk(
  'education/fetchEducationById',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/educations/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch education');
      }

      const result = await response.json();
      return result.data || result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Create education
export const createEducation = createAsyncThunk(
  'education/createEducation',
  async (educationData: Omit<Education, 'id' | 'created_at' | 'updated_at'>, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/educations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(educationData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to create education');
      }

      const result = await response.json();
      return result.data || result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Update education
export const updateEducation = createAsyncThunk(
  'education/updateEducation',
  async ({ id, data }: { id: number; data: Partial<Education> }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/educations/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to update education');
      }

      const result = await response.json();
      return result.data || result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Delete education
export const deleteEducation = createAsyncThunk(
  'education/deleteEducation',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/educations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to delete education');
      }

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    clearEducations: (state) => {
      state.educations = [];
      state.error = null;
    },
    clearCurrentEducation: (state) => {
      state.currentEducation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch My Educations
      .addCase(fetchMyEducations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyEducations.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = action.payload;
      })
      .addCase(fetchMyEducations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Educations by Alumni
      .addCase(fetchEducationsByAlumni.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducationsByAlumni.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = action.payload;
      })
      .addCase(fetchEducationsByAlumni.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Education by ID
      .addCase(fetchEducationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEducation = action.payload;
      })
      .addCase(fetchEducationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Education
      .addCase(createEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educations.push(action.payload);
      })
      .addCase(createEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Education
      .addCase(updateEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.educations.findIndex(edu => edu.id === action.payload.id);
        if (index !== -1) {
          state.educations[index] = action.payload;
        }
      })
      .addCase(updateEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Education
      .addCase(deleteEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.educations = state.educations.filter(edu => edu.id !== action.payload);
      })
      .addCase(deleteEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEducations, clearCurrentEducation } = educationSlice.actions;
export default educationSlice.reducer;
