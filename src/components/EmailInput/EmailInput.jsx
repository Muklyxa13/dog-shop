import { ErrorMessage, Field } from "formik"
import styles from "./emailInput.module.css"

export const EmailInput = () => {
  return (
    <>
      <label htmlFor="email">Введите email</label>
      <Field name="email" placeholder="Email" type="text" />
      <div className={styles.errorMessage}>
        <ErrorMessage component="p" className="error" name="email" />
      </div>
    </>
  )
}
