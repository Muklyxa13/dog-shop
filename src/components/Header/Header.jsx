import { memo } from "react"
import { Link, NavLink } from "react-router-dom"
import headerStyles from "./header.module.css"
import classNames from "classnames"
import logoImg from "../../images/logo.jpg"

export const Header = () => {
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
          <div className={headerStyles.headerUl}>
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
