import * as Yup from "yup"

export const createSignUpFormValidationScheme = Yup.object({
  email: Yup.string()
    .email("Некорректный email")
    .required("необходимо ввести email"),
  group: Yup.string().required("необходимо ввести название группы"),
  password: Yup.string()
    .min(6, "Введите больше 6 символов")
    .max(15, "Ваш пароль слишком длинный")
    .required("необходимо ввести пароль"),
})
