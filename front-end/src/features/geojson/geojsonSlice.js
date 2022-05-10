import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import geojsonService from './geojsonService'

const initialState = {
  geojsons: {},
  isError: false,
  isCreating: false,
  isCreated: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new geojson
export const createGeoJson = createAsyncThunk(
  'geojsons/createGeo',
  async (geojsonData, thunkAPI) => {
    try {
      let output = await geojsonService.testfunc(geojsonData)
      return output
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get geojsons
export const getGeoJsons = createAsyncThunk(
  'geojsons/geojsons',
  async (input, thunkAPI) => {
    try {
      const output = await geojsonService.getGeoJsons()
      // console.log("OUTPUT:", output)
      return output
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const geojsonsSlice = createSlice({
  name: 'geojson',
  initialState,
  reducers: {
    resetGeoJson: (state) => initialState,

    createGeo: (state, action) => {
      return "None"
    },

    getGeoJson: (state) => {
      return state.geojsons
    },

    create: (state, action) => {
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGeoJson.pending, (state) => {
        state.isCreating = true
      })
      .addCase(createGeoJson.fulfilled, (state, action) => {
        state.isCreating = false
        state.isCreated = true
        state.geojsons = action.payload
      })
      .addCase(createGeoJson.rejected, (state, action) => {
        state.isCreating = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGeoJsons.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGeoJsons.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getGeoJsons.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetGeoJson } = geojsonsSlice.actions
export default geojsonsSlice.reducer
