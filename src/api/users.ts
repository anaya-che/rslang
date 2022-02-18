import axios from 'axios';
import { IToken } from '../utils/interfaces/token';
import { IUser } from '../utils/interfaces/user';
import { baseUrl, HttpStatus } from '.';
import {
  getRefreshToken,
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
            userState.getWarningMessage('Please, enter a valid email.');
          if (el.path.includes('password'))
            userState.getWarningMessage(
              'Please, enter a valid password. Length must be at least 8 characters.'
            );
        });
      }
      if (error.response.status === HttpStatus.USER_EXISTS)
        userState.getWarningMessage('User with this e-mail already exists.');
      else {
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
        await userState.refreshTokenInfo();
        await getUser(userId);
      }
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        await userState.refreshTokenInfo();
        await getUser(userId);
      }
      if (error.response.status === HttpStatus.NOT_FOUND)
        userState.getWarningMessage('User not found');
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
      if (error.response.status === HttpStatus.UNAUTHORIZED)
        console.log('User is unauthorized.');
      if (error.response.status === HttpStatus.BAD_REQUEST)
        console.log('Bad request.');
      else {
        throw new Error(error);
      }
    });
};

export const deleteUser = async (userId: string): Promise<void> => {
  return axios
    .delete(`${baseUrl}users/${userId}`, {
      headers: { Authorization: `Bearer ${getTokenFromStorage()}` },
    })
    .then((res) => {
      if (res.status === 204) console.log('The user has been deleted.');
    })
    .catch((error) => {
      if (error.response.status === HttpStatus.UNAUTHORIZED)
        console.log('User is unauthorized.');
      else {
        throw new Error(error);
      }
    });
};

export const getNewToken = async (userId: string): Promise<void | IToken> => {
  return axios
    .get(`${baseUrl}users/${userId}/tokens`, {
      headers: { Authorization: `Bearer ${getRefreshToken()}` },
    })
    .then((res): Promise<IToken> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.UNAUTHORIZED)
        console.log('User is unauthorized.');
      if (error.response.status === HttpStatus.INCORRECT)
        console.log('Access token is missing, expired or invalid.');
      else {
        throw new Error(error);
      }
    });
};
