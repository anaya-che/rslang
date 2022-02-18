import axios from 'axios';
import { baseUrl, HttpStatus } from '.';
import { IStatistic, IStatisticOptional } from '../utils/interfaces/statistics';
import { getTokenFromStorage } from '../utils/user-helpers/local-storage';

export const getStatistics = async (
  userId: string
): Promise<IStatistic | void> => {
  return axios
    .get(`${baseUrl}users/${userId}/statistics`, {
      headers: { Authorization: `Bearer ${getTokenFromStorage()}` },
    })
    .then((res): Promise<IStatistic> => res.data)
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

export const updateStatistics = async (
  userId: string,
  learned: number,
  optionalInfo: IStatisticOptional
): Promise<IStatistic | void> => {
  return axios
    .put(
      `${baseUrl}users/${userId}/statistics`,
      {
        learnedWords: learned,
        optional: optionalInfo,
      },
      { headers: { Authorization: `Bearer ${getTokenFromStorage()}` } }
    )
    .then((res): Promise<IStatistic> => res.data)
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
