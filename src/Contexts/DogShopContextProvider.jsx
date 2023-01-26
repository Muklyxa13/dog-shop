import { useCallback, useEffect, useState, createContext } from "react"
import { dogFoodApi } from "../API/DogFoodApi"

export const DogShopContext = createContext()

const DOGSHOP_LS_KEY = "DOGSHOP_LS_KEY"

// eslint-disable-next-line react/prop-types
export const DogShopContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const tokenFromLS = localStorage.getItem(DOGSHOP_LS_KEY)
    // const preparedData = tokenFromLS ? JSON.parse(tokenFromLS) : ""

    return tokenFromLS || ""
  })

  useEffect(() => {
    localStorage.setItem(DOGSHOP_LS_KEY, token)
    dogFoodApi.setToken(token)
  }, [token])

  const removeToken = useCallback(() => setToken(""), [setToken])

  return (
    <DogShopContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </DogShopContext.Provider>
  )
}
