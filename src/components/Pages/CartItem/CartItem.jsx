/* eslint-disable no-debugger */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import styles from "./CartItem.module.css"
import {
  changeIsChecked,
  decrementCartDetails,
  deleteCartDetails,
  getCartDetailsSelector,
  incrementCartDetails,
} from "../../../redux/slices/cartDetailsSlice"

export const CartItem = ({
  id,
  name,
  pictures,
  discount,
  price,
  stock,
  description,
}) => {
  const dispath = useDispatch()
  const productInCart = useSelector(getCartDetailsSelector) // массив товаров в корзине (id count check)
  const currentProduct = productInCart.find((product) => product.id === id) // каждый продукт по отдельности (id)
  if (!currentProduct) {
    return null
  }

  const deleteItemHandler = () => dispath(deleteCartDetails(id)) // удаление товара по клику на иконку корзины
  const incrementCount = () => {
    if (currentProduct.count < stock) {
      dispath(incrementCartDetails(id))
    }
    // уменьшение кол-ва товара
  }
  const decrementCount = () => {
    if (currentProduct.count > 1) {
      dispath(decrementCartDetails(id))
    }
    // увеличение кол-ва товара
  }
  const onSelectProduct = (event) => {
    dispath(changeIsChecked({ isChecked: event.target.checked, id }))
    // один выбранный товар
  }

  return (
    <div className={styles.item}>
      <div className={styles.itemBox}>
        <input
          checked={currentProduct.isChecked}
          type="checkbox"
          onChange={onSelectProduct}
          className={styles.itemInput}
        />
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
            <button
              type="button"
              className={styles.itemDecrement}
              onClick={decrementCount}
            >
              -
            </button>
            <p className={styles.countText}>{currentProduct.count}</p>
            <button
              type="button"
              className={styles.itemIncrement}
              onClick={incrementCount}
            >
              +
            </button>
          </div>
          <p className={styles.textCart}>В наличии: {stock} шт.</p>
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

CartItem.propTypes = {
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
