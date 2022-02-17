import { toJS } from "mobx";
import { userWordsStore } from "../../store";
import { IUserWord } from "../interfaces";

export const getLearnedWords = async (wordsId: string[]): Promise<string[]> => {
  const learnedWordId: string[] = [];
  await userWordsStore.getUserWords();
  toJS(userWordsStore.userWords).forEach((el: IUserWord): void => {
    if (wordsId.includes(el.wordId) && el.difficulty === 'easy')
      learnedWordId.push(el.wordId);
  });
  return learnedWordId;
};
