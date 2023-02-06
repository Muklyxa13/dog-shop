import { memo, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import styles from "./header.module.css"
import classNames from "classnames"
import logoImg from "../../images/logo.jpg"
import { DogShopContext } from "../../Contexts/DogShopContextProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import { getCartSelector } from "../../redux/slices/cartSlice"

export const Header = () => {
  const productsCart = useSelector(getCartSelector)

  const { removeToken, token } = useContext(DogShopContext)

  return (
    <header className={styles.wr}>
      <nav>
        <ul className={styles.headerLink}>
          <li>
            <div className={styles.headerLeft}>
              <Link to="/">
                <img
                  className={styles.logoImg}
                  src={logoImg}
                  alt="логотип"
                ></img>
              </Link>
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
            </div>
          </li>
          <div className={styles.headerUl}>
            {token ? (
              <li className={styles.cart}>
                <NavLink to="/cart">
                  {productsCart.length}{" "}
                  <FontAwesomeIcon icon={faCartShopping} />
                </NavLink>
              </li>
            ) : (
              ""
            )}
            {token ? (
              <li className={styles.btn}>
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
              <li className={styles.btn}>
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
            <li className={styles.btn}>
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
