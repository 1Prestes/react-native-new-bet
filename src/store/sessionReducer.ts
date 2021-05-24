import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../utils/axios-http-client'
import { getToken, saveToken } from '../helpers/storageToken'

interface Login {
  email: string
  password: string
}

export const setAuth = createAsyncThunk(
  'session/setAuth',
  async (login: Login) => {
    const response = await api.post('/sessions', login)
    return response.data
  }
)

export const getCurrentToken = createAsyncThunk(
  'session/getCurrentToken',
  async () => {
    const token = await getToken()

    return token
  }
)

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    error: '',
    token: ''
  },
  reducers: {
    LOGOUT_USER (state) {
      return { ...state, error: '' }
    },
    CLEAR_SESSION (state) {
      return { ...state, error: '' }
    }
  },
  extraReducers: builder => {
    builder.addCase(setAuth.fulfilled, (state, action) => {
      saveToken(action.payload.token)

      return { ...state, token: action.payload.token, error: '' }
    })

    builder.addCase(setAuth.rejected, (state, action) => {
      let error = ''
      if (action.error.message === 'Request failed with status code 401') {
        error = 'Error, check the data and try again'
      }

      if (action.error.message === 'Network Error') {
        error =
          'Error connecting to the server, try again or wait a few minutes'
      }

      return { ...state, error: error }
    })

    builder.addCase(getCurrentToken.fulfilled, (state, action) => {
      const token = action.payload

      if (token) {
        state.token = token
      }

      return { ...state, error: '' }
    })
  }
})

export const { LOGOUT_USER, CLEAR_SESSION } = sessionSlice.actions
export default sessionSlice.reducer
