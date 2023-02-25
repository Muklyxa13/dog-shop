import * as Yup from "yup"

export const validatorProduct = Yup.object({
  pictures: Yup.string().url().required("Необходимо вставить url картинки"),
  name: Yup.string().required("Необходимо написать название товара"),
  price: Yup.string().required("Необходимо написать цену"),
  discount: Yup.string().required("Необходимо написать скидку"),
  stock: Yup.string().required("Необходимо написать остаток"),
  wight: Yup.string().required("Необходимо написать вес"),
  description: Yup.string()
    .min(3, "Введите больше 3 символов")
    .max(50, "Описание слишком длинное")
    .required("Необходимо написать описание"),
})
