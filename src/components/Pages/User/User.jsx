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
import { EditAvatarUser } from "../EditAvatarUser/EditAvatarUser"
import { Toaster } from "react-hot-toast"

export const User = () => {
  const token = useSelector(getTokenSelector)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenAvatarModal, setIsOpenAvatarModal] = useState(false)
  const closeModalHandler = () => {
    setIsOpen(false)
  }
  const openModalHandler = () => {
    setIsOpen(true)
  }
  const closeModalAvatarHandler = () => {
    setIsOpenAvatarModal(false)
  }
  const openModalAvatarHandler = () => {
    setIsOpenAvatarModal(true)
  }

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => dogFoodApi.getUserByToken(token),
    keepPreviousData: true,
  })
  if (isLoading) return <Loader />

  return (
    <div>
      <h3 className={styles.title}>Информация о пользователе</h3>
      <div className={styles.wr}>
        <div className={styles.avatarBox}>
          <img className={styles.avatar} src={data.avatar} alt="avatar" />
          <button
            className={styles.avatarBtn}
            type="button"
            onClick={openModalAvatarHandler}
          >
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
              <span className={styles.span}>Должность:</span> &laquo;
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
          <AddNewProduct closeModalHandler={closeModalHandler} />
        </div>
      </Modal>
      <Modal isOpen={isOpenAvatarModal} closeHandler={closeModalAvatarHandler}>
        <div className={styles.modal}>
          <FontAwesomeIcon
            className={styles.close}
            icon={faXmark}
            onClick={closeModalAvatarHandler}
          />
          <EditAvatarUser
            closeModalHandler={closeModalAvatarHandler}
            avatar={data.avatar}
          />
        </div>
      </Modal>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            border: "1px solid white",
            borderRadius: "8px",
            backgroundColor: "rgba(17, 28, 51, 0.6)",
            padding: "4px",
            color: "white",
          },
        }}
      />
    </div>
  )
}
