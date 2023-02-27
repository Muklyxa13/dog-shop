import styles from "./main.module.css"
import imgDev from "../../images/under_const.png"
import { motion } from "framer-motion"

export const Main = () => {
  return (
    <motion.main
      className={styles.wr}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0 }}
    >
      <h1 className={styles.title}>В разработке</h1>
      <img className={styles.imgDev} src={imgDev} alt="в разработке" />
      <p className={styles.text}>
        Наш сайт в разработке, но мы готовы к работе!
      </p>
    </motion.main>
  )
}
