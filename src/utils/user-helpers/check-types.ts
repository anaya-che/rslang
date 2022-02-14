import { IToken } from '../interfaces/token';
import { IUser } from '../interfaces/user';

export const isIUser = (data: any): data is IUser => {
  return true;
};

export const isIToken = (data: any): data is IToken => {
  return true;
};
