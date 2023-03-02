import * as Yup from "yup"

export const validatorProduct = Yup.object({
  pictures: Yup.string()
    .url("Должна быть ссылка")
    .required("Необходимо вставить url картинки"),
  name: Yup.string().required("Добавьте название товара"),
  price: Yup.number().required("Добавьте цену").typeError("Данные не число"),
  discount: Yup.number()
    .required("Добавьте скидку")
    .typeError("Данные не число"),
  stock: Yup.number().required("Добавьте остаток").typeError("Данные не число"),
  wight: Yup.string().required("Добавьте вес"),
  description: Yup.string()
    .min(3, "Введите больше 3 символов")
    .max(50, "Описание слишком длинное")
    .required("Добавьте описание"),
})
