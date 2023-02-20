import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useSelector } from "react-redux"
import { Form, useParams } from "react-router-dom"
import { dogFoodApi } from "../../API/DogFoodApi"
import { getTokenSelector } from "../../redux/slices/userSlice"
import { Loader } from "../Loader/Loader"
import styles from "./sendComment.module.css"

export const SendComment = () => {
  const { productId } = useParams()
  const token = useSelector(getTokenSelector)
  // console.log({ productId, token })
  const initialTextValues = {
    text: "",
  }

  // const { mutateAsync, isLoading } = useMutation({
  //   mutationFn: () => dogFoodApi.setCommentById(productId, token),
  // })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) =>
      fetch(`https://api.react-learning.ru/products/review/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
  })

  const submitHandler = async (values) => {
    console.log(values)
    await mutateAsync(values)
  }
  console.log({ submitHandler })

  if (isLoading) return <Loader />

  return (
    <Formik onSubmit={submitHandler} initialValues={initialTextValues}>
      <Form className={styles.wr}>
        <textarea
          className={styles.textarea}
          placeholder="Напишите отзыв о товаре..."
        />
        <button className={styles.btn} type="submit">
          Оставить отзыв
        </button>
      </Form>
    </Formik>
  )
}
