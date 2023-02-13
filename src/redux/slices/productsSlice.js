/* eslint-disable no-debugger */
/*
изначально сохранял все продукты с бэка в редаксе.
понял что так не надо было делать, исправил.
слайс пока что оставил, мало ли...
*/
import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const productsSlice = createSlice({
  name: "products",
  initialState: initState.products,
  reducers: {
    setProducts(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { setProducts } = productsSlice.actions
export const productsReducer = productsSlice.reducer
export const getAllProductsSelector = (state) => state.products
