import { useEffect, useState } from "react"
import styles from "./search.module.css"
import { useDispatch } from "react-redux"
import { changeSearchFilter } from "../../redux/slices/filterSlice"
import { useDebounce } from "../hooks/useDebounce"
import { useSearchParams } from "react-router-dom"

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => {
    const searchValueFromQuery = searchParams.get("q")

    return searchValueFromQuery ?? ""
  })
  const dispatch = useDispatch()
  const debouncedSearchValue = useDebounce(search)

  const changeSearchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: newSearchValue,
    })
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
            className={styles.input}
            id="search"
            placeholder="Поиск по товарам"
            value={search}
            onChange={changeSearchHandler}
          />
        </div>
      </div>
    </>
  )
}
