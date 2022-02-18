import { toJS } from 'mobx';
import { userState } from '../../store';

export const setLocalStorage = (): void => {
  const userInfoObj = JSON.stringify(toJS(userState.tokenInfo));
  localStorage.setItem('userInfo', userInfoObj);
};

export const getLocalStorage = (): string | void => {
  if (localStorage.getItem('userInfo')) {
    const userInfoObj: string | null = localStorage.getItem('userInfo');
    if (userInfoObj) return userInfoObj;
  }
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

export const getTokenFromStorage = () => {
  const res: string | void = getLocalStorage();
  if (res) return JSON.parse(res).token;
};

export const getRefreshToken = () => {
  const res: string | void = getLocalStorage();
  if (res) return JSON.parse(res).refreshToken;
};
