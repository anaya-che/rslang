import React from 'react';
import { userState } from '../../../store/user-state';
import style from '../user.module.scss';

export const SignIn: React.FC = () => {
  return (
    <>
      <div className={style.signInContainer}>
        <label htmlFor="userEmail">Почта: </label>
        <input type="email" name="email" id="userEmail" />
        <label htmlFor="userPassword">Пароль: </label>
        <input type="password" name="password" id="userPassword" />
      </div>
      <button onClick={() => userState.signIn()}>Войти</button>
      <button onClick={() => userState.toPage('registration')}>
        Хотите зарегистрироваться?
      </button>
    </>
  );
};
