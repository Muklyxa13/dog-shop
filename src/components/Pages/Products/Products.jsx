import { useQuery } from "@tanstack/react-query"
import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { DogShopContext } from "../../../Contexts/DogShopContextProvider"
import { Loader } from "../../Loader/Loader"
import { ProductItem } from "../ProductItem/ProductItem"
import productsStyles from "./products.module.css"

export const Products = () => {
  const { token } = useContext(DogShopContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["productsfetch"],
    queryFn: () =>
      fetch("https://api.react-learning.ru/products", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.status > 299) {
          throw new Error(
            `Ошибка при получении списка продуктов. Status: ${res.status}`
          )
        }

        return res.json()
      }),
    enabled: token !== undefined,
  })

  if (isError)
    return (
      <div className={productsStyles.errorMessage}>
        <p>{error.message}</p>
        <button onClick={refetch} type="button">
          Повторить запрос
        </button>
      </div>
    )
  if (isLoading) return <Loader />
  if (!data.products.length) return <p>Упс..</p>

  return data.products.map((product, index) => (
    <ProductItem product={product} key={index} />
  ))
}
