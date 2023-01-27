import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../Loader/Loader"
import { createSignInFormValidationScheme } from "./validator"
import styles from "./signIn.module.css"
import { useContext } from "react"
import { DogShopContext } from "../../../Contexts/DogShopContextProvider"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { PasswordInput } from "../../PasswordInput/PasswordInput"
import { EmailInput } from "../../EmailInput/EmailInput"

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

  if (isError) return <p className={styles.error}>{error.message}</p>
  if (isLoading) return <Loader />

  return (
    <Formik
      initialValues={initialLoginValues}
      validationSchema={createSignInFormValidationScheme}
      onSubmit={submitHandler}
    >
      <div className={styles.form_container}>
        <Form className={styles.formSignIn}>
          <EmailInput />
          <PasswordInput />
          <button disabled={isLoading} type="submit">
            Войти
          </button>
        </Form>
      </div>
    </Formik>
  )
}
