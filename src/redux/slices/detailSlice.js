import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const detailSlice = createSlice({
  name: "detail",
  initialState: initState.detail,
  reducers: {
    setDetailProduct(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setDetailProduct } = detailSlice.actions
export const detailReducer = detailSlice.reducer
export const getDetailSelector = (state) => state.detail
