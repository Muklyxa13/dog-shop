/* eslint-disable no-debugger */
import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const productsSlice = createSlice({
  name: "products",
  initialState: initState.products, // состояние по умолчанию
  reducers: {
    // ключ (объект), описываем действия, которые будут происходить в данном срезе
    setProducts(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { setProducts } = productsSlice.actions
export const productsReducer = productsSlice.reducer
export const getAllProductsSelector = (state) => state.products
