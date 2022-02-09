import { textbookState } from '../../store';

export const getPrevPage = () =>
  textbookState.wordPage !== 0
    ? textbookState.wordPage
    : textbookState.wordPage + 1;

export const getNextPage = () =>
  textbookState.wordPage !== 29
    ? textbookState.wordPage + 2
    : textbookState.wordPage + 1;
