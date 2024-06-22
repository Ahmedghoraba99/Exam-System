import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { createSelector } from '@reduxjs/toolkit';


export const fetchExams = createAsyncThunk(
  'exams/fetchExams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/exams');
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchExamById = createAsyncThunk(
  'exams/fetchExamById',
  async (examId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/exams/${examId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const submitExam = createAsyncThunk(
  'exams/submitExam',
  async ({ userId, examId, score }, { rejectWithValue }) => {
    console.log('Submitting exam with:', { userId, examId, score });

    try {
      const response = await axiosInstance.post('/results/submit', { user: userId, exam: examId, score });
      return response.data;
    } catch (error) {
      console.error('Error submitting exam:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
  

// Initial state for exams slice
const initialState = {
  exams: [],
  loading: false,
  error: null,
  submitted: false, 
};

// Slice for exams
const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchExamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.exams.push(action.payload);
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitExam.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submitted = false;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.submitted = true;
        console.log('Exam submitted:', action.payload);
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.submitted = false;
      });
  },
});

export default examSlice.reducer;

const selectExamState = state => state.exams;


export const examsSelectors = {
    selectAllExams: createSelector(
      selectExamState,
      (exams) => exams.exams
    ),
    selectExamsLoading: createSelector(
      selectExamState,
      (exams) => exams.loading
    ),
    selectExamsError: createSelector(
      selectExamState,
      (exams) => exams.error
    ),
    selectExamById: (examId) =>
      createSelector(selectExamState, (exams) =>
        exams.exams.find((exam) => exam._id === examId)
      ),
    selectExamSubmitted: createSelector(
      selectExamState,
      (exams) => exams.submitted
    ),
  };

