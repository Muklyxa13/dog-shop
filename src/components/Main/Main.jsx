import styles from "./main.module.css"
import dogs from "../../../src/video/dogs.mp4"

export const Main = () => {
  return (
    <>
      <div className={styles.wr}>
        <div className={styles.fullScreen}>
          <div className={styles.fullScreenBody}>
            <div className={styles.fullScreenTitle}>
              Dog Shop <span className={styles.span}>[</span>Doberman
              <span className={styles.span}>]</span>
            </div>
            <div className={styles.fullScreenText}>
              Добро пожаловать в наш магазин!
            </div>
          </div>
          <video
            preload="auto"
            autoPlay
            muted
            loop
            className={styles.fullScreenVideo}
          >
            <source type="video/mp4" src={dogs} />
          </video>
        </div>
      </div>
    </>
  )
}
