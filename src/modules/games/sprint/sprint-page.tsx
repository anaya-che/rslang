import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { sprintState } from '../../../store/sprint-state';
import { Header } from '../../../components/header/header';
import { Categories } from './components/categories/categories';
import { Game } from './components/game';
import style from './components/sprint.module.scss';

export const SprintPage: React.FC = observer(() => {
  return (
    <div className='wrapper'>
      <Header />
      <div className={style.sprintPage}>
        {sprintState.isGame && sprintState.currentWord !== null ? (
          <>
            <button className={style.exitBtn} onClick={sprintState.setDefault}>
              <Link to="/"></Link>
            </button>
            <Game />
          </>
        ) : (
          <Categories />
        )}
      </div>
    </div>
  );
});
