import { configureStore } from "@reduxjs/toolkit"
import { REDUX_LS_KEY } from "./constants"
import { getInitState } from "./initState"
import { filterReducer } from "./slices/filterSlice"
import { userReducer } from "./slices/userSlice"
import { cartDetailReducer } from "./slices/cartDetailsSlice"
import { detailReducer } from "./slices/detailSlice"
import { favoriteReducer } from "./slices/favoriteSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    cartDetails: cartDetailReducer,
    detail: detailReducer,
    favorite: favoriteReducer,
  },
  preloadedState: getInitState(),
})

store.subscribe(() => {
  window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
