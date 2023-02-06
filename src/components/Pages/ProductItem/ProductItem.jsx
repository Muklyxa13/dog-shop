import styles from "./productItem.module.css"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { addItem, getCartSelector } from "../../../redux/slices/cartSlice"

export const ProductItem = ({
  id,
  name,
  pictures,
  discount,
  price,
  stock,
  description,
}) => {
  const dispath = useDispatch()

  const addNewItemToCart = () => {
    dispath(addItem(id))
  }

  const cartDataIds = useSelector(getCartSelector)
  const isExistInCart = cartDataIds.includes(id)

  return (
    <div className={styles.item}>
      <h6 className={styles.nameProduct}>{name}</h6>
      <img className={styles.itemImg} src={pictures} alt="product" />
      <div className={styles.itemPrice}>
        <h6>
          <span>Цена:</span> {discount >= 0 && `${price} ₽`}
        </h6>
        <h5>
          <span>Со скидкой:</span>{" "}
          {discount > 0 && `${(price * (100 - discount)) / 100} ₽`}
          {discount === 0 && `${price} ₽`}
        </h5>
      </div>
      <p>
        <span>Осталось:</span> {stock} шт.
      </p>
      <div className={styles.blockBtn}>
        <button
          className={styles.itemButton}
          onClick={() => !isExistInCart && addNewItemToCart()}
        >
          {isExistInCart ? "В корзине" : "В корзину"}
        </button>
        <button className={styles.itemButton}>В избранное</button>
      </div>
    </div>
  )
}

ProductItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  pictures: PropTypes.string,
  discount: PropTypes.number,
  price: PropTypes.number,
  stock: PropTypes.number,
  description: PropTypes.string,
}
