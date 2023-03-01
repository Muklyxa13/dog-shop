import * as Yup from "yup"

export const validatorAvatar = Yup.object({
  avatar: Yup.string().url().required("Необходимо вставить url картинки"),
})
