import axios from 'axios';
import { baseUrl } from '.';
import { IWordData } from '../utils/interfaces';
import { getTokenFromStorage } from '../utils/user-helpers/local-storage';

export const getUserAggregatedWords = async (
  userId: string,
  wordsPerPage: string,
  filter: string
): Promise<IWordData[]> => {
  return axios
    .get(
      `${baseUrl}users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${filter}`,
      { headers: { Authorization: `Bearer ${getTokenFromStorage()}` } }
    )
    .then((res): Promise<IWordData[]> => res.data[0].paginatedResults)
    .catch((error) => {
      throw new Error(error);
    });
};
