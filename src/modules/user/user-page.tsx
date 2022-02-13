import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { appState } from '../../store';
import { userState } from '../../store/user-state';
import { LogOut } from './components/log-out';
import { Registration } from './components/registration';
import { SignIn } from './components/sign-in';

export const UserPage: React.FC = observer(() => {
  return (
    <div>
      <div onClick={() => appState.setPage()}>
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
      <div id="message"></div>
    </div>
  );
});
