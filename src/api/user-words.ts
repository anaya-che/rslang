import axios from 'axios';
import { baseUrl, HttpStatus } from '.';
import { userState } from '../store';
import { IOptions, IUserWord } from '../utils/interfaces/user-words';
import { getTokenFromStorage } from '../utils/user-helpers/local-storage';

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
        await userState.refreshTokenInfo();
        await getAllUserWords(userId);
      }
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        await userState.refreshTokenInfo();
        await getAllUserWords(userId);
      } else {
        throw new Error(error);
      }
    });
};

export const createUserWord = async (
  userId: string,
  wordId: string | undefined,
  wordDifficulty: string,
  wordOptions: IOptions
): Promise<IUserWord | void> => {
  console.log('user smrh')
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
        await userState.refreshTokenInfo();
        await createUserWord(userId, wordId, wordDifficulty, wordOptions);
      }
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        await userState.refreshTokenInfo();
        await createUserWord(userId, wordId, wordDifficulty, wordOptions);
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
  wordId: string | undefined
): Promise<IUserWord | void> => {
  return axios
    .get(`${baseUrl}users/${userId}/words/${wordId}`, {
      headers: { Authorization: `Bearer ${getTokenFromStorage()}` },
    })
    .then((res): Promise<IUserWord> => res.data)
    .catch(async (error) => {
      if (error.response.status === HttpStatus.NEED_TOKEN) {
        await userState.refreshTokenInfo();
        await getUserWordById(userId, wordId);
      }
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        await userState.refreshTokenInfo();
        await getUserWordById(userId, wordId);
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
  wordId: string | undefined,
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
        await userState.refreshTokenInfo();
        await updateUserWordById(userId, wordId, wordDifficulty, wordOptions);
      }
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        await userState.refreshTokenInfo();
        await updateUserWordById(userId, wordId, wordDifficulty, wordOptions);
      }
      if (error.response.status === HttpStatus.BAD_REQUEST)
        console.log('Bad request.');
      else {
        throw new Error(error);
      }
    });
};
