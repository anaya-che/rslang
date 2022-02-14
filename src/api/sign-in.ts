import axios from 'axios';
import { baseUrl, HttpStatus } from '.';
import { IToken } from '../utils/interfaces';

export const signIn = async (
  userEmail: string,
  userPassword: string
): Promise<void | IToken> => {
  return axios
    .post(`${baseUrl}signin`, {
      email: userEmail,
      password: userPassword,
    })
    .then((res): Promise<IToken> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.INCORRECT)
        console.log('Incorrect e-mail or password.');
      else {
        throw new Error(error);
      }
    });
};
