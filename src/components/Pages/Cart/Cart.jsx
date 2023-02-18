/* eslint-disable no-debugger */
import { useDispatch, useSelector } from "react-redux"
import styles from "./cart.module.css"
import { useQuery } from "@tanstack/react-query"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { CartItem } from "../CartItem/CartItem"
import { Loader } from "../../Loader/Loader"
import { Link } from "react-router-dom"
import {
  getCartDetailsSelector,
  clearAllCartDetails,
  selectAllProducts,
  removeSelectedProduct,
} from "../../../redux/slices/cartDetailsSlice"
import { getTokenSelector } from "../../../redux/slices/userSlice"
import dogLeft from "../../../images/dog_cart1.png"
import dogRight from "../../../images/dog_cart2.png"

export const Cart = () => {
  const dispatch = useDispatch()
  const token = useSelector(getTokenSelector)
  const cartDetails = useSelector(getCartDetailsSelector) // массив товаров в корзине (id count check)
  const ids = cartDetails.map((product) => product.id) // массив id в корзине

  const countCheckedProduct = cartDetails.filter((product) => product.isChecked) // массив выбранных товаров в корзине
  const { data, isLoading } = useQuery({
    // запрос товаров в корзине
    // {data} - массив товаров (фулл)
    queryKey: ["cart", cartDetails.length],
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
    keepPreviousData: true,
  })
  if (isLoading) return <Loader />

  const selectedProductsIsChecked = cartDetails.filter(
    (product) => product.isChecked === true
    // массив, в котором отфильтрованы товары лежащие в корзине по ключу isCheked
  )
  const selectedProducts = data.filter(
    (item) =>
      selectedProductsIsChecked.find((product) => product.id === item._id)
    // массив товаров отфильтрованных по нажатию на чекбокс (фулл)
  )
  const getTotalPrice = () => {
    const priceSelectedProduct = selectedProducts.reduce((sum, product) => {
      const count = countCheckedProduct.find(
        (item) => item.id === product._id
      ).count
      return Math.round(
        product.price * count * ((100 - product.discount) / 100) + sum
      )
    }, 0)
    // массив хранит в себе цену выбранных продуктов. Проходимся по массиву и считаем суммарно цену с учетом скидок
    return priceSelectedProduct
  }
  const clearCart = () => {
    dispatch(clearAllCartDetails())
    // функция очистки корзины
  }
  const checkedAllProducts = () => {
    return cartDetails.every((product) => product.isChecked)
    // функция, при вызове которой ставиться чекбокс, если все чекбоксы проставлены
  }
  const removeSelectedProductsHandler = () => {
    dispatch(removeSelectedProduct())
    // удаляет выбранный по чекбоксу товар
  }
  const selectedAllProducts = (event) => {
    dispatch(selectAllProducts(event.target.checked))
    // выбираем все продукты (чекбокс)
  }
  const countTotalProductInCart = () => {
    if (countCheckedProduct.length === 0) return <p>Нет выбранных товаров</p>
    if (countCheckedProduct.length === 1)
      return <p>{countCheckedProduct.length} товар</p>
    if (countCheckedProduct.length > 1 && countCheckedProduct.length < 5)
      return <p>{countCheckedProduct.length} товара</p>
    if (countCheckedProduct.length > 4)
      return <p>{countCheckedProduct.length} товаров</p>
    // падежы товаров по кол-ву (не доведена до идеала)
  }

  return (
    <>
      {" "}
      {!cartDetails.length ? (
        <div className={styles.clearCart}>
          <img className={styles.dogLeft} src={dogLeft} alt="dog" />
          <img className={styles.dogRight} src={dogRight} alt="dog" />
          <h1>Корзина пуста</h1>
          <p>
            Посмотрите предложения на {<Link to="/">главной странице</Link>} или
            воспользуйтесь
            {<Link to="/products"> каталогом</Link>}
          </p>
        </div>
      ) : (
        <div className={styles.cart}>
          <div className={styles.cartMenu}>
            <div className={styles.cartLeft}>
              <div className={styles.cartInfo}>
                <div className={styles.cartHeader}>
                  <h1 className={styles.title}>Корзина</h1>
                  <p>Количество товаров: {data.length}</p>
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
                {data.map((item) => (
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
                  {countTotalProductInCart()}
                </div>
                <div className={styles.totalPriceBox}>
                  <p>Сумма:</p>
                  <div className={styles.totalPrice}>{getTotalPrice()} ₽</div>
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
