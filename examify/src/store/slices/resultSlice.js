import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';

export const fetchUserResults = createAsyncThunk(
  'results/fetchUserResults',
  async (userId) => {
    const response = await axiosInstance.get(`/results/user/${userId}`);
    return response.data;
  }
);

// Initial state for results slice
const initialState = {
  results: [],
  loading: false,
  error: null,
};

// Slice for results
const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserResults.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.results = action.payload;
      })
      .addCase(fetchUserResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default resultsSlice.reducer;

export const resultsSelectors = {
  selectAllResults: (state) => state.results.results,
  selectResultsLoading: (state) => state.results.loading,
  selectResultsError: (state) => state.results.error,
};
