import styles from "./productItem.module.css"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import {
  addItem,
  getCartDetailsSelector,
} from "../../../redux/slices/cartDetailsSlice"
import { addItemId } from "../../../redux/slices/cartSlice"
import sale from "../../../images/sale.png"

export const ProductItem = ({ id, name, pictures, discount, price, stock }) => {
  const dispath = useDispatch()

  const addNewItemToCart = () => {
    dispath(addItemId(id))
    dispath(addItem(id))
  }

  const cartDataIds = useSelector(getCartDetailsSelector)
  const isExistInCart = cartDataIds.includes(id)

  return (
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
}
