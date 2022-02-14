import { action, observable, toJS } from 'mobx';
import { getWordsFromGroup } from '../api';
import {
  createUserWord,
  getAllUserWords,
  updateUserWordById,
} from '../api/user-words';
import { IUserWord, IWordStore } from '../utils/interfaces';
import { userState } from './user-state';

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
      console.log(toJS(userWordsStore.userWords));
    }
  }),

  createUserWordFromGame: action(
    async (
      wordId: string,
      isWin: boolean,
      wordGroup: number,
      wordPage: number
    ) => {
      const options = {
        group: wordGroup,
        page: wordPage,
        isNew: true,
        winsInARow: 0,
        mistakesInARow: 0,
        wins: 0,
        mistakes: 0,
      };

      if (isWin) {
        options.winsInARow = 1;
        options.wins = 1;
      }
      else {
        options.mistakes = 1;
        options.mistakesInARow = 1;
      }

      await createUserWord(
        userState.tokenInfo.userId,
        wordId,
        'normal',
        options
      );
    }
  ),

  updateUserWordFromGame: action(async (wordId: string, isWin: boolean) => {
    const wordInfo = userWordsStore.userWords.find(
      (el: IUserWord) => el.wordId === wordId
    ) as IUserWord;
    const options = {
      group: wordInfo.optional.group,
      page: wordInfo.optional.page,
      isNew: false,
      winsInARow: wordInfo.optional.winsInARow,
      mistakesInARow: wordInfo.optional.mistakesInARow,
      wins: wordInfo.optional.wins,
      mistakes: wordInfo.optional.mistakes,
    };
    let difficulty = wordInfo.difficulty;
    if (isWin) {
      options.wins += 1;
      options.winsInARow += 1;
      options.mistakesInARow = 0;
      if (difficulty === 'normal' && options.winsInARow >= 3) difficulty = 'easy';
      if (difficulty === 'difficult' && options.winsInARow >= 5)
        difficulty = 'easy';
    } else {
      options.mistakes += 1;
      options.mistakesInARow += 1;
      options.winsInARow = 0;
      if (difficulty === 'easy') difficulty = 'normal';
    }
    await updateUserWordById(
      userState.tokenInfo.userId,
      wordId,
      difficulty,
      options
    );
  }),

  changeUserWordFromGame: action(
    async (
      wordId: string,
      isWin: boolean,
      wordGroup: number,
      wordPage: number
    ) => {
      const areWordsInStore = userWordsStore.userWords.some(
        (el: IUserWord) => el.wordId === wordId
      );

      if (areWordsInStore) {
        await userWordsStore.updateUserWordFromGame(wordId, isWin);
      } else
        await userWordsStore.createUserWordFromGame(
          wordId,
          isWin,
          wordGroup,
          wordPage
        );
      await userWordsStore.getUserWords();
    }
  ),
});
