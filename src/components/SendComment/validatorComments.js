import * as Yup from "yup"

export const validatorComments = Yup.object({
  text: Yup.string()
    .min(3, "Введите больше 3 символов")
    .max(50, "Отзыв слишком большой")
    .required("Необходимо написать отзыв"),
  rating: Yup.string().required("Необходимо поставить рейтинг"),
})
