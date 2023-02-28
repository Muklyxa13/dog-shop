import styles from "./main.module.css"
import imgDev from "../../images/under_const.png"

export const Main = () => {
  return (
    <main className={styles.wr}>
      <h1 className={styles.title}>В разработке</h1>
      <img className={styles.imgDev} src={imgDev} alt="в разработке" />
      <p className={styles.text}>
        Наш сайт в разработке, но мы готовы к работе!
      </p>
    </main>
  )
}
