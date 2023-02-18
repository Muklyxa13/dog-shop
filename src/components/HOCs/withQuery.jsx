/* eslint-disable react/display-name */
/* eslint react/prop-types: 0 */

import PropTypes from "prop-types"
import { Loader } from "../Loader/Loader"
import styles from "./withQuery.module.css"

export const withQuery =
  (WrappedComponent) =>
  ({ isLoading, isError, error, refetch, isFetching, ...rest }) => {
    if (isError) {
      return (
        <div className={styles.error}>
          <p>{error.message}</p>
          <button onClick={refetch} type="button">
            Повторить запрос
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
  refetch: PropTypes.func,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}
