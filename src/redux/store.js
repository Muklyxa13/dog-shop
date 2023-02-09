import { configureStore } from "@reduxjs/toolkit"
// import { REDUX_LS_KEY } from "./constants"
// import { getInitState } from "./initState"
import { filterReducer } from "./slices/filterSlice"
import { productsReducer } from "./slices/productsSlice"
import { userReducer } from "./slices/userSlice"
// import { dogFoodApi } from "../API/DogFoodApi"
import { cartDetailReducer } from "./slices/cartDetailsSlice"
import { cartReducer } from "./slices/cartSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer,
    cartDetails: cartDetailReducer,
  },
  // preloadedState: getInitState(),
})

// store.subscribe(() => {
//   window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
// })
// store.subscribe(() => {
//   dogFoodApi.setToken(store.getState().user.token)
// })
