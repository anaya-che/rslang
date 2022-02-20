import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import style from '../main.module.scss';
import { userState } from '../../../store';
import { LogOut } from '../../user/components/log-out';

export const Header = observer(() => {
  return (
    <div className={style.header}>
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
        {userState.isAuthorized ? (
          <div>
            <Link to="/statistics">Статистика</Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {userState.isAuthorized ? (
          <div>
            <img src="../../../../icons/user.svg" alt="User" />
            <LogOut />
          </div>
        ) : (
          <Link to="/user">Войти</Link>
        )}
      </div>
    </div>
  );
});
