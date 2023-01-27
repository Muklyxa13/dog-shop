import { ErrorMessage, Field } from "formik"
import styles from "./groupInput.module.css"

export const GroupInput = () => {
  return (
    <>
      <label htmlFor="group">Введите вашу группу</label>
      <Field name="group" placeholder='Введите "sm9"' type="text" />
      <div className={styles.errorMessage}>
        <ErrorMessage component="p" className="error" name="group" />
      </div>
    </>
  )
}
