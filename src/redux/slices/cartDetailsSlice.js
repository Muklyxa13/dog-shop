/* eslint-disable no-debugger */
import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const cartDetailsSlice = createSlice({
  name: "cartDetails",
  initialState: initState.cartDetails,
  reducers: {
    setCartDetails(state, action) {
      state = action.payload
      return state.map((el) => {
        el.count = 1
        return el
      })
    },
    deleteCartDetails(state, action) {
      return state.filter((product) => product._id !== action.payload)
    },
    increment(state) {
      console.log("зашли в red")
      console.log(
        state.map((el) => {
          el.count++
          return el
        })
      )
      return state.map((el) => {
        el.count++
        return el
      })
    },
  },
})

export const { setCartDetails, deleteCartDetails, increment } =
  cartDetailsSlice.actions
export const cartDetailReducer = cartDetailsSlice.reducer
export const getCartDetailsSelector = (state) => state.cartDetails
