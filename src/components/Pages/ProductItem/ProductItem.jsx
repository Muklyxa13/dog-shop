import productItemStyles from "./productItem.module.css"
import PropTypes from "prop-types"

export const ProductItem = ({ product }) => {
  const { pictures, discount, price, stock, description } = product

  return (
    <div className={productItemStyles.wr}>
      <div className={productItemStyles.item}>
        <img
          className={productItemStyles.itemImg}
          src={pictures}
          alt="product"
        />
        <p>
          <span>скида:</span> {discount} %
        </p>
        <p>
          <span>цена:</span> {price} ₽
        </p>
        <p>
          <span>осталось:</span> {stock} шт.
        </p>
        <p>
          <span>Описание:</span> &quot;{description}&quot;
        </p>
        <button className={productItemStyles.itemButton}>В корзину</button>
      </div>
    </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.object,
}
