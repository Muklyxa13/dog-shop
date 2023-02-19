import { useMutation } from "@tanstack/react-query"
import { Field, Formik } from "formik"
import { useSelector } from "react-redux"
import { Form } from "react-router-dom"
import { dogFoodApi } from "../../API/DogFoodApi"
import { getTokenSelector } from "../../redux/slices/userSlice"
import { Loader } from "../Loader/Loader"

const initialCommentValues = {
  text: "",
}

export const Comments = () => {
  const token = useSelector(getTokenSelector)

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values, id) => dogFoodApi.setCommentById(values, id, token),
  })
  const submitHandler = async (values) => {
    await mutateAsync(values)
  }
  if (isLoading) return <Loader />

  return (
    <Formik initialValues={initialCommentValues} onSubmit={submitHandler}>
      <Form>
        <label htmlFor="commit">Напишите отзыв:</label>
        <Field name="commit" placeholder="напишите свой отзыв" type="text" />
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  )
}
