import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import cryptoshopReducer from '../features/cryptoshops/cryptoshopsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cryptoshops: cryptoshopReducer
  },
});
