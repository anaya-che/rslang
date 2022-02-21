import axios from 'axios';
import { IUser } from '../utils/interfaces/user';
import { baseUrl, HttpStatus } from '.';
import {
  clearLocalStorage,
  getTokenFromStorage,
} from '../utils/user-helpers/local-storage';
import { userState } from '../store';

export const createUser = async (
  userName: string,
  userEmail: string,
  userPassword: string
): Promise<void | IUser> => {
  return axios
    .post(
      `${baseUrl}users`,
      {
        name: userName,
        email: userEmail,
        password: userPassword,
      },
      { headers: { Authorization: `Bearer ${getTokenFromStorage()}` } }
    )
    .then((res): Promise<IUser> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.NOT_VALID) {
        const errorMessages = error.response.data.error.errors;
        errorMessages.forEach((el: any) => {
          if (el.path.includes('email'))
            userState.getWarningMessage(
              'Пожалуйста, введите корректный адрес электронной почты.'
            );
          if (el.path.includes('password'))
            userState.getWarningMessage(
              'Пожалуйста, введите корректный пароль. Длинна должна быть не менее 8 символов.'
            );
        });
      }
      if (error.response.status === HttpStatus.USER_EXISTS) {
        userState.getWarningMessage(
          'Пользователь с такой почтой уже существует.'
        );
      } else {
        throw new Error(error);
      }
    });
};

export const getUser = async (userId: string): Promise<void | IUser> => {
  return axios
    .get(`${baseUrl}users/${userId}`, {
      headers: { Authorization: `Bearer ${getTokenFromStorage()}` },
    })
    .then((res): Promise<IUser> => res.data)
    .catch(async (error) => {
      if (error.response.status === HttpStatus.NEED_TOKEN) {
        clearLocalStorage();
      }
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        clearLocalStorage();
      }
      if (error.response.status === HttpStatus.NOT_FOUND) userState.getWarningMessage('Пользователь не найден.');
      else {
        throw new Error(error);
      }
    });
};

export const updateUser = async (
  userId: string,
  userEmail: string,
  userPassword: string
): Promise<void | IUser> => {
  return axios
    .put(
      `${baseUrl}users/${userId}`,
      {
        email: userEmail,
        password: userPassword,
      },
      { headers: { Authorization: `Bearer ${getTokenFromStorage()}` } }
    )
    .then((res): Promise<IUser> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.UNAUTHORIZED) {}
      if (error.response.status === HttpStatus.BAD_REQUEST) {}
      else {
        throw new Error(error);
      }
    });
};
