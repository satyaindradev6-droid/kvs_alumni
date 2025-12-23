import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Experience } from '@/types/profile';

interface ExperienceState {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  currentExperience: Experience | null;
}

const initialState: ExperienceState = {
  experiences: [],
  loading: false,
  error: null,
  currentExperience: null,
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

// Fetch my experiences
export const fetchMyExperiences = createAsyncThunk(
  'experience/fetchMyExperiences',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/experiences/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch experiences');
      }

      const result = await response.json();
      return result.data || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Fetch experiences by alumni ID
export const fetchExperiencesByAlumni = createAsyncThunk(
  'experience/fetchExperiencesByAlumni',
  async (alumniId: string, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/experiences/alumni/${alumniId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch experiences');
      }

      const result = await response.json();
      return result.data || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Fetch single experience
export const fetchExperienceById = createAsyncThunk(
  'experience/fetchExperienceById',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/experiences/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to fetch experience');
      }

      const result = await response.json();
      return result.data || result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Create experience
export const createExperience = createAsyncThunk(
  'experience/createExperience',
  async (experienceData: Omit<Experience, 'id' | 'created_at' | 'updated_at'>, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/experiences`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experienceData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to create experience');
      }

      const result = await response.json();
      return result.data || result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Update experience
export const updateExperience = createAsyncThunk(
  'experience/updateExperience',
  async ({ id, data }: { id: number; data: Partial<Experience> }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/experiences/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to update experience');
      }

      const result = await response.json();
      return result.data || result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Delete experience
export const deleteExperience = createAsyncThunk(
  'experience/deleteExperience',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${getApiUrl()}/api/experiences/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Failed to delete experience');
      }

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    clearExperiences: (state) => {
      state.experiences = [];
      state.error = null;
    },
    clearCurrentExperience: (state) => {
      state.currentExperience = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch My Experiences
      .addCase(fetchMyExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = action.payload;
      })
      .addCase(fetchMyExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Experiences by Alumni
      .addCase(fetchExperiencesByAlumni.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperiencesByAlumni.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = action.payload;
      })
      .addCase(fetchExperiencesByAlumni.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Experience by ID
      .addCase(fetchExperienceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperienceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentExperience = action.payload;
      })
      .addCase(fetchExperienceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Experience
      .addCase(createExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences.push(action.payload);
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Experience
      .addCase(updateExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.experiences.findIndex(exp => exp.id === action.payload.id);
        if (index !== -1) {
          state.experiences[index] = action.payload;
        }
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Experience
      .addCase(deleteExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = state.experiences.filter(exp => exp.id !== action.payload);
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearExperiences, clearCurrentExperience } = experienceSlice.actions;
export default experienceSlice.reducer;
