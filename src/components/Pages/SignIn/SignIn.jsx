import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { Loader } from "../../Loader/Loader"
import { createSignInFormValidationScheme } from "./validator"
import styles from "./signIn.module.css"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { PasswordInput } from "../../PasswordInput/PasswordInput"
import { EmailInput } from "../../EmailInput/EmailInput"
import { useDispatch } from "react-redux"
import { setUser } from "../../../redux/slices/userSlice"
import back from "../../../images/back.jpg"

const initialLoginValues = {
  email: "",
  password: "",
}

export const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (values) =>
      dogFoodApi.signIn(values).then((data) => {
        dispatch(setUser(data))
      }),
  })
  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => {
      navigate(`/products`)
    }, 0)
  }
  if (isError) {
    return (
      <div className={styles.errorMessage}>
        <img src={back} alt="back" />
        <div className={styles.error}>
          <p>{error.message}</p>
          <Link className={styles.errorBtn} to="/">
            На главную
          </Link>
        </div>
      </div>
    )
  }
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
