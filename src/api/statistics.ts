import axios from 'axios';
import { baseUrl, HttpStatus } from '.';
import { token } from '../store/user-state';
import { IStatistic, IStatisticOptional } from '../utils/interfaces';

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const getStatistics = async (
  userId: string
): Promise<IStatistic | void> => {
  return axios
    .get(`${baseUrl}users/${userId}/statistics`)
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
    .put(`${baseUrl}users/${userId}/statistics`, {
      learnedWords: learned,
      optional: optionalInfo,
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
