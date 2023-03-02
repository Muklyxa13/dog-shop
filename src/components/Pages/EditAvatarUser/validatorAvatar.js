import * as Yup from "yup"

export const validatorAvatar = Yup.object({
  avatar: Yup.string()
    .url("Должна быть ссылка")
    .required("Необходимо вставить url картинки"),
})
