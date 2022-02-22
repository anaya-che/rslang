import { observer } from 'mobx-react-lite';
import { userState } from '../../../store';
import { Registration } from './registration';
import { SignIn } from './sign-in';
import style from '../user.module.scss';

export const UserContent = observer(() => {
  return (
    <div
      className={
        userState.isModalActive
          ? style.modalPage + ' ' + style.active
          : style.modalPage
      }
      onClick={() => {
        userState.setActive(false);
        userState.getWarningMessage('');
      }}
    >
      <div
        className={style.modalContent}
        onClick={(el) => el.stopPropagation()}
      >
        {userState.userPageView === 'signIn' && !userState.isAuthorized ? (
          <SignIn />
        ) : userState.userPageView === 'registration' &&
          !userState.isAuthorized ? (
          <Registration />
        ) : (
          userState.setActive(false)
        )}
        <div className={style.message} id="message">
          {userState.message}
        </div>
      </div>
    </div>
  );
});
