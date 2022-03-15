import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cryptoshopService from './cryptoshopService'

const initialState = {
  cryptoshops: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new cryptoshop
export const createCryptoshop = createAsyncThunk(
  'cryptoshops/create',
  async (cryptoshopData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cryptoshopService.createCryptoshop(cryptoshopData, token)
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

// Get user cryptoshop
export const getMyCryptoshops = createAsyncThunk(
  'cryptoshops/my/',
  async (_, thunkAPI) => {
    try {
      console.log("GET ALL HAPPENING #1")
      const userId = thunkAPI.getState().auth.user._id
      const token = thunkAPI.getState().auth.user.token
      console.log("userID:", userId)
      
      return await cryptoshopService.getMyCryptoshops({"token": token, "userId": userId})
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

// Get cryptoshops
export const getCryptoshops = createAsyncThunk(
  'cryptoshops/cryptoshops',
  async (_, thunkAPI) => {
    try {
      console.log("GET ALL HAPPENING #2")
      const token = thunkAPI.getState().auth.user.token
      return await cryptoshopService.getCryptoshops(token)
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

// Delete user cryptoshop
// export const deleteCryptoshop = createAsyncThunk(
//   'cryptoshops/delete',
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await cryptoshopService.deleteCryptoshop(id, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

// Delete users cryptoshop
export const deleteCryptoshop = createAsyncThunk(
  'cryptoshops/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await cryptoshopService.deleteCryptoshop(id, token)
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

export const cryptoshopsSlice = createSlice({
  name: 'cryptoshop',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCryptoshop.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCryptoshop.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cryptoshops.push(action.payload)
      })
      .addCase(createCryptoshop.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCryptoshops.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCryptoshops.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cryptoshops = action.payload
      })
      .addCase(getCryptoshops.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMyCryptoshops.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyCryptoshops.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cryptoshops = action.payload
      })
      .addCase(getMyCryptoshops.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCryptoshop.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCryptoshop.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cryptoshops = state.cryptoshops.filter((cryptoshop) => 
        cryptoshop._id !== action.payload.id)
      })
      .addCase(deleteCryptoshop.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = cryptoshopsSlice.actions
export default cryptoshopsSlice.reducer