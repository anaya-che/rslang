import { observable, action } from 'mobx';
import { getWords } from '.';
import { createUser, getUser, signIn } from '../api';
import { IToken, IUser } from '../utils/interfaces';
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from '../utils/user-helpers/local-storage';
import { statisticsState } from './statistics-state';

export const userState = observable({
  userPageView: 'signIn',
  isAuthorized: false,
  userInfo: {} as IUser,
  tokenInfo: {} as IToken,
  message: '',
  isModalActive: false,

  setActive: action((isActive: boolean) => {
    userState.isModalActive = isActive;
  }),

  checkAuth: action(async () => {
    await getWords(0, 0);
    if (!userState.isAuthorized) {
      const userInfoObj = getLocalStorage();
      if (userInfoObj !== undefined) {
        userState.getTokenFromStorage(userInfoObj);
        await userState.getUserInfoFromId();
        userState.changeAuthState(true);
        userState.getWarningMessage('');

        await statisticsState.getCurrentStatistics();
      }
    }
  }),

  getUserInfoFromId: action(async () => {
    const res = await getUser(userState.tokenInfo.userId);
    if (res !== undefined) {
      userState.userInfo = res;
    }
  }),

  getInputValues: action((): void => {
    const nameInput: HTMLInputElement | null =
      document.querySelector('#userName');
    const emailInput: HTMLInputElement | null =
      document.querySelector('#userEmail');
    const passwordInput: HTMLInputElement | null =
      document.querySelector('#userPassword');
    if (nameInput) userState.userInfo.name = nameInput.value;
    if (emailInput) userState.userInfo.email = emailInput.value;
    if (passwordInput) userState.userInfo.password = passwordInput.value;
  }),

  registration: action(async (): Promise<void> => {
    userState.getInputValues();
    if (
      userState.userInfo.name &&
      userState.userInfo.email &&
      userState.userInfo.password
    ) {
      const res = await createUser(
        userState.userInfo.name,
        userState.userInfo.email,
        userState.userInfo.password
      );
      if (res !== undefined) {
        userState.userInfo = res;
        await userState.signIn();
      }
    } else {
      userState.getWarningMessage('????????????????????, ?????????????? ?????? ????????????.');
    }
  }),

  signIn: action(async (): Promise<void> => {
    userState.getInputValues();
    const res = await signIn(
      userState.userInfo.email,
      userState.userInfo.password
    );
    if (res !== undefined) {
      userState.tokenInfo = res;
      userState.changeAuthState(true);
      userState.getWarningMessage('');
      setLocalStorage();

      await statisticsState.getCurrentStatistics();
    }
  }),

  changeAuthState: action((state: boolean) => {
    userState.isAuthorized = state;
  }),

  getTokenFromStorage: action((userInfoObj: string): void => {
    userState.tokenInfo = JSON.parse(userInfoObj);
  }),

  toPage: action((page: string): void => {
    userState.userPageView = page;
  }),

  logOut: action((): void => {
    userState.userPageView = 'signIn';
    userState.isAuthorized = false;
    clearLocalStorage();
  }),

  getWarningMessage: action((message: string) => {
    userState.message = message;
  }),
});
