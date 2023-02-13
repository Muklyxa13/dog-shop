import { memo } from "react"
import { Link, NavLink } from "react-router-dom"
import styles from "./header.module.css"
import classNames from "classnames"
import logoTest from "../../images/logo_test.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { getCartDetailsSelector } from "../../redux/slices/cartDetailsSlice"
import { getTokenSelector, removeUser } from "../../redux/slices/userSlice"

export const Header = () => {
  const dispatch = useDispatch()
  const productsCart = useSelector(getCartDetailsSelector) // массив товаров, добавленных корзину
  const token = useSelector(getTokenSelector)
  const deleteUser = () => {
    dispatch(removeUser()) // удаляем пользователя, при нажатии на "Выйти"
  }

  return (
    <header className={styles.wr}>
      <nav>
        <ul className={styles.headerLink}>
          <li>
            <div className={styles.headerLeft}>
              <Link to="/">
                <img
                  className={styles.logoImg}
                  src={logoTest}
                  alt="логотип"
                ></img>
              </Link>
              <div className={styles.productsLink}>
                <NavLink
                  className={({ isActive }) =>
                    classNames({ [styles.activeLink]: isActive })
                  }
                  to="/products"
                >
                  Каталог
                </NavLink>
              </div>
            </div>
          </li>
          <li className={styles.headerUl}>
            {token ? (
              <div className={styles.cart}>
                <NavLink to="/cart">
                  {productsCart.length}{" "}
                  <FontAwesomeIcon icon={faCartShopping} />
                </NavLink>
              </div>
            ) : (
              ""
            )}
            {token ? (
              <div className={styles.btn}>
                <NavLink
                  className={({ isActive }) =>
                    classNames({ [styles.activeLink]: isActive })
                  }
                  to="/signin"
                  onClick={deleteUser}
                >
                  Выйти
                </NavLink>
              </div>
            ) : (
              <div className={styles.btn}>
                <NavLink
                  className={({ isActive }) =>
                    classNames({ [styles.activeLink]: isActive })
                  }
                  to="/signin"
                >
                  Войти
                </NavLink>
              </div>
            )}
            <div className={styles.btn}>
              <NavLink
                className={({ isActive }) =>
                  classNames({ [styles.activeLink]: isActive })
                }
                to="/signup"
              >
                Регистрация
              </NavLink>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export const HeaderMemo = memo(Header)
