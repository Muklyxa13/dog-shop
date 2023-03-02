/* eslint-disable no-debugger */
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { ProductItem } from "../ProductItem/ProductItem"
import styles from "./products.module.css"
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
  const [sortParams, setSortParams] = useSearchParams()
  const [sort, setSort] = useState(data.products)

  const productSort = (value) => {
    const newSortValue = value
    setSort(newSortValue)
    setSortParams({
      ...Object.fromEntries(sortParams.entries()),
      value: newSortValue,
    })
    switch (value) {
      case "priceUp":
        data = [...data.products].sort((a, b) =>
          (a.price * (100 - a.discount)) / 100 >
          (b.price * (100 - b.discount)) / 100
            ? 1
            : -1
        )
        setSort(data)
        break
      case "priceDown":
        data = [...data.products].sort((a, b) =>
          (b.price * (100 - b.discount)) / 100 >
          (a.price * (100 - a.discount)) / 100
            ? 1
            : -1
        )
        setSort(data)
        break
      case "discountUp":
        data = [...data.products].sort((a, b) =>
          b.discount > a.discount ? 1 : -1
        )
        setSort(data)
        break
      case "discountDown":
        data = [...data.products].sort((a, b) =>
          a.discount > b.discount ? 1 : -1
        )
        setSort(data)
        break
      case "nameUp":
        data = [...data.products].sort((a, b) => a.name.localeCompare(b.name))
        setSort(data)
        break
      case "nameDown":
        data = [...data.products].sort((a, b) => b.name.localeCompare(a.name))
        setSort(data)
        break
      case "dateUp":
        data = [...data.products].sort((a, b) =>
          a.created_at > b.created_at ? 1 : -1
        )
        setSort(data)
        break
      case "dateDown":
        data = [...data.products].sort((a, b) =>
          b.created_at > a.created_at ? 1 : -1
        )
        setSort(data)
        break
      default:
        break
    }
  }

  useEffect(() => {
    setSort(data.products)
  }, [data.products])

  const clickToScrollUp = () => window.scrollTo(0, 0) // скрол вверх
  const clickToScrollDown = () => window.scrollTo(0, document.body.scrollHeight) // скрол вниз

  return (
    <>
      <div className={styles.btnSortWr}>
        <div className={styles.btnSortContainer}>
          <p>Сортировка товаров:</p>
          <div className={styles.btnPrice}>
            <p>Цена:</p>
            <button
              className={styles.btnSort}
              type="button"
              onClick={() => productSort("priceUp")}
            >
              <FontAwesomeIcon icon={faCaretUp} />
            </button>
            <button
              className={styles.btnSort}
              type="button"
              onClick={() => productSort("priceDown")}
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>
          <div className={styles.btnDiscount}>
            <p>Скидка:</p>
            <button
              className={styles.btnSort}
              type="button"
              onClick={() => productSort("discountUp")}
            >
              <FontAwesomeIcon icon={faCaretUp} />
            </button>
            <button
              className={styles.btnSort}
              type="button"
              onClick={() => productSort("discountDown")}
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>
          <div className={styles.btnName}>
            <p>Дата добавления:</p>
            <button
              className={styles.btnSort}
              type="button"
              onClick={() => productSort("dateUp")}
            >
              <FontAwesomeIcon icon={faCaretUp} />
            </button>
            <button
              className={styles.btnSort}
              type="button"
              onClick={() => productSort("dateDown")}
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>
          <div className={styles.btnName}>
            <p>Название:</p>
            <button
              className={styles.btnSort}
              type="button"
              onClick={() => productSort("nameUp")}
            >
              А-Я
            </button>
            <button
              className={styles.btnSort}
              type="button"
              onClick={() => productSort("nameDown")}
            >
              Я-А
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.productsList}>
          {sort.map(({ _id: id, ...restProduct }) => (
            <ProductItem {...restProduct} id={id} key={id} />
          ))}
        </div>
        <FontAwesomeIcon
          onClick={clickToScrollUp}
          className={classNames(styles.scroll, styles.scrollUp)}
          icon={faCaretUp}
        />
        <FontAwesomeIcon
          onClick={clickToScrollDown}
          className={classNames(styles.scroll, styles.scrollDown)}
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
    <>
      <ProductsInnerWithQuery
        data={data}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        error={error}
        refetch={refetch}
      />
    </>
  )
}
