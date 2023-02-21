import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const userSlice = createSlice({
  name: "user",
  initialState: initState.user,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        _id: action.payload.data._id,
        name: action.payload.data.name,
        about: action.payload.data.about,
        avatar: action.payload.data.avatar,
        group: action.payload.data.group,
        email: action.payload.data.email,
        token: action.payload.token,
      }
    },
    removeUser() {
      return initState.user
    },
  },
})

export const { setUser, removeUser } = userSlice.actions
export const userReducer = userSlice.reducer
export const getUserSelector = (state) => state.user
export const getTokenSelector = (state) => state.user.token
