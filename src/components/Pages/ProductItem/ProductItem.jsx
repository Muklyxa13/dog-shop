import styles from "./productItem.module.css"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import {
  addCartDetails,
  getCartDetailsSelector,
} from "../../../redux/slices/cartDetailsSlice"
import sale from "../../../images/sale.png"
import { Link, useNavigate } from "react-router-dom"
import {
  addFavorite,
  getFavoriteSelector,
} from "../../../redux/slices/favoriteSlice"

export const ProductItem = ({ id, name, pictures, discount, price, stock }) => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const cartDataIds = useSelector(getCartDetailsSelector)
  const favoritePage = useSelector(getFavoriteSelector)
  const isExistInCart = cartDataIds.map(({ id }) => id).includes(id) // проверка на добавление товара в корзину (деструктуризируем объект и сразу получаем id)
  const isExistInFavorite = favoritePage.map(({ id }) => id).includes(id) // проверка на добавление товара в избранное (деструктуризируем объект и сразу получаем id)
  const addNewItemToCart = (e) => {
    e.preventDefault()
    dispath(addCartDetails(id))
  } // добавление товара в корзину
  const addProductFavorite = (e) => {
    e.preventDefault()
    dispath(addFavorite(id))
  } // добавление товара в избранное
  // const navigateToDetailPage = () => {
  //   navigate(`/detail`)
  // }

  return (
    <Link to={`./${id}`}>
      <div className={styles.item}>
        {discount > 0 && <img className={styles.sale} src={sale} alt="sale" />}
        {discount > 0 && <div className={styles.disc}>-{discount}%</div>}
        <h6 className={styles.nameProduct}>{name}</h6>
        <img className={styles.itemImg} src={pictures} alt="product" />
        <div className={styles.itemPrice}>
          {discount > 0 && (
            <h6 className={styles.priceOld}>
              {" "}
              <span>{discount > 0 && `${price}`}</span> ₽
            </h6>
          )}
          <h5>
            {discount > 0 && `${(price * (100 - discount)) / 100} ₽`}
            {discount === 0 && `${price} ₽`}
          </h5>
        </div>
        <p className={styles.text}>
          <span>Осталось:</span> {stock} шт.
        </p>
        <div className={styles.blockBtn}>
          <button
            className={styles.itemButton}
            // onClick={() => !isExistInCart && addNewItemToCart()}
            onClick={addNewItemToCart}
            disabled={isExistInCart}
          >
            {isExistInCart ? "В корзине" : "В корзину"}
          </button>
          <button
            className={styles.itemButton}
            // onClick={() => !isExistInFavorite && addProductFavorite()}
            onClick={addProductFavorite}
            disabled={isExistInFavorite}
          >
            {isExistInFavorite ? "В избранном" : "В избранное"}
          </button>
        </div>
      </div>
    </Link>
  )
}

ProductItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  pictures: PropTypes.string,
  discount: PropTypes.number,
  price: PropTypes.number,
  stock: PropTypes.number,
}
