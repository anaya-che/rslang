import { toJS } from 'mobx';
import { userState } from '../../store/user-state';

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
