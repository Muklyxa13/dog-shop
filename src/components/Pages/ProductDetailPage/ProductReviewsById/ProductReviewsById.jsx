import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { dogFoodApi } from "../../../../API/DogFoodApi"
import {
  getTokenSelector,
  getUserIdSelector,
} from "../../../../redux/slices/userSlice"
import { Loader } from "../../../Loader/Loader"
import { ReactComponent as Star } from "../../../../images/star_painted.svg"
import styles from "./ProductReviewsById.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

export const ProductReviewsById = () => {
  const { productId } = useParams()
  const token = useSelector(getTokenSelector)
  const userId = useSelector(getUserIdSelector)
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => dogFoodApi.getReviewsById(productId, token),
    keepPreviousData: true,
  })

  const { mutateAsync, isLoading: isLoadingDelete } = useMutation({
    mutationFn: (reviewId) =>
      dogFoodApi.deleteComment(token, productId, reviewId),
  })

  const deleteHandler = async (reviewId) => {
    await mutateAsync(reviewId)
    queryClient.invalidateQueries({
      queryKey: ["reviews"],
    })
  }

  if (isLoading || isLoadingDelete) return <Loader />

  const stars = (rating) => {
    let arrStars = [] // хранилище для *
    arrStars.length = rating
    return arrStars
      .fill(null)
      .map((_, index) => <Star key={index} className={styles.star} />)
  }

  return (
    <>
      {!data.length ? (
        <div className={styles.clearCart}>
          <p className={styles.clearCartText}>
            Отзывов еще нет, будьте первыми!
          </p>
        </div>
      ) : (
        <div className={styles.wr}>
          {data
            .map((el) => (
              <div key={el._id} className={styles.commentsContainer}>
                <div className={styles.infoUser}>
                  <div className={styles.infoUserText}>
                    <img
                      className={styles.avatar}
                      src={el.author.avatar}
                      alt="avatar"
                    />
                    <div className={styles.aboutUser}>
                      <p className={styles.name}>
                        <span className={styles.nameSpan}>Пользователь:</span>{" "}
                        {el.author.name}
                      </p>
                      <p className={styles.about}>
                        <span className={styles.aboutSpan}>Должность:</span>{" "}
                        {el.author.about}
                      </p>
                    </div>
                  </div>
                  <div className={styles.ratingBox}>
                    <span className={styles.ratingSpan}>Рейтинг:</span>
                    <p className={styles.rating}>{stars(el.rating)}</p>
                  </div>
                </div>
                <hr className={styles.hr} />
                <p className={styles.text}>{el.text}</p>
                <hr className={styles.hr} />
                <div className={styles.deleteCommentBox}>
                  {el.author._id === userId ? (
                    <>
                      <FontAwesomeIcon
                        className={styles.trash}
                        icon={faTrashCan}
                        onClick={() => deleteHandler(el._id)}
                      />
                    </>
                  ) : (
                    <p></p>
                  )}
                  <p className={styles.date}>
                    Дата отзыва:{" "}
                    {el.created_at
                      .substring(0, 10)
                      .split("-")
                      .reverse()
                      .join(".")}
                  </p>
                </div>
              </div>
            ))
            .reverse()}
        </div>
      )}
    </>
  )
}
