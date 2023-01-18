import { ErrorMessage, Field, Form, Formik } from "formik"
import { createSignUpFormValidationScheme } from "./validator"
import formStyles from "./signUp.module.css"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../Loader/Loader"

const initialRegisterValues = {
  email: "",
  group: "",
  password: "",
}

export const SignUp = () => {
  const navigate = useNavigate()

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data) => {
      return fetch("https://api.react-learning.ru/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status > 299) {
          throw new Error(
            `Ошибка ${res.status}: пользователь с таким email уже зарегистрирован`
          )
        } else res.json()
      })
    },
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)

    navigate("/signin")
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  if (isLoading) return <Loader />

  return (
    <Formik
      initialValues={initialRegisterValues}
      validationSchema={createSignUpFormValidationScheme}
      onSubmit={submitHandler}
    >
      <div className={formStyles.form_container}>
        <Form className={formStyles.formSignUp}>
          <label htmlFor="email">Введите email</label>
          <Field name="email" placeholder="Email" type="text" />
          <ErrorMessage component="p" className="error" name="email" />

          <label htmlFor="group">Введите вашу группу</label>
          <Field name="group" placeholder="Группа" type="text" />
          <ErrorMessage component="p" className="error" name="group" />

          <label htmlFor="password">Введите пароль</label>
          <Field name="password" placeholder="Пароль" type="text" />
          <ErrorMessage component="p" className="error" name="password" />

          <button disabled={isLoading} type="submit">
            Регистрация
          </button>
        </Form>
      </div>
    </Formik>
  )
}
