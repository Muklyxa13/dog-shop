import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useSelector } from "react-redux"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { getTokenSelector } from "../../../redux/slices/userSlice"
import { Loader } from "../../Loader/Loader"
import { validatorAvatar } from "./validatorAvatar"
import styles from "./EditAvatarUser.module.css"
import PropTypes from "prop-types"

export const EditAvatarUser = ({ closeModalHandler, avatar }) => {
  const token = useSelector(getTokenSelector)
  const queryClient = useQueryClient()
  const initAvatarValue = {
    avatar,
  }
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (value) => dogFoodApi.editUserAvatar(token, value),
  })

  const sumbitAvatarHandler = async (value) => {
    await mutateAsync(value)
    closeModalHandler()
    queryClient.invalidateQueries({
      queryKey: ["user"],
    })
  }

  if (isLoading) return <Loader />

  return (
    <>
      <Formik
        initialValues={initAvatarValue}
        validationSchema={validatorAvatar}
        onSubmit={sumbitAvatarHandler}
      >
        <Form className={styles.wr}>
          <div className={styles.inputBox}>
            <label htmlFor="avatar">Ссылка</label>
            <Field name="avatar" placeholder="Url фото" type="text" />
            <div className={styles.errorMessage}>
              <ErrorMessage
                component="p"
                className={styles.error}
                name="avatar"
              />
            </div>
          </div>
          <button type="submit" className={styles.btn}>
            Обновить
          </button>
        </Form>
      </Formik>
    </>
  )
}

EditAvatarUser.propTypes = {
  closeModalHandler: PropTypes.func,
  avatar: PropTypes.string,
}
