import { observable, action } from 'mobx';
import { userWordsStore } from '.';
import { createUser, getUser, signIn } from '../api';
import { IToken, IUser } from '../utils/interfaces';
import { isIToken, isIUser } from '../utils/user-helpers/check-types';
import {
  clearLocalStorage,
  getLocalStorage,
  getTokenFromStorage,
  setLocalStorage,
} from '../utils/user-helpers/local-storage';

export let token = getTokenFromStorage();

export const userState = observable({
  userPageView: 'signIn',
  isAuthorized: false,
  userInfo: {} as IUser,
  tokenInfo: {} as IToken,

  checkAuth: action(async () => {
    if (!userState.isAuthorized) {
      const userInfoObj = getLocalStorage();
      if (userInfoObj) {
        token = await getTokenFromStorage();
        userState.getTokenFromStorage(userInfoObj);
        await userState.getUserInfoFromId();
        userState.changeAuthState(true);
        userWordsStore.getUserWords();
      }
    }
  }),

  getUserInfoFromId: action(async () => {
    const res = await getUser(userState.tokenInfo.userId);
    if (isIUser(res)) {
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
      if (isIUser(res)) {
        userState.userInfo = res;
        userState.signIn();
      }
    }
  }),

  signIn: action(async (): Promise<void> => {
    userState.getInputValues();
    const res = await signIn(
      userState.userInfo.email,
      userState.userInfo.password
    );
    if (isIToken(res)) {
      userState.tokenInfo = res;
      userState.changeAuthState(true);
      setLocalStorage();
      token = await getTokenFromStorage();
      await userWordsStore.getUserWords();
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
});
