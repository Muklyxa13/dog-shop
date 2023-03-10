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
  deleteCartDetails,
  getCartDetailsSelector,
} from "../../../redux/slices/cartDetailsSlice"
import {
  addFavorite,
  deleteFavorite,
  getFavoriteSelector,
} from "../../../redux/slices/favoriteSlice"
import { SendComment } from "../../SendComment/SendComment"
import { ProductReviewsById } from "./ProductReviewsById/ProductReviewsById"
import { Modal } from "../../Modal/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { EditProduct } from "../EditProduct/EditProduct"
import { useState } from "react"
import { Toaster } from "react-hot-toast"

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
    document.body.style.overflow = ""
    // document.body.style.paddingRight = ""
    setIsOpenEditModal(false)
  }
  const openEditModalHandler = () => {
    document.body.style.overflow = "hidden"
    // document.body.style.paddingRight = "17px"
    setIsOpenEditModal(true)
  }
  const closeDeleteModalHandler = () => {
    document.body.style.overflow = ""
    setIsOpenDeleteModal(false)
  }
  const openDeleteModalHandler = () => {
    document.body.style.overflow = "hidden"
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
    dispath(deleteCartDetails(productId))
    dispath(deleteFavorite(productId))
    document.body.style.overflow = ""
    navigate("/products")
  }

  if (isLoading || isDeleteLoading) return <Loader />
  if (isError) {
    return (
      <div className={styles.errorMessage}>
        <div className={styles.error}>
          <p>{error.message}</p>
          <Link className={styles.errorBtn} to="/products">
            ?? ??????????????????..
          </Link>
        </div>
      </div>
    )
  }

  const addItemToCart = () => dispath(addCartDetails(data._id)) // ???????????????????? ???????????? ?? ??????????????
  const addProductFavorite = () => dispath(addFavorite(data._id)) // ???????????????????? ???????????? ?? ??????????????????
  const isExistInCart = cartDataIds.map(({ id }) => id).includes(data._id) // ???????????????? ???? ???????????????????? ???????????? ?? ?????????????? (?????????????????????????????????? ???????????? ?? ?????????? ???????????????? id)
  const isExistInFavorite = favoritePage.map(({ id }) => id).includes(data._id) // ???????????????? ???? ???????????????????? ???????????? ?? ??????????????????

  return (
    <>
      <div className={styles.wr}>
        <div className={styles.left}>
          <img className={styles.img} src={data.pictures} alt="pictures" />
          <div className={styles.infoBox}>
            <p className={styles.infoTitle}>?????????????????? ???????????????? ?? ????????????:</p>
            <p className={styles.info}>
              <span>????????????:</span> ?????????????????? (????????????????/??????????)
            </p>
            <p className={styles.info}>
              <span>??????????????:</span> + 25 ??????/????
            </p>
            <p className={styles.info}>
              <span>????????????:</span> ???? 1000 ?????? (?????????????????????? ????????????)
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>&laquo;{data.name}&raquo;</h3>
          <p className={styles.id}>??????????????: {data._id}</p>
          <div className={styles.priceAndBtn}>
            <div className={styles.priceBox}>
              <p className={styles.discount}>
                {data.discount > 0 &&
                  `${(data.price * (100 - data.discount)) / 100} ???`}
                {data.discount === 0 && `${data.price} ???`}
              </p>
              <p className={styles.price}>
                {data.discount > 0 && `${data.price} ???`}
              </p>
            </div>
            <div className={styles.btn}>
              <button
                type="button"
                onClick={addItemToCart}
                disabled={isExistInCart}
              >
                {isExistInCart ? "?? ??????????????" : "?? ??????????????"}
              </button>
              <button
                type="button"
                onClick={addProductFavorite}
                disabled={isExistInFavorite}
              >
                {isExistInFavorite ? "?? ??????????????????" : "?? ??????????????????"}
              </button>
              {userId === data.author._id && (
                <>
                  <button type="submit" onClick={openDeleteModalHandler}>
                    ??????????????
                  </button>
                  <button type="submit" onClick={openEditModalHandler}>
                    ??????????????????????????
                  </button>
                </>
              )}
            </div>
          </div>
          <p className={styles.stock}>
            <span>??????????????:</span> {data.stock} ????
          </p>
          <p className={styles.wight}>
            <span>??????:</span> {data.wight}
          </p>
          <p className={styles.descriptionTitle}>
            <span>?? ????????????:</span>
          </p>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>
      <div className={styles.test}>
        <div className={styles.commentsBox}>
          <SendComment />
          <div>
            <p className={styles.reviews}>???????????? ?? ????????????:</p>
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
          <EditProduct
            closeEditModalHandler={closeEditModalHandler}
            pictures={data.pictures}
            name={data.name}
            price={data.price}
            discount={data.discount}
            stock={data.stock}
            wight={data.wight}
            description={data.description}
          />
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
              ?????????????? ?????????? &laquo;{data.name}&raquo;?
            </p>
            <div className={styles.btnDeleteBox}>
              <button
                className={styles.btnDelete}
                type="submit"
                onClick={deleteHandler}
              >
                ????
              </button>
              <button
                className={styles.btnDelete}
                type="button"
                onClick={closeDeleteModalHandler}
              >
                ??????
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            border: "1px solid white",
            borderRadius: "8px",
            backgroundColor: "rgba(17, 28, 51, 0.6)",
            padding: "4px",
            color: "white",
          },
        }}
      />
    </>
  )
}

ProductDetailPage.propTypes = {
  rating: PropTypes.number,
}
