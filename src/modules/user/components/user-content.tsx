import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { userState } from '../../../store';

import { LogOut } from './log-out';
import { Registration } from './registration';
import { SignIn } from './sign-in';

import style from '../user.module.scss';

export const UserContent: React.FC<{ active: boolean; setActive: Function }> =
  observer(({ active, setActive }) => {
    return (
      <div
        className={
          active ? style.modalPage + ' ' + style.active : style.modalPage
        }
        onClick={() => setActive(false)}
      >
        <div
          className={style.modalContent}
          onClick={(el) => el.stopPropagation()}
        >
          <div
            onClick={() => {
              userState.getWarningMessage('');
            }}
          >
            <Link to="/">Main</Link>
          </div>
          <div>Authorization</div>
          {userState.userPageView === 'signIn' && !userState.isAuthorized ? (
            <SignIn />
          ) : userState.userPageView === 'registration' &&
            !userState.isAuthorized ? (
            <Registration />
          ) : (
            <LogOut />
          )}
          <div id="message">{userState.message}</div>
        </div>
      </div>
    );
  });
