/* eslint-disable react/display-name */
/* eslint react/prop-types: 0 */

import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { Loader } from "../Loader/Loader"
import styles from "./withQuery.module.css"

export const withQuery =
  (WrappedComponent) =>
  ({ isLoading, isError, error, isFetching, ...rest }) => {
    const navigate = useNavigate()
    const navigateToSignIn = () => {
      navigate("/signIn")
    }

    if (isError) {
      return (
        <div className={styles.error}>
          <p className={styles.errorMessage}>{error.message}</p>
          <button className={styles.errorBtn} onClick={navigateToSignIn}>
            Авторизация
          </button>
        </div>
      )
    }

    if (isLoading) return <Loader />

    return (
      <>
        {isFetching && <Loader />}
        <WrappedComponent {...rest} />
      </>
    )
  }

withQuery.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}
