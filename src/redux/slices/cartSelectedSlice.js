import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const cartSelectedSlice = createSlice({
  name: "selectProduct",
  initialState: initState.selectProduct,
  reducers: {
    selectProduct(state, action) {
      state.push(action.payload)
    },
    deleteSelectedProduct(state, action) {
      return state.filter((product) => product !== action.payload)
    },
    clearAllSelectProducts() {
      return []
    },
    selectAllProducts(state, action) {
      state = [...action.payload]
      return state
    },
  },
})

export const {
  selectProduct,
  deleteSelectedProduct,
  clearAllSelectProducts,
  selectAllProducts,
} = cartSelectedSlice.actions
export const cartSelectedReducer = cartSelectedSlice.reducer
export const getCartSelectedSelector = (state) => state.selectedProduct
