import { userState } from '../../store/user-state';
import style from './user.module.scss';

export function UserPage() {
  return (
    <>
      <div>User Page</div>
      <div className={style.signInContainer}>
        <label htmlFor="userName">Имя: </label>
        <input type="text" name="name" id="userName" />
        <label htmlFor="userEmail">Почта: </label>
        <input type="email" name="email" id="userEmail" />
        <label htmlFor="userPassword">Пароль: </label>
        <input type="password" name="password" id="userPassword" />
      </div>
      <div>
        <button onClick={() => userState.signIn()}>Войти</button>
        <button onClick={() => userState.registration()}>Регистрация</button>
      </div>
      <div id="message"></div>
    </>
  );
}
