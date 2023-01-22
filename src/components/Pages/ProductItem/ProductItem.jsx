import productItemStyles from "./productItem.module.css"
import PropTypes from "prop-types"

export const ProductItem = ({ product }) => {
  const { pictures, discount, price, stock, description } = product

  return (
    // <div className={productItemStyles.wr}>
    <div className={productItemStyles.item}>
      <img className={productItemStyles.itemImg} src={pictures} alt="product" />
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
      <div className={productItemStyles.blockBtn}>
        <button className={productItemStyles.itemButton}>В корзину</button>
        <button className={productItemStyles.itemButton}>В избранное</button>
      </div>
    </div>
    // </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.object,
}
