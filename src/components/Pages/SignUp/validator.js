import * as Yup from "yup"

export const createSignUpFormValidationScheme = Yup.object({
  email: Yup.string()
    .email("Некорректный email")
    .required("Необходимо ввести email"),
  group: Yup.string().required("Необходимо ввести название группы"),
  password: Yup.string()
    .min(6, "Введите больше 6 символов")
    .max(15, "Ваш пароль слишком длинный")
    .required("Необходимо ввести пароль"),
})
