import { observable, action } from 'mobx';

export const appState = observable({
  appPage: 'main',

  setPage: action(async () => {
    const pathname = window.location.pathname;
    let page = pathname.split('/').reverse()[0];
    if (pathname.includes('textbook')) page = 'textbook';
    if (page === '') page = 'main';
    appState.appPage = page;
  }),
});
