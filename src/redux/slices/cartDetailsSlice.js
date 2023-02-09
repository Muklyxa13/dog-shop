/* eslint-disable no-debugger */
import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const cartDetailsSlice = createSlice({
  name: "cartDetails",
  initialState: initState.cartDetails,
  reducers: {
    addItem(state, action) {
      state.push(action.payload)
    },
    addProductToCart: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(payload) {
        return {
          payload: {
            payload,
          },
        }
      },
    },
    setCartDetails(state, action) {
      state = action.payload
      return state.map((el) => {
        return {
          ...el,
          count: 1,
          isChecked: false,
        }
      })
    },
    addCartDetails(state, action) {
      const product = {
        id: action.payload,
        count: 1,
      }
      state.push(product)
    },
    deleteCartDetails(state, action) {
      return state.filter((product) => product._id !== action.payload)
    },
    clearAllCartDetails() {
      return []
    },
    incrementCartDetails(state, action) {
      return state.map((el) => {
        if (el._id === action.payload) {
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
        if (el._id === action.payload) {
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
        if (product._id === action.payload.id) {
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
    resetAllProducts(state) {
      state.map((product) => (product.isChecked = false))
    },
    removeSelectedProduct(state, action) {
      return state.filter((product) => product.isChecked === false)
    },
  },
})

export const {
  test,
  addItem,
  addProductToCart,
  setCartDetails,
  addCartDetails,
  deleteCartDetails,
  clearAllCartDetails,
  incrementCartDetails,
  decrementCartDetails,
  changeIsChecked,
  selectAllProducts,
  resetAllProducts,
  removeSelectedProduct,
} = cartDetailsSlice.actions
export const cartDetailReducer = cartDetailsSlice.reducer
export const getCartDetailsSelector = (state) => state.cartDetails
