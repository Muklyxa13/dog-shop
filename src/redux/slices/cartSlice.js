import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const cartSlice = createSlice({
  name: "cart",
  initialState: initState.cart,
  reducers: {
    addItem(state, action) {
      state.push(action.payload)
    },
    deleteItem(state, action) {
      return state.filter((product) => product !== action.payload)
    },
    clearAllItems() {
      return []
    },
    incrementItem(state, action) {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            count: item.count + 1,
          }
        }
        return item
      })
    },
    decrementItem(state, action) {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            count: item.count - 1,
          }
        }
        return item
      })
    },
  },
})

export const {
  addItem,
  deleteItem,
  clearAllItems,
  incrementItem,
  decrementItem,
  cartContainer,
} = cartSlice.actions
export const cartReducer = cartSlice.reducer
export const getCartSelector = (state) => state.cart
