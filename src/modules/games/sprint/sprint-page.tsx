import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { appState } from '../../../store';
import { sprintState } from '../../../store/sprint-state';
import { Categories } from "./components/categories";
import { Game } from './components/game';
import style from './components/sprint.module.scss'; 

export const SprintPage: React.FC = observer(()=> {

  return (
    <>
      <div>Sprint Page</div>
      <header>
        <button onClick={sprintState.setDefault}>
          <Link to="/">Main</Link>
        </button>  
        <button onClick={() => {
          appState.setPage()
          sprintState.setDefault()
          }}>
          <Link to="/textbook/1/1">Textbook</Link>
        </button>
      </header>
      <div className={style.sprintPage}>
        { sprintState.isGame && (sprintState.currentWord !== null)
        ? 
        ( <Game /> ) 
        :
        ( <Categories /> ) 
        }
      </div>     
    </>
  
  )
})
