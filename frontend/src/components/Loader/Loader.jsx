import style from './loader.module.css'

function Loader() {
  return (
    <div className={style.loader}>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
    </div>
  )
}

export default Loader
