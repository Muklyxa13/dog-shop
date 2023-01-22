import { useCallback, useEffect, useState, createContext } from "react"

export const DogShopContext = createContext()

const DOGSHOP_LS_KEY = "DOGSHOP_LS_KEY"

// eslint-disable-next-line react/prop-types
export const DogShopContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const tokenFromLS = localStorage.getItem(DOGSHOP_LS_KEY)
    const preparedData = tokenFromLS ? JSON.parse(tokenFromLS) : []

    return preparedData
  })

  useEffect(() => {
    localStorage.setItem(DOGSHOP_LS_KEY, JSON.stringify(token))
  }, [token])

  const removeToken = useCallback(() => setToken(""), [setToken])

  return (
    <DogShopContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </DogShopContext.Provider>
  )
}
