import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
import styles from "./cart.module.css"
import { useQuery } from "@tanstack/react-query"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { clearAllItems, getCartSelector } from "../../../redux/slices/cartSlice"
import { CartItem } from "../CartItem/CartItem"
import { Loader } from "../../Loader/Loader"

export const Cart = () => {
  const cart = useSelector(getCartSelector)

  const dispatch = useDispatch()

  const clearCart = () => {
    dispatch(clearAllItems())
  }

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => dogFoodApi.getProductsByIds(cart),
  })
  if (isLoading) return <Loader />

  return (
    <div className={styles.cart}>
      <div className={styles.cartMenu}>
        <div className={styles.cartLeft}>
          <div className={styles.cartInfo}>
            <div className={styles.cartHeader}>
              <h1 className={styles.title}>Корзина</h1>
              <p>Количество товаров: {cart.length}</p>
              <button
                className={styles.btnClear}
                type="button"
                onClick={clearCart}
              >
                Очистить корзину
              </button>
            </div>
            <ul>
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
                />
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.cartRight}>
          <div>
            <p>Условия заказа</p>
          </div>
          <hr className={styles.hr} />
          <div>
            <p>Итого:</p>
            <p>{cart.length} (количество товаров)</p>
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
  )
}
