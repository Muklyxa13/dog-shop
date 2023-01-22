import { memo, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import headerStyles from "./header.module.css"
import classNames from "classnames"
import logoImg from "../../images/logo.jpg"
import { DogShopContext } from "../../Contexts/DogShopContextProvider"

export const Header = () => {
  // const deleteToken = () => {
  //   localStorage.removeItem("DOGSHOP_LS_KEY")
  //   localStorage.removeItem("TOKEN_LS")
  // }

  const { removeToken, Token } = useContext(DogShopContext)

  return (
    <header className={headerStyles.wr}>
      <nav>
        <ul className={headerStyles.headerLink}>
          <li>
            <Link to="/">
              <img
                className={headerStyles.logoImg}
                src={logoImg}
                alt="логотип"
              ></img>
            </Link>
          </li>
          <div className={headerStyles.productsLink}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  classNames({ [headerStyles.activeLink]: isActive })
                }
                to="/products"
              >
                Каталог
              </NavLink>
            </li>
          </div>
          <div className={headerStyles.headerUl}>
            <button
              className={Token ? headerStyles.exit : headerStyles.exitBtn}
              type="button"
              onClick={removeToken}
            >
              Выйти
            </button>
            <li>
              <NavLink
                className={({ isActive }) =>
                  classNames({ [headerStyles.activeLink]: isActive })
                }
                to="/signin"
              >
                Войти
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  classNames({ [headerStyles.activeLink]: isActive })
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
