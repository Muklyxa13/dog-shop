import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const cartSlice = createSlice({
  name: "cart",
  initialState: initState.cart,
  reducers: {
    addItemId(state, action) {
      state.push(action.payload)
    },
    deleteItem(state, action) {
      return state.filter((product) => product !== action.payload)
    },
    clearAllItems() {
      return []
    },
  },
})

export const { addItemId, deleteItem, clearAllItems, cartContainer } =
  cartSlice.actions
export const cartReducer = cartSlice.reducer
export const getCartSelector = (state) => state.cart
