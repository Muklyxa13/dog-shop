import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const detailSlice = createSlice({
  name: "detail",
  initialState: initState.detail,
  reducers: {
    setDetailProduct(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { setDetailProduct } = detailSlice.actions
export const detailReducer = detailSlice.reducer
export const getDetailSelector = (state) => state.detail
