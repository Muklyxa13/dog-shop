import * as Yup from "yup"

export const validatorProduct = Yup.object({
  pictures: Yup.string()
    .url("Должна быть ссылка")
    .required("Необходимо вставить url картинки"),
  name: Yup.string().required("Необходимо написать название товара"),
  price: Yup.number()
    .required("Необходимо написать цену")
    .typeError("Данные не число"),
  discount: Yup.number()
    .required("Необходимо написать скидку")
    .typeError("Данные не число"),
  stock: Yup.number()
    .required("Необходимо написать остаток")
    .typeError("Данные не число"),
  wight: Yup.string().required("Необходимо написать вес"),
  description: Yup.string()
    .min(3, "Введите больше 3 символов")
    .max(50, "Описание слишком длинное")
    .required("Необходимо написать описание"),
})
