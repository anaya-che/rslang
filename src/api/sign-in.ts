import axios from 'axios';
import { baseUrl, HttpStatus } from '.';
import { userState } from '../store';
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
      if (error.response.status === HttpStatus.INCORRECT) {
        userState.getWarningMessage('Некорректный адрес почты или пароль.');
      }

      if (error.response.status === HttpStatus.NOT_FOUND) {
        
        userState.getWarningMessage('Некорректный адрес почты или пароль.');
      } else {
        throw new Error(error);
      }
    });
};
