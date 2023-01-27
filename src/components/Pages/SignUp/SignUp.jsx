import { Form, Formik } from "formik"
import { createSignUpFormValidationScheme } from "./validator"
import styles from "./signUp.module.css"
import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { Loader } from "../../Loader/Loader"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { PasswordInput } from "../../PasswordInput/PasswordInput"
import { EmailInput } from "../../EmailInput/EmailInput"
import { GroupInput } from "../../GroupInput/GroupInput"

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
      <div className={styles.errorMessage}>
        <p className={styles.error}>{error.message}</p>
        <Link className={styles.errorBtn} to="/">
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
      <div className={styles.form_container}>
        <Form className={styles.formSignUp}>
          <EmailInput />
          <GroupInput />
          <PasswordInput />
          <button disabled={isLoading} type="submit">
            Регистрация
          </button>
        </Form>
      </div>
    </Formik>
  )
}
