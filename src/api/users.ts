import axios from 'axios';
import { AuthToken, baseUrl } from './consts';

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IToken {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

enum HttpStatus {
  DELETED = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INCORRECT = 403,
  NOT_FOUND = 404,
  USER_EXISTS = 417,
  NOT_VALID = 422,
}

axios.defaults.headers.common['Authorization'] = AuthToken;

export const createUser = async (
  userName: string,
  userEmail: string,
  userPassword: string
): Promise<void | IUser> => {
  return axios
    .post(`${baseUrl}users`, {
      name: userName,
      email: userEmail,
      password: userPassword,
    })
    .then((res): Promise<IUser> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.NOT_VALID) {
        const errorMessages = error.response.data.error.errors;
        errorMessages.forEach((el: any) => {
          if (el.path.includes('email'))
            console.log('Please, enter a valid email.');
          if (el.path.includes('password'))
            console.log(
              'Please, enter a valid password. Length must be at least 8 characters.'
            );
        });
      }
      if (error.response.status === HttpStatus.USER_EXISTS)
        console.log('User with this e-mail already exists.');
      else {
        throw new Error(error);
      }
    });
};

export const getUser = async (userId: string): Promise<void | IUser> => {
  return axios
    .get(`${baseUrl}users/${userId}`)
    .then((res): Promise<IUser> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.UNAUTHORIZED) console.log('User is unauthorized.');
      if (error.response.status === HttpStatus.NOT_FOUND) console.log('User not found');
      else {
        throw new Error(error);
      }
    });
};

export const updateUser = async (
  userId: string,
  userEmail: string,
  userPassword: string
): Promise<void | IUser> => {
  return axios
    .put(`${baseUrl}users/${userId}`, {
      email: userEmail,
      password: userPassword,
    })
    .then((res): Promise<IUser> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.UNAUTHORIZED) console.log('User is unauthorized.');
      if (error.response.status === HttpStatus.BAD_REQUEST) console.log('Bad request.');
      else {
        throw new Error(error);
      }
    });
};

export const deleteUser = async (userId: string): Promise<void> => {
  return axios
    .delete(`${baseUrl}users/${userId}`)
    .then((res) => {
      if (res.status === 204) console.log('The user has been deleted.');
    })
    .catch((error) => {
      if (error.response.status === HttpStatus.UNAUTHORIZED) console.log('User is unauthorized.');
      else {
        console.log(error);

        throw new Error(error);
      }
    });
};

export const getNewToken = async (userId: string): Promise<void | IToken> => {
  return axios
    .get(`${baseUrl}users/${userId}/tokens`)
    .then((res): Promise<IToken> => res.data)
    .catch((error) => {
      if (error.response.status === HttpStatus.UNAUTHORIZED) console.log('User is unauthorized.');
      if (error.response.status === HttpStatus.INCORRECT)
        console.log('Access token is missing, expired or invalid.');
      else {
        throw new Error(error);
      }
    });
};

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
