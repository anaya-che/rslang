import { action, observable } from 'mobx';
import { IUserWord, IWordStore } from '../utils/interfaces';
import {
  createUserWord,
  getAllUserWords,
  getWordsFromGroup,
  updateUserWordById,
} from '../api';
import { userState } from '.';

export const wordsStore: IWordStore[] = [];

export const getWords = async (group: number, page: number) => {
  const wordArr = [...wordsStore];
  if (wordArr.length === 0) {
    const data = await getWordsFromGroup(group, page);
    wordsStore.push({
      wordGroup: group,
      wordPage: page,
      wordData: data,
    });
  } else {
    const areWordsInStore = wordArr.some(
      (el) => el.wordGroup === group && el.wordPage === page
    );
    if (!areWordsInStore) {
      const data = await getWordsFromGroup(group, page);
      wordsStore.push({
        wordGroup: group,
        wordPage: page,
        wordData: data,
      });
    }
  }
};

export const userWordsStore = observable({
  userWords: [] as IUserWord[],

  getUserWords: action(async () => {
    if (userState.isAuthorized) {
      userWordsStore.userWords = [];
      const res: IUserWord[] | void = await getAllUserWords(
        userState.tokenInfo.userId
      );
      if (res) userWordsStore.userWords = res;
    }
  }),

  createUserWordFromGame: action(async (wordId: string, isWin: boolean) => {
    const optional = {
      winsInARow: 0,
      mistakesInARow: 0,
      wins: 0,
      mistakes: 0,
    };

    if (isWin) {
      optional.winsInARow = 1;
      optional.wins = 1;
    } else {
      optional.mistakes = 1;
      optional.mistakesInARow = 1;
    }

    await createUserWord(
      userState.tokenInfo.userId,
      wordId,
      'normal',
      optional
    );
  }),

  updateUserWordFromGame: action(async (wordId: string, isWin: boolean) => {
    const wordInfo = userWordsStore.userWords.find(
      (el: IUserWord) => el.wordId === wordId
    ) as IUserWord;
    const { optional } = wordInfo;
    let difficulty = wordInfo.difficulty;
    if (isWin) {
      optional.wins += 1;
      optional.winsInARow += 1;
      optional.mistakesInARow = 0;
      if (difficulty === 'normal' && optional.winsInARow >= 3)
        difficulty = 'easy';
      if (difficulty === 'difficult' && optional.winsInARow >= 5)
        difficulty = 'easy';
    } else {
      optional.mistakes += 1;
      optional.mistakesInARow += 1;
      optional.winsInARow = 0;
      if (difficulty === 'easy') difficulty = 'normal';
    }
    await updateUserWordById(
      userState.tokenInfo.userId,
      wordId,
      difficulty,
      optional
    );
  }),

  changeUserWordFromGame: action(async (wordId: string, isWin: boolean) => {
    await userWordsStore.getUserWords();
    const areWordsInStore = userWordsStore.userWords.some(
      (el: IUserWord) => el.wordId === wordId
    );

    if (areWordsInStore) {
      await userWordsStore.updateUserWordFromGame(wordId, isWin);
    } else {
      await userWordsStore.createUserWordFromGame(wordId, isWin);
    }
    await userWordsStore.getUserWords();
  }),

  changeDifficulty: action(async (wordId: string, difficulty: string) => {
    await userWordsStore.getUserWords();
    const isWordInStore = userWordsStore.userWords.some(
      (el: IUserWord) => el.wordId === wordId
    );
    if (isWordInStore) {
      await userWordsStore.updateDifficulty(wordId, difficulty);
    } else userWordsStore.createDifficulty(wordId, difficulty);

    await userWordsStore.getUserWords();
  }),

  updateDifficulty: action(async (wordId: string, difficulty: string) => {
    const wordInfo = userWordsStore.userWords.find(
      (el: IUserWord) => el.wordId === wordId
    ) as IUserWord;
    const { optional } = wordInfo;
    await updateUserWordById(
      userState.tokenInfo.userId,
      wordId,
      difficulty,
      optional
    );
  }),

  createDifficulty: action(async (wordId: string, difficulty: string) => {
    const optional = {
      winsInARow: 0,
      mistakesInARow: 0,
      wins: 0,
      mistakes: 0,
    };
    await createUserWord(
      userState.tokenInfo.userId,
      wordId,
      difficulty,
      optional
    );
  }),
});
