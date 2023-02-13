import styles from "./errorMessage.module.css"
import PropTypes from "prop-types"

export const ErrorMessage = (props) => {
  return (
    <div className={styles.errorMessage}>
      <ErrorMessage component="p" name={props.name} />
    </div>
  )
}

ErrorMessage.propTypes = {
  name: PropTypes.string,
}
