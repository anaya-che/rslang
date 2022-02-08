import { getWords } from './words-store';
import { observable, action } from 'mobx';
import { textbookState } from '.';

export const appState = observable({
  appPage: 'main',

  setPage: action(async () => {
    const pathname = window.location.pathname;
    let page = pathname.split('/').reverse()[0];
    if (page === '') page = 'main';
    appState.appPage = page;

    checkPage();
  }),
});

const checkPage = async () => {
  if (appState.appPage === 'textbook') {
    await getWords(textbookState.wordGroup, textbookState.wordPage);
    textbookState.getCurrentWords();
  }
};
