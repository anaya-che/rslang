import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LogOut } from '../../user/components/log-out';
import { userState } from '../../../store';
import style from '../main.module.scss';
import { UserContent } from '../../user/components/user-content';

export const Header: React.FC = observer(() => {
  return (
    <>
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
            <button onClick={() => userState.setActive(true)}>войти</button>
          )}
        </div>
      </div>
      <UserContent />
    </>
  );
});
