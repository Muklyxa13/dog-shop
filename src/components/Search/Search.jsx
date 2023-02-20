import { useEffect, useState } from "react"
import styles from "./search.module.css"
import { useDispatch } from "react-redux"
import { changeSearchFilter } from "../../redux/slices/filterSlice"
import { useDebounce } from "../hooks/useDebounce"
import { Sort } from "../Sort/Sort"

export const Search = () => {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const debouncedSearchValue = useDebounce(search)
  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
  }
  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [debouncedSearchValue, dispatch])

  return (
    <>
      <div className={styles.wr}>
        <div className={styles.search}>
          <label htmlFor="search">Поиск товаров:</label>
          <input
            id="search"
            // className={styles.search}
            placeholder="Поиск по товарам"
            value={search}
            onChange={changeSearchHandler}
          />
        </div>
      </div>
    </>
  )
}
