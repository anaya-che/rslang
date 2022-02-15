import { observable, action, toJS } from 'mobx';
import { IWordData } from '../utils/interfaces';
import { getWords, userState, userWordsStore, wordsStore } from '.';
import { getUserAggregatedWords } from '../api';

export const textbookState = observable({
  wordGroup: 0,
  wordPage: 0,
  currentWords: [] as IWordData[],
  isAuthorized: false,
  difficultWords: [] as IWordData[],

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
    await userState.checkAuth();
    if (!userState.isAuthorized) {
      textbookState.isAuthorized = false;
      await getWords(textbookState.wordGroup, textbookState.wordPage);
      wordsStore.forEach((el) => {
        if (
          el.wordGroup === textbookState.wordGroup &&
          el.wordPage === textbookState.wordPage
        )
          textbookState.setCurrentWords(el.wordData);
      });
    } else {
      textbookState.isAuthorized = true;
      if (textbookState.wordGroup !== 6) {
        await textbookState.getAggregatedWords(
          textbookState.wordGroup,
          textbookState.wordPage
        );
      } else await textbookState.getDifficultWords();
    }
  }),

  setCurrentWords: action((data: IWordData[]) => {
    textbookState.currentWords = data;
  }),

  changeDifficulty: action(async (wordId: string, difficulty: string) => {
    await userWordsStore.changeDifficulty(wordId, difficulty);
    textbookState.getCurrentWords();
  }),

  getAggregatedWords: action(async (group: number, page: number) => {
    const filter = `{"$and": [{"group":${group}},{"page":${page}}]}`;
    const wordsPerPage = '20';
    const data: IWordData[] = await getUserAggregatedWords(
      userState.tokenInfo.userId,
      wordsPerPage,
      filter
    );
    textbookState.setCurrentWords(data);
  }),

  getDifficultWords: action(async () => {
    const filter = '{"userWord.difficulty":"difficult"}';
    const wordsPerPage = '1600';
    const data: IWordData[] = await getUserAggregatedWords(
      userState.tokenInfo.userId,
      wordsPerPage,
      filter
    );
    textbookState.setDifficultWords(data);
  }),

  setDifficultWords: action((data: IWordData[]) => {
    textbookState.difficultWords = data;
    console.log(toJS(textbookState.difficultWords));
  }),

  addNewDifficulty: action(async (wordId: string, difficulty: string) => {
    await userWordsStore.changeDifficulty(wordId, difficulty);
    await textbookState.getAggregatedWords(
      textbookState.wordGroup,
      textbookState.wordPage
    );
  }),
});
