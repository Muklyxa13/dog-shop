import { useState } from "react"
import styles from "./search.module.css"
import { useDispatch } from "react-redux"
import { changeSearchFilter } from "../../redux/slices/filterSlice"

export const Search = () => {
  const [search, setSearch] = useState("")

  const dispatch = useDispatch()

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
    dispatch(changeSearchFilter(newSearchValue))
  }

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.search}
        placeholder="Поиск по товарам"
        value={search}
        onChange={changeSearchHandler}
      />
    </div>
  )
}
