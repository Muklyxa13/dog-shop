/* eslint-disable no-debugger */
import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initState.favorite,
  reducers: {
    addFavorite(state, action) {
      const product = {
        id: action.payload,
      }
      state.push(product)
    },
    deleteFavorite(state, action) {
      return state.filter((product) => product.id !== action.payload)
    },
    clearAllFavoriteDetails() {
      return []
    },
  },
})

export const { addFavorite, deleteFavorite, clearAllFavoriteDetails } =
  favoriteSlice.actions
export const favoriteReducer = favoriteSlice.reducer
export const getFavoriteSelector = (state) => state.favorite
