/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { getTokenSelector } from "../../../redux/slices/userSlice"
import { Loader } from "../../Loader/Loader"
import styles from "./ProductDetailPage.module.css"
import PropTypes from "prop-types"
import {
  addCartDetails,
  getCartDetailsSelector,
} from "../../../redux/slices/cartDetailsSlice"
import {
  addFavorite,
  getFavoriteSelector,
} from "../../../redux/slices/favoriteSlice"
import { ReactComponent as Star } from "../../../images/star_painted.svg"
import { SendComment } from "../../SendComment/SendComment"

export const ProductDetailPage = () => {
  const { productId } = useParams()
  const dispath = useDispatch()
  const token = useSelector(getTokenSelector)
  const cartDataIds = useSelector(getCartDetailsSelector)
  const favoritePage = useSelector(getFavoriteSelector)

  const { data, isLoading } = useQuery({
    queryKey: ["detailPage"],
    queryFn: () => dogFoodApi.getProductById(productId, token),
    keepPreviousData: true,
  })
  if (isLoading) return <Loader />

  const addItemToCart = () => dispath(addCartDetails(data._id)) // добавление товара в корзину
  const addProductFavorite = () => dispath(addFavorite(data._id)) // добавление товара в избранное
  const isExistInCart = cartDataIds.map(({ id }) => id).includes(data._id) // проверка на добавление товара в корзину (деструктуризируем объект и сразу получаем id)
  const isExistInFavorite = favoritePage.map(({ id }) => id).includes(data._id) // проверка на добавление товара в избранное
  const stars = (rating) => {
    let arrStars = [] // хранилище для *
    arrStars.length = rating
    return arrStars.fill(null).map(() => <Star className={styles.star} />)
  }

  return (
    <div>
      <div className={styles.wr}>
        <div className={styles.left}>
          <img className={styles.img} src={data.pictures} alt="pictures" />
          <div className={styles.infoBox}>
            <p className={styles.infoTitle}>Стоимость доставки и оплата:</p>
            <p className={styles.info}>
              <span>Москва:</span> Бесплатно (Наличные/Карта)
            </p>
            <p className={styles.info}>
              <span>Область:</span> + 25 руб/км
            </p>
            <p className={styles.info}>
              <span>Россия:</span> от 1000 руб (Наложеннный платеж)
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>&laquo;{data.name}&raquo;</h3>
          <p className={styles.id}>Артикул: {data._id}</p>
          <div className={styles.priceAndBtn}>
            <div className={styles.priceBox}>
              <p className={styles.discount}>
                {data.discount > 0 &&
                  `${(data.price * (100 - data.discount)) / 100} ₽`}
                {data.discount === 0 && `${data.price} ₽`}
              </p>
              <p className={styles.price}>
                {data.discount > 0 && `${data.price} ₽`}
              </p>
            </div>
            <div className={styles.btn}>
              <button
                type="button"
                onClick={addItemToCart}
                disabled={isExistInCart}
              >
                {isExistInCart ? "В корзине" : "В корзину"}
              </button>
              <button
                type="button"
                onClick={addProductFavorite}
                disabled={isExistInFavorite}
              >
                {isExistInFavorite ? "В избранном" : "В избранное"}
              </button>
            </div>
          </div>
          <p className={styles.stock}>
            <span>Остаток:</span> {data.stock} шт
          </p>
          <p className={styles.wight}>
            <span>Вес:</span> {data.wight}
          </p>
          <p className={styles.descriptionTitle}>
            <span>О товаре:</span>
          </p>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>
      <div className={styles.test}>
        <div className={styles.commentsBox}>
          <SendComment />
          <div>
            <p>Отзывы о товаре:</p>
            {data.reviews.map((el) => (
              <div className={styles.commentsContainer}>
                <p>{el.author}</p>
                <p>{stars(el.rating)}</p>
                <p>
                  {el.created_at
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join(".")}
                </p>
                <p>{el.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

ProductDetailPage.propTypes = {
  rating: PropTypes.number,
}
