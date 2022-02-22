import axios from 'axios';
import { baseUrl, HttpStatus } from '.';
import { IOptions, IUserWord } from '../utils/interfaces/user-words';
import { clearLocalStorage, getTokenFromStorage } from '../utils/user-helpers/local-storage';

export const getAllUserWords = async (
  userId: string
): Promise<IUserWord[] | void> => {
  return axios
    .get(`${baseUrl}users/${userId}/words`, {
      headers: { Authorization: `Bearer ${getTokenFromStorage()}` },
    })
    .then((res): Promise<IUserWord[]> => res.data)
    .catch(async (error) => {
      if (error.response.status === HttpStatus.NEED_TOKEN) {
        clearLocalStorage()
        console.log('кинуть на страницу логина');
      }
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        clearLocalStorage()
        console.log('кинуть на страницу логина');
      } else {
        throw new Error(error);
      }
    });
};

export const createUserWord = async (
  userId: string,
  wordId: string,
  wordDifficulty: string,
  wordOptions: IOptions
): Promise<IUserWord | void> => {
  return axios
    .post(
      `${baseUrl}users/${userId}/words/${wordId}`,
      {
        difficulty: wordDifficulty,
        optional: wordOptions,
      },
      { headers: { Authorization: `Bearer ${getTokenFromStorage()}` } }
    )
    .then((res): Promise<IUserWord> => res.data)
    .catch(async (error) => {
      if (error.response.status === HttpStatus.NEED_TOKEN) {
        clearLocalStorage()
        console.log('кинуть на страницу логина');
      }
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        clearLocalStorage()
        console.log('кинуть на страницу логина');
      }
      if (error.response.status === HttpStatus.BAD_REQUEST)
        console.log('Bad request.');
      else {
        throw new Error(error);
      }
    });
};

export const getUserWordById = async (
  userId: string,
  wordId: string
): Promise<IUserWord | void> => {
  return axios
    .get(`${baseUrl}users/${userId}/words/${wordId}`, {
      headers: { Authorization: `Bearer ${getTokenFromStorage()}` },
    })
    .then((res): Promise<IUserWord> => res.data)
    .catch(async (error) => {
      if (error.response.status === HttpStatus.NEED_TOKEN) {
        clearLocalStorage()
        console.log('кинуть на страницу логина');
      }
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        clearLocalStorage()
        console.log('кинуть на страницу логина');
      }
      if (error.response.status === HttpStatus.NOT_FOUND)
        console.log("User's word not found.");
      else {
        throw new Error(error);
      }
    });
};

export const updateUserWordById = async (
  userId: string,
  wordId: string,
  wordDifficulty: string,
  wordOptions: IOptions
): Promise<IUserWord | void> => {
  return axios
    .put(
      `${baseUrl}users/${userId}/words/${wordId}`,
      {
        difficulty: wordDifficulty,
        optional: wordOptions,
      },
      { headers: { Authorization: `Bearer ${getTokenFromStorage()}` } }
    )
    .then((res): Promise<IUserWord> => res.data)
    .catch(async (error) => {
      if (error.response.status === HttpStatus.NEED_TOKEN) {
        clearLocalStorage()
        console.log('кинуть на страницу логина');
      }
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        clearLocalStorage()
        console.log('кинуть на страницу логина');
      }
      if (error.response.status === HttpStatus.BAD_REQUEST)
        console.log('Bad request.');
      else {
        throw new Error(error);
      }
    });
};
