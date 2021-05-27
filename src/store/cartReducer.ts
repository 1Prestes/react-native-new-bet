import { createSlice } from '@reduxjs/toolkit'

import { RootState } from './store'

const cartSlice = createSlice({
  name: 'register',
  initialState: { showCart: false },
  reducers: {
    SET_SHOW_CART (state, action) {
      return { ...state, showCart: action.payload }
    }
  }
})

export const { SET_SHOW_CART } = cartSlice.actions
export const user = (state: RootState): RootState => state
export default cartSlice.reducer
