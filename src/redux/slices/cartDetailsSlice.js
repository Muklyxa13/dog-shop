/* eslint-disable no-debugger */
import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const cartDetailsSlice = createSlice({
  name: "cartDetails",
  initialState: initState.cartDetails,
  reducers: {
    addCartDetails(state, action) {
      const product = {
        id: action.payload,
        count: 1,
        isChecked: false,
      }
      state.push(product)
    },
    deleteCartDetails(state, action) {
      return state.filter((product) => product.id !== action.payload)
    },
    clearAllCartDetails() {
      return []
    },
    incrementCartDetails(state, action) {
      return state.map((el) => {
        if (el.id === action.payload) {
          return {
            ...el,
            count: el.count + 1,
          }
        }
        return el
      })
    },
    decrementCartDetails(state, action) {
      return state.map((el) => {
        if (el.id === action.payload) {
          return {
            ...el,
            count: el.count - 1,
          }
        }
        return el
      })
    },
    changeIsChecked(state, action) {
      return state.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            isChecked: action.payload.isChecked,
          }
        }
        return product
      })
    },
    selectAllProducts(state, action) {
      state.map((product) => (product.isChecked = action.payload))
    },
    removeSelectedProduct(state, action) {
      return state.filter((product) => product.isChecked === false)
    },
  },
})

export const {
  addCartDetails,
  deleteCartDetails,
  clearAllCartDetails,
  incrementCartDetails,
  decrementCartDetails,
  changeIsChecked,
  selectAllProducts,
  removeSelectedProduct,
} = cartDetailsSlice.actions
export const cartDetailReducer = cartDetailsSlice.reducer
export const getCartDetailsSelector = (state) => state.cartDetails
