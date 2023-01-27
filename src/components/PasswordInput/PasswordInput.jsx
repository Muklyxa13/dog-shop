import { ErrorMessage, Field } from "formik"
import { useState } from "react"
import styles from "./passwordInput.module.css"

export const PasswordInput = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <>
      <label htmlFor="password">Введите пароль</label>
      <div className={styles.inputPassword}>
        <Field
          id="passwordInput"
          name="password"
          placeholder="Пароль"
          type={isShowPassword === true ? "text" : "password"}
        />
        <img
          src={
            isShowPassword === true
              ? "https://snipp.ru/demo/495/no-view.svg"
              : "https://snipp.ru/demo/495/view.svg"
          }
          alt="hide"
          onClick={() => setIsShowPassword(!isShowPassword)}
          className={styles.passwordControl}
        />
      </div>
      <div className={styles.errorMessage}>
        <ErrorMessage component="p" className="error" name="password" />
      </div>
    </>
  )
}
