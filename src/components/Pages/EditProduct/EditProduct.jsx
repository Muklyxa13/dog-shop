import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { getTokenSelector } from "../../../redux/slices/userSlice"
import { Loader } from "../../Loader/Loader"
import { validatorProduct } from "../AddNewProduct/validatorProduct"
import styles from "./EditProduct.module.css"
import PropTypes from "prop-types"

export const EditProduct = ({ closeEditModalHandler }) => {
  const { productId } = useParams()
  const token = useSelector(getTokenSelector)
  const queryClient = useQueryClient()
  const initEditProductValues = {
    pictures: "",
    name: "",
    price: "",
    discount: "",
    stock: "",
    wight: "",
    description: "",
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) => dogFoodApi.editProduct(values, token, productId),
  })

  const editHandler = async (values) => {
    await mutateAsync(values)
    closeEditModalHandler()
    queryClient.invalidateQueries({
      queryKey: ["detailPage"],
    })
  }

  if (isLoading) return <Loader />

  return (
    <Formik
      initialValues={initEditProductValues}
      validationSchema={validatorProduct}
      onSubmit={editHandler}
    >
      <Form className={styles.wr}>
        <div className={styles.inputBox}>
          <label htmlFor="pictures">Ссылка</label>
          <Field name="pictures" placeholder="url" type="text" />
          <div className={styles.errorMessage}>
            <ErrorMessage
              component="p"
              className={styles.error}
              name="pictures"
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="name">Название</label>
          <Field name="name" placeholder="название продукта" type="text" />
          <div className={styles.errorMessage}>
            <ErrorMessage component="p" className={styles.error} name="name" />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="price">Цена</label>
          <Field name="price" placeholder="цена продукта" type="text" />
          <div className={styles.errorMessage}>
            <ErrorMessage component="p" className={styles.error} name="price" />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="discount">Скидка</label>
          <Field name="discount" placeholder="скидка продукта" type="text" />
          <div className={styles.errorMessage}>
            <ErrorMessage
              component="p"
              className={styles.error}
              name="discount"
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="stock">Остаток</label>
          <Field name="stock" placeholder="количество продуктов" type="text" />
          <div className={styles.errorMessage}>
            <ErrorMessage component="p" className={styles.error} name="stock" />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="wight">Вес</label>
          <Field name="wight" placeholder="вес продукта" type="text" />
          <div className={styles.errorMessage}>
            <ErrorMessage component="p" className={styles.error} name="wight" />
          </div>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="description">Описание</label>
          <Field
            name="description"
            placeholder="описание продукта"
            type="text"
          />
          <div className={styles.errorMessage}>
            <ErrorMessage
              component="p"
              className={styles.error}
              name="description"
            />
          </div>
        </div>
        <button type="submit" className={styles.btn}>
          Обновить
        </button>
      </Form>
    </Formik>
  )
}

EditProduct.propTypes = {
  closeEditModalHandler: PropTypes.element,
}
