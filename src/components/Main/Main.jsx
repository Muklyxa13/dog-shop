import mainStyles from "./main.module.css"
import imgDev from "../../images/under_const.png"

export const Main = () => {
  return (
    <main className={mainStyles.wr}>
      <h1 className={mainStyles.title}>В разработке</h1>
      <img className={mainStyles.imgDev} src={imgDev} alt="в разработке" />
      <p className={mainStyles.text}>
        Наш сайт в разработке, но мы готовы к работе!
      </p>
    </main>
  )
}
