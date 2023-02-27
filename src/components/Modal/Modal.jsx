import { useEffect } from "react"
import { createPortal } from "react-dom"
import styles from "./Modal.module.css"
import PropTypes from "prop-types"
import { AnimatePresence, motion } from "framer-motion"

const modalWrVariants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
  visable: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
    },
  },
}

const modalContentVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.5,
      delay: 0,
    },
  },
  visable: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0,
    },
  },
}

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
  }, [closeHandler])

  return (
    <motion.div className={styles.modalInner} variants={modalContentVariants}>
      {children}
    </motion.div>
  )
}

export const Modal = ({ isOpen = false, closeHandler, children }) => {
  const closeModalByClickWrapper = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  const renderContent = () => {
    if (!isOpen) return null

    return (
      <motion.div
        className={styles.modarWr}
        onClick={closeModalByClickWrapper}
        variants={modalWrVariants}
        initial="hidden"
        animate="visable"
        exit="hidden"
      >
        <ModalInner closeHandler={closeHandler}>{children}</ModalInner>
      </motion.div>
    )
  }

  return createPortal(
    <AnimatePresence>{renderContent()}</AnimatePresence>,
    document.getElementById("modal-root")
  )
}

Modal.propTypes = {
  closeHandler: PropTypes.element,
  children: PropTypes.element,
  isOpen: PropTypes.element,
}

ModalInner.propTypes = {
  closeHandler: PropTypes.element,
  children: PropTypes.element,
}
