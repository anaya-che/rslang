import { observer } from 'mobx-react-lite';
import { Footer } from '../../../../components/footer/footer';
import { sprintState } from '../../../../store/sprint-state';
import style from './sprint.module.scss';

export const Categories: React.FC = observer(()=> {
  return (
    <>
    <div className={style.categories}>
      <h1>Спринт</h1>
      <div className={style.categoriesBtnGroup}>
        <button className={style.categoriesBtn} onClick={(): void => sprintState.startRound(0)}>1</button>
        <button className={style.categoriesBtn} onClick={(): void => sprintState.startRound(1)}>2</button>
        <button className={style.categoriesBtn} onClick={(): void => sprintState.startRound(2)}>3</button>
        <button className={style.categoriesBtn} onClick={(): void => sprintState.startRound(3)}>4</button>
        <button className={style.categoriesBtn} onClick={(): void => sprintState.startRound(4)}>5</button>
        <button className={style.categoriesBtn} onClick={(): void => sprintState.startRound(5)}>6</button>
      </div>
      
    </div>
    <Footer />
    </>
  )
})