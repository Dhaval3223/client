import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice'
import FAQReducer from '../features/FAQs/faqSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    FAQ: FAQReducer,
  },
});
