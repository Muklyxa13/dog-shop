import styles from "./productItem.module.css"
import PropTypes from "prop-types"

export const ProductItem = ({
  pictures,
  discount,
  price,
  stock,
  description,
}) => {
  return (
    <div className={styles.item}>
      <img className={styles.itemImg} src={pictures} alt="product" />
      <p>
        <span>Скида:</span> {discount} %
      </p>
      <p>
        <span>Цена:</span> {price} ₽
      </p>
      <p>
        <span>Осталось:</span> {stock} шт.
      </p>
      <span>Описание товара:</span>
      <p>&quot;{description}&quot;</p>
      <div className={styles.blockBtn}>
        <button className={styles.itemButton}>В корзину</button>
        <button className={styles.itemButton}>В избранное</button>
      </div>
    </div>
  )
}

ProductItem.propTypes = {
  pictures: PropTypes.string,
  discount: PropTypes.number,
  price: PropTypes.number,
  stock: PropTypes.number,
  description: PropTypes.string,
}
