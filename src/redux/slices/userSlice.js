import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const userSlice = createSlice({
  name: "user",
  initialState: initState.user,
  reducers: {
    setUser: {
      reducer(state, action) {
        if (state.email !== action.payload.email) return action.payload
      },
      prepare(id, token, email) {
        return {
          payload: {
            id,
            token,
            email,
          },
        }
      },
    },
    removeUser() {
      return initState.user
    },
  },
})

export const { setUser, removeUser } = userSlice.actions
export const userReducer = userSlice.reducer
export const getCartSelector = (state) => state.user
export const getTokenSelector = (state) => state.user.token
