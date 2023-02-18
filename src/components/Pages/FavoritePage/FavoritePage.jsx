import { useQuery } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { dogFoodApi } from "../../../API/DogFoodApi"
import {
  clearAllFavoriteDetails,
  getFavoriteSelector,
} from "../../../redux/slices/favoriteSlice"
import { getTokenSelector } from "../../../redux/slices/userSlice"
import { Loader } from "../../Loader/Loader"
import { FavoriteProduct } from "../FavoriteProduct/FavoriteProduct"
import styles from "./FavoritePage.module.css"

export const FavoritePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(getTokenSelector)
  const favoritePage = useSelector(getFavoriteSelector)
  const ids = favoritePage.map((product) => product.id)

  const { data, isLoading } = useQuery({
    queryKey: ["favorite", favoritePage.length],
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
    keepPreviousData: true,
  })
  if (isLoading) return <Loader />

  const clearFavorite = () => {
    dispatch(clearAllFavoriteDetails())
    // функция очистки списка товаров
  }
  const navigateToCart = () => {
    navigate("/cart")
  }

  return (
    <>
      {" "}
      {!favoritePage.length ? (
        <div className={styles.clearCart}>
          <h1>Избранных товаров нет</h1>
          <p>
            Посмотрите предложения на {<Link to="/">главной странице</Link>} или
            воспользуйтесь
            {<Link to="/products"> каталогом</Link>}
          </p>
        </div>
      ) : (
        <div className={styles.favoritePage}>
          <div className={styles.favoriteBox}>
            <div className={styles.favoriteHeader}>
              <h1 className={styles.title}>Избранные товары</h1>
              <p>Количество товаров: {data.length}</p>
              <div>
                <button
                  className={styles.btnClear}
                  type="button"
                  onClick={clearFavorite}
                >
                  Очистить список
                </button>
              </div>
            </div>
            {data.map((item) => (
              <FavoriteProduct
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                pictures={item.pictures}
                discount={item.discount}
                stock={item.stock}
                description={item.description}
              />
            ))}
          </div>
          <div className={styles.btnToCartBox}>
            <button
              className={styles.btnToCart}
              type="button"
              onClick={navigateToCart}
            >
              Перейти в корзину
            </button>
          </div>
        </div>
      )}
    </>
  )
}
