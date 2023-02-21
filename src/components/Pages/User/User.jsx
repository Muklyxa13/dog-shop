import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import { dogFoodApi } from "../../../API/DogFoodApi"
import { getTokenSelector } from "../../../redux/slices/userSlice"
import { Loader } from "../../Loader/Loader"
import styles from "./user.module.css"

export const User = () => {
  const token = useSelector(getTokenSelector)
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
        <div className={styles.infoBox}>
          <p className={styles.name}>
            <span className={styles.span}>Имя:</span> {data.name.split(" ", 1)}
          </p>
          <p className={styles.name}>
            <span className={styles.span}>Фамилия:</span>{" "}
            {data.name.split(" ").slice(1, 2)}
          </p>
          <p className={styles.about}>
            <span className={styles.span}>Информация:</span> Думает что &laquo;
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
      </div>
    </>
  )
}
