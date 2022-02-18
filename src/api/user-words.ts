import axios from 'axios';
import { baseUrl, HttpStatus } from '.';
import { IOptions, IUserWord } from '../utils/interfaces';
import { token } from '../store/user-state';

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const getAllUserWords = async (
  userId: string
): Promise<IUserWord[] | void> => {
  return axios
    .get(`${baseUrl}users/${userId}/words`)
    .then((res): Promise<IUserWord[]> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.NEED_TOKEN)
        console.log('Access token is missing or invalid.');
      else {
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
    .post(`${baseUrl}users/${userId}/words/${wordId}`, {
      difficulty: wordDifficulty,
      optional: wordOptions,
    })
    .then((res): Promise<IUserWord> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.UNAUTHORIZED)
        console.log('Access token is missing or invalid.');
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
    .get(`${baseUrl}users/${userId}/words/${wordId}`)
    .then((res): Promise<IUserWord> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.UNAUTHORIZED)
        console.log('Access token is missing or invalid.');
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
    .put(`${baseUrl}users/${userId}/words/${wordId}`, {
      difficulty: wordDifficulty,
      optional: wordOptions,
    })
    .then((res): Promise<IUserWord> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.UNAUTHORIZED)
        console.log('Access token is missing or invalid.');
      if (error.response.status === HttpStatus.BAD_REQUEST)
        console.log('Bad request.');
      else {
        throw new Error(error);
      }
    });
};
