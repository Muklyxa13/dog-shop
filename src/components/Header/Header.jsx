import { memo, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import styles from "./header.module.css"
import classNames from "classnames"
import logoImg from "../../images/logo.jpg"
import { DogShopContext } from "../../Contexts/DogShopContextProvider"

export const Header = () => {
  // const deleteToken = () => {
  //   localStorage.removeItem("DOGSHOP_LS_KEY")
  //   localStorage.removeItem("TOKEN_LS")
  // }

  const { removeToken, token } = useContext(DogShopContext)

  return (
    <header className={styles.wr}>
      <nav>
        <ul className={styles.headerLink}>
          <li>
            <Link to="/">
              <img className={styles.logoImg} src={logoImg} alt="логотип"></img>
            </Link>
          </li>
          <div className={styles.productsLink}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  classNames({ [styles.activeLink]: isActive })
                }
                to="/products"
              >
                Каталог
              </NavLink>
            </li>
          </div>
          <div className={styles.headerUl}>
            {token ? (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    classNames({ [styles.activeLink]: isActive })
                  }
                  to="/signin"
                  onClick={removeToken}
                >
                  Выйти
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    classNames({ [styles.activeLink]: isActive })
                  }
                  to="/signin"
                >
                  Войти
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                className={({ isActive }) =>
                  classNames({ [styles.activeLink]: isActive })
                }
                to="/signup"
              >
                Регистрация
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  )
}

export const HeaderMemo = memo(Header)
