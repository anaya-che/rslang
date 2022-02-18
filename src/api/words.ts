import axios from 'axios';
import { IWordData } from '../utils/interfaces';
import { baseUrl } from '.';

export const getWordsFromGroup = async (
  group: number,
  page: number
): Promise<IWordData[]> => {
  return axios
    .get(`${baseUrl}words?group=${group}&page=${page}`)
    .then((res): Promise<IWordData[]> => res.data)
    .catch((error) => {
      throw new Error(error);
    });
};

export const getWordById = async (id: string): Promise<IWordData> => {
  return axios
    .get(`${baseUrl}words/${id}`)
    .then((res): Promise<IWordData> => res.data)
    .catch((error) => {
      throw new Error(error);
    });
};


export const deleteWord = async (id: string, wordId: string): Promise<void> => {
  return axios
    .delete(`${baseUrl}users/${id}/words/${wordId}`)
    .then((res) => {
      if (res.status === 204) console.log('The word has been deleted.');
    })
    .catch((error) => {
        throw new Error(error);
      })
    };
