import { ErrorMessage, Field, Form, Formik } from "formik"
import { createSignUpFormValidationScheme } from "./validator"
import formStyles from "./signUp.module.css"

const initialRegisterValues = {
  email: "",
  group: "",
  password: "",
}

export const SignUp = () => {
  const submitHandler = (values) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={initialRegisterValues}
      validationSchema={createSignUpFormValidationScheme}
      onSubmit={submitHandler}
    >
      <Form className={formStyles.formSignUp}>
        <Field name="email" placeholder="Email" type="text" />
        <ErrorMessage component="p" className="error" name="email" />

        <Field name="group" placeholder="Группа" type="text" />
        <ErrorMessage component="p" className="error" name="group" />

        <Field name="password" placeholder="Пароль" type="text" />
        <ErrorMessage component="p" className="error" name="password" />

        <button type="submit">Регистрация</button>
      </Form>
    </Formik>
  )
}
