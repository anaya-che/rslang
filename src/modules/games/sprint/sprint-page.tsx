import { observer } from 'mobx-react-lite';
import { sprintState } from '../../../store/sprint-state';
import { Categories } from "./components/categories";
import { Game } from './components/game';
import style from './components/sprint.module.scss'; 

export const SprintPage= observer(()=> {

  return (
    <>
      <div>Sprint Page</div>
      <div className={style.sprintPage}>
        { sprintState.isGame ? (
          <Game />
          ) : (
          <Categories />
          ) 
        }
      </div>     
    </>
  
  )
})
