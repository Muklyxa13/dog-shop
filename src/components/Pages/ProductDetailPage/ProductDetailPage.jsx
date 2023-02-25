import { useMutation, useQuery } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { dogFoodApi } from "../../../API/DogFoodApi"
import {
  getTokenSelector,
  getUserIdSelector,
} from "../../../redux/slices/userSlice"
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
import { SendComment } from "../../SendComment/SendComment"
import { ProductReviewsById } from "./ProductReviewsById/ProductReviewsById"
import { Modal } from "../../Modal/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { EditProduct } from "../EditProduct/EditProduct"
import { useState } from "react"

export const ProductDetailPage = () => {
  const { productId } = useParams()
  const dispath = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(getTokenSelector)
  const userId = useSelector(getUserIdSelector)
  const cartDataIds = useSelector(getCartDetailsSelector)
  const favoritePage = useSelector(getFavoriteSelector)

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const closeEditModalHandler = () => {
    setIsOpenEditModal(false)
  }
  const openEditModalHandler = () => {
    setIsOpenEditModal(true)
  }
  const closeDeleteModalHandler = () => {
    setIsOpenDeleteModal(false)
  }
  const openDeleteModalHandler = () => {
    setIsOpenDeleteModal(true)
  }

  const { data, isLoading } = useQuery({
    queryKey: ["detailPage"],
    queryFn: () => dogFoodApi.getProductById(productId, token),
    keepPreviousData: true,
  })

  const {
    mutateAsync,
    isLoading: isDeleteLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: () => dogFoodApi.deleteProduct(token, productId),
  })

  const deleteHandler = async () => {
    await mutateAsync()
    navigate("/products")
  }

  if (isLoading || isDeleteLoading) return <Loader />
  if (isError) {
    return (
      <div className={styles.errorMessage}>
        <div className={styles.error}>
          <p>{error.message}</p>
          <Link className={styles.errorBtn} to="/products">
            К продуктам..
          </Link>
        </div>
      </div>
    )
  }

  if (userId === data.author._id) {
    console.log("это ваш товар")
  } else console.log("это не ваш товар")

  const addItemToCart = () => dispath(addCartDetails(data._id)) // добавление товара в корзину
  const addProductFavorite = () => dispath(addFavorite(data._id)) // добавление товара в избранное
  const isExistInCart = cartDataIds.map(({ id }) => id).includes(data._id) // проверка на добавление товара в корзину (деструктуризируем объект и сразу получаем id)
  const isExistInFavorite = favoritePage.map(({ id }) => id).includes(data._id) // проверка на добавление товара в избранное

  return (
    <>
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
              {userId === data.author._id && (
                <>
                  <button type="submit" onClick={openDeleteModalHandler}>
                    Удалить
                  </button>
                  <button type="submit" onClick={openEditModalHandler}>
                    Редактировать
                  </button>
                </>
              )}
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
            <p className={styles.reviews}>Отзывы о товаре:</p>
            <ProductReviewsById />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenEditModal} closeHandler={closeEditModalHandler}>
        <div className={styles.modal}>
          <FontAwesomeIcon
            className={styles.close}
            icon={faXmark}
            onClick={closeEditModalHandler}
          />
          <EditProduct />
        </div>
      </Modal>
      <Modal isOpen={isOpenDeleteModal} closeHandler={closeDeleteModalHandler}>
        <div className={styles.modal}>
          <FontAwesomeIcon
            className={styles.close}
            icon={faXmark}
            onClick={closeDeleteModalHandler}
          />
          <div>
            <p className={styles.textDelete}>
              Удалить товар &laquo;{data.name}&raquo;?
            </p>
            <div className={styles.btnDeleteBox}>
              <button
                className={styles.btnDelete}
                type="submit"
                onClick={deleteHandler}
              >
                Да
              </button>
              <button
                className={styles.btnDelete}
                type="button"
                onClick={closeDeleteModalHandler}
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

ProductDetailPage.propTypes = {
  rating: PropTypes.number,
}
