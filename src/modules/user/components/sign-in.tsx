import React from 'react';
import { userState } from '../../../store';
import style from '../user.module.scss';

export const SignIn: React.FC = () => {
  return (
    <>
      <div className={style.signInContainer}>
        <h2>Авторизация</h2>
        <div className={style.inputContainer}>
          <label htmlFor="userEmail">Почта: </label>
          <input
            className={style.inputElement}
            type="email"
            name="email"
            id="userEmail"
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="userPassword">Пароль: </label>
          <input
            className={style.inputElement}
            type="password"
            name="password"
            id="userPassword"
          />
        </div>
      </div>

      <button className={style.btnSignIn} onClick={() => userState.signIn()}>
        Войти
      </button>
      <div
        className={style.changeWiew}
        onClick={() => {
          userState.toPage('registration');
          userState.getWarningMessage('');
        }}
      >
        Хотите зарегистрироваться?
      </div>
    </>
  );
};
