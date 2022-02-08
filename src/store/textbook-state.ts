import { getWords, wordsStore } from '.';
import { observable, action } from 'mobx';
import { IWordData } from '../utils/interfaces';

export const textbookState = observable({
  wordGroup: 0,
  wordPage: 0,
  currentWords: [] as IWordData[],

  setPrevWordPage: action(async () => {
    if (textbookState.wordPage !== 0) {
      textbookState.wordPage -= 1;
      await getWords(textbookState.wordGroup, textbookState.wordPage);
      textbookState.getCurrentWords();
    }
  }),

  setNextWordPage: action(async () => {
    if (textbookState.wordPage !== 29) {
      textbookState.wordPage += 1;
      await getWords(textbookState.wordGroup, textbookState.wordPage);
      textbookState.getCurrentWords();
    }
  }),

  setWordGroup: action(async (group: number) => {
    textbookState.wordGroup = group;
    textbookState.wordPage = 0;
    await getWords(textbookState.wordGroup, textbookState.wordPage);
    textbookState.getCurrentWords();
  }),

  getCurrentWords: action(() => {
    wordsStore.forEach((el) => {
      if (
        el.wordGroup === textbookState.wordGroup &&
        el.wordPage === textbookState.wordPage
      ) textbookState.currentWords = el.wordData;
    });
  }),
});
