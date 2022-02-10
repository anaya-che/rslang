import { getWords } from './words-store';
import { observable, action, toJS } from 'mobx';
// import { textbookState } from '.';

export const appState = observable({
  appPage: 'main',

  setPage: action(async (page: string) => {
    appState.appPage = page;
    if (page === 'textbook') {
      // await getWords(textbookState.wordGroup, textbookState.wordPage);
      // textbookState.getCurrentWords();
    }
  }),
});
