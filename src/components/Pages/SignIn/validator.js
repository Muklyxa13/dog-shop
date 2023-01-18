import * as Yup from "yup"

export const createSignInFormValidationScheme = Yup.object({
  email: Yup.string()
    .email("Некорректный email")
    .required("необходимо ввести email"),
  password: Yup.string()
    .min(6, "Введите больше 6 символов")
    .max(15, "Ваш пароль слишком длинный")
    .required("необходимо ввести пароль"),
})
