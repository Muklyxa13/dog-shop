/* eslint-disable no-debugger */
import { useQuery } from "@tanstack/react-query"
import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { DogShopContext } from "../../../Contexts/DogShopContextProvider"
import { ProductItem } from "../ProductItem/ProductItem"
import styles from "./products.module.css"
import "./scroll.scss"
import classNames from "classnames"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withQuery } from "../../HOCs/withQuery"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../../../redux/slices/productsSlice"
import { getAllProductsSelector } from "../../../redux/slices/productsSlice"
import { getQueryKey } from "./utils"
import { getSearchSelector } from "../../../redux/slices/filterSlice"
import isEqual from "lodash.isequal"

const ProductsInner = ({ data }) => {
  const dispatch = useDispatch()
  const products = useSelector(getAllProductsSelector)

  const clickToScrollUp = () => {
    window.scrollTo(0, 0)
  }

  const clickToScrollDown = () => {
    window.scrollTo(0, document.body.scrollHeight)
  }

  useEffect(() => {
    if (!isEqual(data.products, products)) {
      dispatch(setProducts(data.products))
    }
  }, [dispatch, data, products])

  return (
    <>
      <div>
        <ul className={styles.productsList}>
          {products.map(({ _id: id, ...restProduct }) => (
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
    </>
  )
}

ProductsInner.propTypes = {
  data: PropTypes.shape({
    products: PropTypes.array,
  }),
}

const ProductsInnerWithQuery = withQuery(ProductsInner)

export const Products = () => {
  const { token } = useContext(DogShopContext)
  const navigate = useNavigate()
  const search = useSelector(getSearchSelector)

  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: getQueryKey(search),
    queryFn: () => dogFoodApi.getAllProducts(search),
    enabled: token !== undefined,
  })

  return (
    <ProductsInnerWithQuery
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  )
}
