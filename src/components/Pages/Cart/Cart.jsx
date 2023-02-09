/* eslint-disable no-debugger */
import { useDispatch, useSelector } from "react-redux"
import styles from "./cart.module.css"
import { useQuery } from "@tanstack/react-query"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { CartItem } from "../CartItem/CartItem"
import { Loader } from "../../Loader/Loader"
import { Link } from "react-router-dom"
import {
  setCartDetails,
  getCartDetailsSelector,
  clearAllCartDetails,
  selectAllProducts,
  removeSelectedProduct,
  resetAllProducts,
  test,
} from "../../../redux/slices/cartDetailsSlice"
import { useEffect } from "react"
// import { getCartSelectedSelector } from "../../../redux/slices/cartSelectedSlice"

export const Cart = () => {
  const dispatch = useDispatch()
  const cartDetails = useSelector(getCartDetailsSelector) // массив товаров в корзине
  // const selectedIds = useSelector(getCartSelectedSelector) // массив выбранных id

  const clearCart = () => {
    dispatch(clearAllCartDetails())
  }

  // переменная, в которой отфильтрованы товары лежащие в корзине по ключу isCheked
  const selectedProducts = cartDetails.filter(
    (product) => product.isChecked === true
  )

  const getTotalPrice = () => {
    // переменная, в которой отфильтрован массив товаров в корзине, по поиску выбранных товаров. В итоге это новый массив товаров которые были выделены.
    // const selectedProducts = cartDetails.filter((product) =>
    //   selectedIds.includes(product._id)
    // )

    // переменная, хранит в себе цену выбранных продуктов. Проходимся по массиву и считаем суммарно цену с учетом скидок.
    const priceSelectedProduct = selectedProducts.reduce((sum, product) => {
      return Math.round(
        product.price * product.count * ((100 - product.discount) / 100) + sum
      )
    }, 0)
    return priceSelectedProduct
  }

  // const onSelectAllProducts = () => {
  //   dispatch(selectAllProducts(cartDetails))
  // }

  const checkedAllProducts = () => {
    return cartDetails.every((product) => product.isChecked)
  }

  const removeSelectedProductsHandler = () => {
    dispatch(removeSelectedProduct())
  }

  const selectedAllProducts = () => {
    dispatch(selectAllProducts(true))
  }

  const resetSelectedAllProducts = () => {
    dispatch(resetAllProducts())
  }

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => dogFoodApi.getProductsByIds(cartDetails),
  })

  useEffect(() => {
    if (data) {
      dispatch(setCartDetails(data))
    }
  }, [dispatch, data])

  if (isLoading) return <Loader />

  const noProductMessage = () => {
    if (selectedProducts.length === 0) return <p>Нет выбранных товаров</p>
  }
  const oneProductMessage = () => {
    if (selectedProducts.length === 1) return <p>1 товар</p>
  }
  const someProductMessage = () => {
    if (selectedProducts.length > 1 && selectedProducts.length < 5)
      return <p>{selectedProducts.length} товара</p>
  }
  const moreProductMessage = () => {
    if (selectedProducts.length > 4)
      return <p>{selectedProducts.length} товаров</p>
  }

  return (
    <>
      {" "}
      {!cartDetails[0] && (
        <div className={styles.clearCart}>
          <h1>Корзина пуста</h1>
          <p>
            Посмотрите предложения на {<Link to="/">главной странице</Link>} или
            воспользуйтесь
            {<Link to="/products"> каталогом</Link>}
          </p>
        </div>
      )}
      {cartDetails[0] && (
        <div className={styles.cart}>
          <div className={styles.cartMenu}>
            <div className={styles.cartLeft}>
              <div className={styles.cartInfo}>
                <div className={styles.cartHeader}>
                  <h1 className={styles.title}>Корзина</h1>
                  <p>Количество товаров: {cartDetails.length}</p>
                  <button
                    className={styles.btnClear}
                    type="button"
                    onClick={clearCart}
                  >
                    Очистить корзину
                  </button>
                </div>
                <div className={styles.cartHeaderTwo}>
                  <div className={styles.cartHeaderInput}>
                    <input
                      checked={checkedAllProducts()}
                      type="checkbox"
                      onChange={selectedAllProducts}
                      // onClick={checkedAllProducts}
                      className={styles.cartInput}
                    />
                    <span>Выбрать все</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeSelectedProductsHandler}
                    className={styles.cartHeaderBtn}
                  >
                    Удалить выбранные
                  </button>
                </div>
                {cartDetails.map((item) => (
                  <CartItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    pictures={item.pictures}
                    discount={item.discount}
                    stock={item.stock}
                    description={item.description}
                    count={item.count}
                    isChecked={item.isChecked}
                  />
                ))}
              </div>
            </div>
            <div className={styles.cartRight}>
              <div>
                <p>Условия заказа</p>
              </div>
              <hr className={styles.hr} />
              <div className={styles.cartRightBox}>
                <div className={styles.cartRightSum}>
                  <p>Итого:</p>
                  {noProductMessage()}
                  {oneProductMessage()}
                  {someProductMessage()}
                  {moreProductMessage()}
                </div>
                <div>
                  <p>Сумма:</p>
                  <div>{getTotalPrice()}</div>
                </div>
              </div>

              <div className={styles.btnBox}>
                <button
                  className={styles.btnCart}
                  type="button"
                  onClick={() => alert("Спасибо")}
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
