import { observer } from 'mobx-react-lite';
import { userState } from '../../store';
import { LogOut } from './components/log-out';
import { Registration } from './components/registration';
import { SignIn } from './components/sign-in';

export const UserPage: React.FC = observer(() => {
  return (
    <div>
      <div>
        <h2>Авторизация</h2>
        {userState.userPageView === 'signIn' && !userState.isAuthorized ? (
          <SignIn />
        ) : userState.userPageView === 'registration' &&
          !userState.isAuthorized ? (
          <Registration />
        ) : (
          <LogOut />
        )}
      </div>
    </div>
  );
});
