import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useSelector } from "react-redux"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { getTokenSelector } from "../../../redux/slices/userSlice"
import { Loader } from "../../Loader/Loader"
import { Modal } from "../../Modal/Modal"
import { AddNewProduct } from "../AddNewProduct/AddNewProduct"
import styles from "./user.module.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export const User = () => {
  const token = useSelector(getTokenSelector)
  const [isOpen, setIsOpen] = useState(false)
  const closeModalHandler = () => {
    setIsOpen(false)
  }
  const openModalHandler = () => {
    setIsOpen(true)
  }

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => dogFoodApi.getUserByToken(token),
    keepPreviousData: true,
  })
  if (isLoading) return <Loader />

  return (
    <>
      <h3 className={styles.title}>Информация о пользователе</h3>
      <div className={styles.wr}>
        <div className={styles.avatarBox}>
          <img className={styles.avatar} src={data.avatar} alt="avatar" />
          <button className={styles.avatarBtn} type="button">
            Изменить аватар
          </button>
        </div>
        <div>
          <div className={styles.infoBox}>
            <p className={styles.name}>
              <span className={styles.span}>Имя:</span>{" "}
              {data.name.split(" ", 1)}
            </p>
            <p className={styles.name}>
              <span className={styles.span}>Фамилия:</span>{" "}
              {data.name.split(" ").slice(1, 2)}
            </p>
            <p className={styles.about}>
              <span className={styles.span}>Информация:</span> Думает что
              &laquo;
              {data.about.toLowerCase()}&raquo;
            </p>
            <p className={styles.group}>
              <span className={styles.span}>Группа:</span> &laquo;{data.group}
              &raquo;
            </p>
            <p className={styles.email}>
              <span className={styles.span}>Email:</span> *****
              {data.email.substring(5)}
            </p>
          </div>
          <div className={styles.btnBox}>
            <p className={styles.textBtn}>Хотите добавить товар в магазин?</p>
            <button
              className={styles.avatarBtn}
              type="button"
              onClick={openModalHandler}
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} closeHandler={closeModalHandler}>
        <div className={styles.modal}>
          <FontAwesomeIcon
            className={styles.close}
            icon={faXmark}
            onClick={closeModalHandler}
          />
          <AddNewProduct />
        </div>
      </Modal>
    </>
  )
}
