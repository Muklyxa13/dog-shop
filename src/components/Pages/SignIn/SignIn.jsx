import { ErrorMessage, Field, Form, Formik } from "formik"
import { createSignUpFormValidationScheme } from "../SignUp/validator"
import formStyles from "./signIn.module.css"

const initialLoginValues = {
  email: "",
  password: "",
}

export const SignIn = () => {
  const submitHandler = (values) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={initialLoginValues}
      validationSchema={createSignUpFormValidationScheme}
      onSubmit={submitHandler}
    >
      <Form className={formStyles.formSignIn}>
        <Field name="email" placeholder="Email" type="text" />
        <ErrorMessage component="p" className="error" name="email" />

        <Field name="password" placeholder="Пароль" type="text" />
        <ErrorMessage component="p" className="error" name="password" />

        <button type="submit">Войти</button>
      </Form>
    </Formik>
  )
}
