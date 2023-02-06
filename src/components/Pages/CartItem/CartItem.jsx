import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import {
  decrementItem,
  deleteItem,
  incrementItem,
} from "../../../redux/slices/cartSlice"
import styles from "./CartItem.module.css"

export const CartItem = ({
  id,
  name,
  pictures,
  discount,
  price,
  stock,
  description,
  count,
}) => {
  const dispath = useDispatch()
  const deleteItemHandler = () => {
    dispath(deleteItem(id))
  }
  const incrementCount = () => {
    if (count < stock) {
      dispath(incrementItem(id))
    }
  }
  const decrementCount = () => {
    if (count >= 0) {
      dispath(decrementItem(id))
    }
  }

  return (
    <div className={styles.item}>
      <div className={styles.itemBox}>
        <input type="checkbox" className={styles.itemInput} />
        <img src={pictures} alt="imgItem" className={styles.itemImg} />
        <div className={styles.itemInfo}>
          <h5>&quot;{name}&quot;</h5>
          <p className={styles.itemDescr}>Описание товара:</p>
          <p className={styles.itemText}>{description}</p>
        </div>
        <div className={styles.btnBox}>
          <div className={styles.btnContainer}>
            <button
              type="button"
              className={styles.itemDecrement}
              onClick={decrementCount}
            >
              -
            </button>
            <p>{count}</p>
            <button
              type="button"
              className={styles.itemIncrement}
              onClick={incrementCount}
            >
              +
            </button>
          </div>
          <p>В наличии: {stock} шт.</p>
        </div>
        <div className={styles.itemPrice}>
          <h6>{discount > 0 && `${price} ₽`}</h6>
          <h4>
            {discount > 0 && `${(price * (100 - discount)) / 100} ₽`}
            {discount === 0 && `${price} ₽`}
          </h4>
        </div>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  pictures: PropTypes.string,
  discount: PropTypes.number,
  price: PropTypes.number,
  stock: PropTypes.number,
  description: PropTypes.string,
  count: PropTypes.number,
}
