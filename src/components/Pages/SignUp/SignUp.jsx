import { ErrorMessage, Field, Form, Formik } from "formik"
import { createSignUpFormValidationScheme } from "./validator"
import formStyles from "./signUp.module.css"
import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { Loader } from "../../Loader/Loader"
import { dogFoodApi } from "../../../API/DogFoodApi"

const initialRegisterValues = {
  email: "",
  group: "",
  password: "",
}

export const SignUp = () => {
  const navigate = useNavigate()

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (values) => dogFoodApi.signUp(values),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)

    navigate("/signin")
  }

  if (isError) {
    return (
      <div className={formStyles.errorMessage}>
        <p className={formStyles.error}>{error.message}</p>
        <Link className={formStyles.errorBtn} to="/">
          На главную
        </Link>
      </div>
    )
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
          <Field name="group" placeholder='Введите "sm9"' type="text" />
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
