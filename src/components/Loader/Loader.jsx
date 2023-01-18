import LoaderStyles from "./loader.module.css"

export const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className={LoaderStyles["lds-spinner"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
