import { useMutation } from "@tanstack/react-query"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../Loader/Loader"
import { createSignInFormValidationScheme } from "./validator"
import formStyles from "./signIn.module.css"

const initialLoginValues = {
  email: "",
  password: "",
}

const TOKEN_LS = "TOKEN_LS"

export const SignIn = () => {
  const navigate = useNavigate()

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data) => {
      return fetch("https://api.react-learning.ru/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.status === 401) {
            throw new Error(
              `Ошибка ${res.status}: не правильные логин или пароль`
            )
          }
          if (res.status === 404) {
            throw new Error(
              `Ошибка ${res.status}: пользователь с email не найден`
            )
          }

          return res
        })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(TOKEN_LS, data.token)
        })
    },
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)

    navigate("/")
  }

  if (isError) {
    return <p>{error.message}</p>
  }

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
