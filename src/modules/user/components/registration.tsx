import React from 'react';
import { userState } from '../../../store';
import style from '../user.module.scss';

export const Registration: React.FC = () => {
  return (
    <>
      <div className={style.signInContainer}>
        <label htmlFor="userName">Имя: </label>
        <input type="text" name="name" id="userName" />
        <label htmlFor="userEmail">Почта: </label>
        <input type="email" name="email" id="userEmail" />
        <label htmlFor="userPassword">Пароль: </label>
        <input type="password" name="password" id="userPassword" />
      </div>
      <button onClick={() => userState.registration()}>Регистрация</button>
      <button onClick={() => userState.toPage('signIn')}>
        Вернуться на страницу авторизации?
      </button>
    </>
  );
};
