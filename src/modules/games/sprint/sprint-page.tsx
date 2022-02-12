import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { sprintState } from '../../../store/sprint-state';
import { Categories } from "./components/categories";
import { Game } from './components/game';
import style from './components/sprint.module.scss'; 

export const SprintPage= observer(()=> {

  return (
    <>
      <div>Sprint Page</div>
      <header>
        <button onClick={() => sprintState.setDefault()}>
          <Link to="/">Main</Link>
        </button>  
      </header>
      <div className={style.sprintPage}>
        { sprintState.isGame && sprintState.currentWord ? (
          <Game />
          ) : (
          <Categories />
          ) 
        }
      </div>     
    </>
  
  )
})
