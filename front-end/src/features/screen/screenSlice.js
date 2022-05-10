import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ScreenService from './screenService'

const initialState = {
  screen: {},
  isError: false,
  isCreated: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new Screen
export const createScreen = createAsyncThunk(
  'Screens/create',
  async (_, thunkAPI) => {
    try {
      let output;
      console.log("..createScreen-->")
      await ScreenService.testfunc().then((data) => { output = data })
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

export const ScreensSlice = createSlice({
  name: 'Screen',
  initialState,
  reducers: {
    resetScreen: (state) => initialState,

    get: (state) => {
    },

    create: (state, action) => {
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createScreen.pending, (state) => {
        state.isCreating = true
      })
      .addCase(createScreen.fulfilled, (state, action) => {
        state.isCreating = false
        state.isCreated = true
        state.screen = action.payload

      })
      .addCase(createScreen.rejected, (state, action) => {
        state.isCreating = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetScreen } = ScreensSlice.actions
export default ScreensSlice.reducer
