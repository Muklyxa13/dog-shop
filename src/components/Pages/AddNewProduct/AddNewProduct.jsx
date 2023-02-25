import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { Loader } from "../../Loader/Loader"
import styles from "./AddNewProduct.module.css"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { validatorProduct } from "./validatorProduct"
import { getTokenSelector } from "../../../redux/slices/userSlice"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

export const AddNewProduct = ({ closeModalHandler }) => {
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const initProductValues = {
    pictures: "",
    name: "",
    price: "",
    discount: "",
    stock: "",
    wight: "",
    description: "",
  }

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (values) => dogFoodApi.addNewProduct(values, token),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    closeModalHandler()
    queryClient.invalidateQueries({
      queryKey: ["user"],
    })
  }

  if (isLoading) return <Loader />

  return (
    <Formik
      initialValues={initProductValues}
      validationSchema={validatorProduct}
      onSubmit={submitHandler}
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
          Создать
        </button>
      </Form>
    </Formik>
  )
}

AddNewProduct.propTypes = {
  closeModalHandler: PropTypes.element,
}
