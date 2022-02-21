import React from 'react';
import { userState } from '../../../store';
import style from '../user.module.scss';

export const Registration: React.FC = () => {
  return (
    <>
      <div className={style.signInContainer}>
        <h2>Регистрация</h2>

        <div className={style.inputContainer}>
          <label htmlFor="userName">Имя: </label>
          <input
            className={style.inputElement}
            type="text"
            name="name"
            id="userName"
          />
        </div>
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

      <button
        className={style.btnRegistration}
        onClick={() => userState.registration()}
      >
        Регистрация
      </button>
      <div
        className={style.changeWiew}
        onClick={() => {
          userState.toPage('signIn');
          userState.getWarningMessage('');
        }}
      >
        Вернуться на страницу авторизации?
      </div>
    </>
  );
};
