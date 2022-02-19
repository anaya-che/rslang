import axios from 'axios';
import { IWordData } from '../utils/interfaces';
import { baseUrl } from '.';
import { convertNoUserWordsToIWordData } from '../utils/api-helpers/type-converters';

export const getWordsFromGroup = async (
  group: number,
  page: number
): Promise<IWordData[]> => {
  return axios
    .get(`${baseUrl}words?group=${group}&page=${page}`)
    .then((res): IWordData[] => res.data.map(convertNoUserWordsToIWordData))
    .catch((error) => {
      throw new Error(error);
    });
};

export const getWordById = async (id: string): Promise<IWordData> => {
  return axios
    .get(`${baseUrl}words/${id}`)
    .then((res): IWordData => convertNoUserWordsToIWordData(res.data))
    .catch((error) => {
      throw new Error(error);
    });
};