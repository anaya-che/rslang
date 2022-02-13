import { getWordsFromGroup } from '../api/words';
import { IWordStore } from '../utils/interfaces/word-interfaces';

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
