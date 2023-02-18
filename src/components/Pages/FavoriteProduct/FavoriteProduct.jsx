import { useDispatch, useSelector } from "react-redux"
import {
  deleteFavorite,
  getFavoriteSelector,
} from "../../../redux/slices/favoriteSlice"
import styles from "./FavoriteProduct.module.css"
import PropTypes from "prop-types"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const FavoriteProduct = ({
  id,
  name,
  pictures,
  discount,
  price,
  stock,
  description,
}) => {
  const dispath = useDispatch()
  const productInFavorite = useSelector(getFavoriteSelector) // массив товаров в избранном (id count check)
  const currentProduct = productInFavorite.find((product) => product.id === id) // каждый продукт по отдельности (id)
  if (!currentProduct) {
    return null
  }

  const deleteItemHandler = () => dispath(deleteFavorite(id)) // удаление товара по клику на иконку корзины

  return (
    <div className={styles.item}>
      <div className={styles.itemBox}>
        <img src={pictures} alt="imgItem" className={styles.itemImg} />
        <div className={styles.itemInfo}>
          <h5>&quot;{name}&quot;</h5>
          <p className={styles.itemDescr}>Описание товара:</p>
          <p className={styles.itemText}>{description}</p>
        </div>
        <button
          type="button"
          onClick={deleteItemHandler}
          className={styles.btnTrash}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <div className={styles.btnBox}>
          <div className={styles.btnContainer}>
            <button type="button" className={styles.itemDecrement}>
              В корзину
            </button>
          </div>
          <p>В наличии: {stock} шт.</p>
        </div>
        <div className={styles.itemPrice}>
          <h6>
            <span>{discount > 0 && `${price} ₽`}</span>
          </h6>
          <h4>
            {discount > 0 && `${(price * (100 - discount)) / 100} ₽`}
            {discount === 0 && `${price} ₽`}
          </h4>
        </div>
      </div>
    </div>
  )
}

FavoriteProduct.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  pictures: PropTypes.string,
  discount: PropTypes.number,
  price: PropTypes.number,
  stock: PropTypes.number,
  description: PropTypes.string,
  count: PropTypes.any,
  isChecked: PropTypes.bool,
}
