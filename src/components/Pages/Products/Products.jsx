/* eslint-disable no-debugger */
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { ProductItem } from "../ProductItem/ProductItem"
import styles from "./products.module.css"
import "./scroll.scss"
import classNames from "classnames"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withQuery } from "../../HOCs/withQuery"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { getQueryKey } from "./utils"
import { getSearchSelector } from "../../../redux/slices/filterSlice"
import { getTokenSelector } from "../../../redux/slices/userSlice"

const ProductsInner = ({ data }) => {
  const clickToScrollUp = () => window.scrollTo(0, 0) // скрол вверх
  const clickToScrollDown = () => window.scrollTo(0, document.body.scrollHeight) // скрол вниз

  return (
    <>
      <div>
        <div className={styles.productsList}>
          {data.products.map(({ _id: id, ...restProduct }) => (
            <ProductItem {...restProduct} id={id} key={id} />
          ))}
        </div>
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
    </>
  )
}

ProductsInner.propTypes = {
  data: PropTypes.shape({
    products: PropTypes.array,
  }),
}

const ProductsInnerWithQuery = withQuery(ProductsInner) // HOC

export const Products = () => {
  const navigate = useNavigate()
  const search = useSelector(getSearchSelector)
  const token = useSelector(getTokenSelector)

  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: getQueryKey(search),
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    keepPreviousData: true,
  })

  return (
    <ProductsInnerWithQuery
      data={data}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      error={error}
      refetch={refetch}
    />
  )
}
