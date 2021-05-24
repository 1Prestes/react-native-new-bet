import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import api from '../utils/axios-http-client'

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

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    error: ''
  },
  reducers: {
    LOGOUT_USER (state) {
      return state
    },
    CLEAR_SESSION (state) {
      return { ...state, error: '' }
    }
  },
  extraReducers: builder => {
    builder.addCase(setAuth.fulfilled, (state, action) => {
      console.log(action.payload)

      return { ...state, token: action.payload.token, error: '' }
    })

    builder.addCase(setAuth.rejected, (state, action) => {
      console.log(action)
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
  }
})

export const { LOGOUT_USER, CLEAR_SESSION } = sessionSlice.actions
export default sessionSlice.reducer
