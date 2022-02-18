import { IWordData } from '../interfaces';

export const isNewWord = (data: IWordData): boolean => {
  if (!data.userWord) return true;
  else if (
    data.userWord.optional.mistakes === 0 &&
    data.userWord.optional.wins === 0
  )
    return true;
  else return false;
};
