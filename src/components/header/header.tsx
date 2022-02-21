import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import style from './header.module.scss';
import { sprintState, userState } from '../../store';
import { longTermState } from '../../store/long-term-state';

export const Header = observer(() => {
  return (
    <div className={style.header} onClick={() => {
      sprintState.setDefault()
      longTermState.setDefault()
    }
      }>
      <div>
        <div className={style.home}>
          <Link to="/">
            <img src="../../../../icons/home.svg" alt="Home page" />
          </Link>
        </div>
        <div>
          <Link to="/textbook/1/1">Учебник</Link>
        </div>
        <div>
          <Link to="/games/sprint">Спринт</Link>
        </div>
        <div>
          <Link to="/games/audiocall">Аудиовызов</Link>
        </div>
        { userState.isAuthorized ? 
          (<div>
            <Link to="/statistics">Статистика</Link>
          </div>) 
          : 
          (<div></div>)
        }
      </div>
    </div>
  );
});