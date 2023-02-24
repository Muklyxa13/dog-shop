import { useEffect } from "react"
import { createPortal } from "react-dom"
import styles from "./Modal.module.css"
import PropTypes from "prop-types"

const ModalInner = ({ closeHandler, children }) => {
  useEffect(() => {
    const closeModalByEscape = (e) => {
      if (e.key === "Escape") {
        closeHandler()
      }
    }
    document.addEventListener("keyup", closeModalByEscape)
    return () => {
      document.removeEventListener("keyup", closeModalByEscape)
    }
  }, [])

  return <div className={styles.modalInner}>{children}</div>
}

export const Modal = ({ isOpen, closeHandler, children }) => {
  if (!isOpen) return null

  const closeModalByClickWrapper = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div className={styles.modarWr} onClick={closeModalByClickWrapper}>
      <ModalInner closeHandler={closeHandler}>{children}</ModalInner>
    </div>,
    document.getElementById("modal-root")
  )
}

Modal.propTypes = {
  closeHandler: PropTypes.any,
  children: PropTypes.any,
  isOpen: PropTypes.any,
}

ModalInner.propTypes = {
  closeHandler: PropTypes.any,
  children: PropTypes.any,
}
