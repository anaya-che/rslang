import { observable, action } from 'mobx';
import { IWordData } from '../utils/interfaces';
import { getWords, userState, userWordsStore, wordsStore } from '.';
import { getUserAggregatedWords } from '../api';

export const textbookState = observable({
  wordGroup: 0,
  wordPage: 0,
  currentWords: [] as IWordData[],
  isAuthorized: false,
  difficultWords: [] as IWordData[],
  isPageLearned: false,

  setPage: action((group: string, page: string) => {
    const currentGroup = Number(group) - 1;
    textbookState.wordGroup = currentGroup;
    const currentPage = Number(page) - 1;
    textbookState.wordPage = currentPage;
  }),

  checkIfPageIsLearned: action(() => {
    const audiocallButtons = document.querySelector(
      '#textbook-audiocall'
    ) as HTMLButtonElement;
    const sprintButtons = document.querySelector(
      '#textbook-sprint'
    ) as HTMLButtonElement;
    if (textbookState.wordGroup !== 6) {
      const testResult = textbookState.currentWords.every(
        (el) => el.userWord?.difficulty === 'easy'
      );
      textbookState.isPageLearned = testResult;
    } else if (textbookState.difficultWords.length === 0) {
      textbookState.isPageLearned = true;
    }
    if (textbookState.isPageLearned) {
      audiocallButtons.classList.add('disabled');
      audiocallButtons.setAttribute('disabled', 'disabled');
      sprintButtons.classList.add('disabled');
      sprintButtons.setAttribute('disabled', 'disabled');
    } else {
      audiocallButtons.classList.remove('disabled');
      audiocallButtons.removeAttribute('disabled');
      sprintButtons.classList.remove('disabled');
      sprintButtons.removeAttribute('disabled');
    }
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
      textbookState.checkIfPageIsLearned();
    }
  }),

  setCurrentWords: action((data: IWordData[]) => {
    textbookState.currentWords = data;
  }),

  changeDifficulty: action(async (wordId: string, difficulty: string) => {
    await userWordsStore.changeDifficulty(wordId, difficulty);
    textbookState.getCurrentWords();
    textbookState.checkIfPageIsLearned();
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
  }),

  addNewDifficulty: action(async (wordId: string, difficulty: string) => {
    await userWordsStore.changeDifficulty(wordId, difficulty);
    await textbookState.getAggregatedWords(
      textbookState.wordGroup,
      textbookState.wordPage
    );
  }),
});
