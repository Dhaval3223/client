import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import faqService from './faqService';

const initialState = {
  FAQs: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
}

// Creat new AFQ
export const createFAQ = createAsyncThunk('faqs/create', async (faqData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await faqService.createFAQ(faqData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Get FAQs
export const getFAQs = createAsyncThunk('faqs/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await faqService.getFAQs(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// Delete AFQ
export const deleteFAQ = createAsyncThunk('faqs/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await faqService.deleteFAQ(id, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const FAQSlice = createSlice({
  name: 'FAQ',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFAQ.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createFAQ.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.FAQs.push(action.payload)
      })
      .addCase(createFAQ.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFAQs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFAQs.fulfilled, (state, action) => {
        console.log('action', action.payload);
        state.isLoading = false
        state.isSuccess = true
        state.FAQs = action.payload
      })
      .addCase(getFAQs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteFAQ.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteFAQ.fulfilled, (state, action) => {
        console.log('action', action.payload);
        state.isLoading = false
        state.isSuccess = true
        state.FAQs = state.FAQs.filter(item => item._id !== action.payload.id)
      })
      .addCase(deleteFAQ.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = FAQSlice.actions;
export default FAQSlice.reducer;