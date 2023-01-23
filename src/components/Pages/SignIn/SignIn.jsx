import { useMutation } from "@tanstack/react-query"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../Loader/Loader"
import { createSignInFormValidationScheme } from "./validator"
import formStyles from "./signIn.module.css"
import { useContext } from "react"
import { DogShopContext } from "../../../Contexts/DogShopContextProvider"
import { dogFoodApi } from "../../../API/DogFoodApi"

const initialLoginValues = {
  email: "",
  password: "",
}

export const SignIn = () => {
  const navigate = useNavigate()

  const { setToken } = useContext(DogShopContext)

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (values) =>
      dogFoodApi.signIn(values).then((data) => {
        setToken(data.token)
      }),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => {
      navigate(`/products`)
    }, 0)
  }

  if (isError) return <p>{error.message}</p>
  if (isLoading) return <Loader />

  return (
    <Formik
      initialValues={initialLoginValues}
      validationSchema={createSignInFormValidationScheme}
      onSubmit={submitHandler}
    >
      <div className={formStyles.form_container}>
        <Form className={formStyles.formSignIn}>
          <label htmlFor="email">Введите email</label>
          <Field name="email" placeholder="Email" type="text" />
          <ErrorMessage component="p" className="error" name="email" />

          <label htmlFor="password">Введите пароль</label>
          <Field name="password" placeholder="Пароль" type="text" />
          <ErrorMessage component="p" className="error" name="password" />

          <button type="submit">Войти</button>
        </Form>
      </div>
    </Formik>
  )
}
