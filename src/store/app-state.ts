import { getWords } from './words-store';
import { observable, action } from 'mobx';
// import { textbookState } from '.';

export const appState = observable({
  appPage: 'main',

  setPage: action(async (page: string) => {
    appState.appPage = page;
    if (page === 'textbook') {
      await getWords(0, 0);
      // textbookState.getCurrentWords();
    }
  }),
});
