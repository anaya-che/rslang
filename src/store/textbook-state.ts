import { observable, action } from 'mobx';
import { IWordData } from '../utils/interfaces';
import { getWords, wordsStore } from '.';

export const textbookState = observable({
  wordGroup: 0,
  wordPage: 0,
  currentWords: [] as IWordData[],

  setPage: action((group: string, page: string) => {
    const currentGroup = Number(group) - 1;
    textbookState.wordGroup = currentGroup;
    const currentPage = Number(page) - 1;
    textbookState.wordPage = currentPage;
  }),

  setWordGroup: action((group: number) => {
    textbookState.wordGroup = group;
    textbookState.wordPage = 0;
  }),

  getCurrentWords: action(async () => {
    await getWords(textbookState.wordGroup, textbookState.wordPage);
    wordsStore.forEach((el) => {
      if (
        el.wordGroup === textbookState.wordGroup &&
        el.wordPage === textbookState.wordPage
      )
        textbookState.setCurrentWords(el.wordData);
    });
  }),

  setCurrentWords: action((data: IWordData[]) => {
    textbookState.currentWords = data;
  }),
});
