import { textbookState } from '../../store';

export const getPrevPage = () =>
  textbookState.wordPage !== 0
    ? textbookState.wordPage
    : textbookState.wordPage + 1;

export const getNextPage = () => {
  if (textbookState.wordGroup !== 6 && textbookState.wordPage !== 29)
    return textbookState.wordPage + 2;
  else if (
    textbookState.wordGroup === 6 &&
    textbookState.wordPage !==
      Math.floor(textbookState.difficultWords.length / 20)
  )
    return textbookState.wordPage + 2;
  else return textbookState.wordPage + 1;
};
