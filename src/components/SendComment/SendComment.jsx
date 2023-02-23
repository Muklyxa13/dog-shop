import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorMessage, Field, Formik, Form } from "formik"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { dogFoodApi } from "../../API/DogFoodApi"
import { getTokenSelector } from "../../redux/slices/userSlice"
import { Loader } from "../Loader/Loader"
import styles from "./sendComment.module.css"
import { validatorComments } from "./validatorComments"
import { FaStar } from "react-icons/fa"
import { useState } from "react"

export const SendComment = () => {
  const stars = Array(5).fill(0)
  const { productId } = useParams()
  const queryClient = useQueryClient()
  const [currentValue, setCurrentValue] = useState(0)
  const [hoverValue, setHoverValue] = useState(undefined)
  const token = useSelector(getTokenSelector)
  const initValues = {
    text: "",
    rating: "",
  }

  const COLORSTARS = {
    orange: "#FFBA5A",
    gray: "#a9a9a9a9",
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) =>
      dogFoodApi.pushCommentById(productId, token, values),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    queryClient.invalidateQueries({
      queryKey: ["reviews"],
    })
  }

  if (isLoading) return <Loader />

  const handleClick = (value) => {
    setCurrentValue(value)
  }
  const handleMouseOver = (value) => {
    setHoverValue(value)
  }
  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validatorComments}
      onSubmit={submitHandler}
    >
      {({ setFieldValue }) => (
        <Form className={styles.wr}>
          <div>
            <label htmlFor="text" className={styles.label}>
              Оставьте отзыв
            </label>
            <div className={styles.stars}>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={24}
                    onClick={() => {
                      handleClick(index + 1)
                      setFieldValue("rating", index + 1)
                    }}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeave}
                    color={
                      (hoverValue || currentValue) > index
                        ? COLORSTARS.orange
                        : COLORSTARS.gray
                    }
                  />
                )
              })}
            </div>
            <Field
              className={styles.field}
              name="text"
              placeholder="Напишите отзыв о товаре..."
              type="text"
            />
            <div className={styles.errorMessage}>
              <ErrorMessage
                component="p"
                className={styles.error}
                name="text"
              />
            </div>
          </div>
          <button className={styles.btn} type="submit">
            Оставить отзыв
          </button>
        </Form>
      )}
    </Formik>
  )
}
