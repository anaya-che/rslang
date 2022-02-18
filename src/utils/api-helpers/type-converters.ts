import { IAggregatedWordData, INoUserWords, IWordData } from '../interfaces';

export const convertNoUserWordsToIWordData = (
  data: INoUserWords
): IWordData => {
  return { ...data, userWord: null };
};

export const convertAggregatedWordsToIWordData = (
  data: IAggregatedWordData
): IWordData => {
  return { ...data, id: data._id };
};
