import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import cryptoshopReducer from '../features/cryptoshops/cryptoshopsSlice'
import geojsonReducer from '../features/geojson/geojsonSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cryptoshops: cryptoshopReducer,
    geojson: geojsonReducer,
  },
});
