import styles from "./sort.module.css"

export const Sort = () => {
  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sort">Сортировка товаров:</label>
      <select className={styles.sort} id="sort">
        <option hidden>Выберите вариант</option>
        <option value="">По цене</option>
        <option value="">По названию</option>
        <option value="">По размеру скидки</option>
        <option value="">По дате добавления</option>
      </select>
    </div>
  )
}
