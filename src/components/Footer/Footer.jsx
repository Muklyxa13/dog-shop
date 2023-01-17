import { memo } from "react"
import { Link } from "react-router-dom"
import footerStyles from "./footer.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faVk,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"

export const Footer = () => {
  return (
    <footer className={footerStyles.wr}>
      <div className={footerStyles.footer_container}>
        <div className={footerStyles.footer_group}>
          <h5>Категории:</h5>
          <div className={footerStyles.footer_links}>
            <Link to={"/"}>HAPPY DOG</Link>
            <Link to={"/"}>PLATINUM</Link>
            <Link to={"/"}>HUNTER</Link>
            <Link to={"/"}>KONG</Link>
            <Link to={"/"}>DOG&apos;S FAVORITE</Link>
            <Link to={"/"}>VETDIETOLOG</Link>
          </div>
        </div>
        <div className={footerStyles.footer_group}>
          <h5>Информация</h5>
          <div className={footerStyles.footer_links}>
            <Link to={"/"}>О магазине</Link>
            <Link to={"/"}>Оплата</Link>
            <Link to={"/"}>Доставка</Link>
            <Link to={"/"}>Контакты</Link>
          </div>
        </div>
        <div className={footerStyles.footer_group}>
          <h5>Мы в соц сетях</h5>
          <div className={footerStyles.footer_links}>
            <a href="https://vk.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faVk} /> ВКонтакте
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faInstagram} /> Instagram
            </a>
          </div>
        </div>
        <div className={footerStyles.footer_group}>
          <h5>Личный кабинет</h5>
          <div className={footerStyles.footer_links}>
            <Link to={"/signin"}>Вход</Link>
            <Link to={"/signup"}>Регистрация</Link>
            <Link to={"/"}>Забыли пароль?</Link>
          </div>
        </div>
      </div>
      <div className={footerStyles.footer_copyright}>
        Dog shop &quot;Doberman&quot; © 2023
      </div>
    </footer>
  )
}

export const FooterMemo = memo(Footer)
