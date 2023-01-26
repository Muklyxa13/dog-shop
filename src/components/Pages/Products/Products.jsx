import { useQuery } from "@tanstack/react-query"
import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { DogShopContext } from "../../../Contexts/DogShopContextProvider"
import { Loader } from "../../Loader/Loader"
import { ProductItem } from "../ProductItem/ProductItem"
import productsStyles from "./products.module.css"
import "./scroll.scss"
import classNames from "classnames"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
    queryFn: () => dogFoodApi.getAllProducts(),
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

  const clickToScrollUp = () => {
    window.scrollTo(0, 0)
  }

  const clickToScrollDown = () => {
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <div>
      <ul className={productsStyles.productsList}>
        {data.products.map(({ _id: id, ...restProduct }) => (
          <ProductItem {...restProduct} id={id} key={id} />
        ))}
      </ul>
      <FontAwesomeIcon
        onClick={clickToScrollUp}
        className={classNames("scroll", "scrollUp")}
        icon={faCaretUp}
      />
      <FontAwesomeIcon
        onClick={clickToScrollDown}
        className={classNames("scroll", "scrollDown")}
        icon={faCaretDown}
      />
    </div>
  )
}
