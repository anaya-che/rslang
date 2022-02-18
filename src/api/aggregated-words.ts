import axios from 'axios';
import { baseUrl } from '.';
import { token } from '../store/user-state';
import { convertAggregatedWordsToIWordData } from '../utils/api-helpers/type-converters';
import { IWordData } from '../utils/interfaces';

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const getUserAggregatedWords = async (
  userId: string,
  wordsPerPage: string,
  filter: string
): Promise<IWordData[]> => {
  return axios
    .get(
      `${baseUrl}users/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${filter}`
    )
    .then((res): IWordData[] =>
      res.data[0].paginatedResults.map(convertAggregatedWordsToIWordData)
    )
    .catch((error) => {
      throw new Error(error);
    });
};
