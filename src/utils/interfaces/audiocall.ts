import { MouseEventHandler } from 'react';
import { IWordData } from '.';

export interface IwordResult {
  word: string;
  transcription: string;
  wordTranslate: string;
  audio: string;
}

export interface IaudiocallStat {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  words: Array<IWordData>;
  counter: number;
  randomAnsw: number;
  answersArr: number[];
  answered: Array<IWordData>;
  isAnswered: boolean | null;
  image: string;
  originalWord: string;
  transcription: string;
  translate: string;
  isStarted: boolean | null;
  savedAudioUrl: string;
  nextCallQuestion: MouseEventHandler<HTMLButtonElement>;
  playAudio: Function;
  chooseCorrectAnswer: MouseEventHandler<HTMLButtonElement>;
  getNextWords: Function;
  setStart: Function;
  getWordAudio: Function;
  randomArrayShuffle: Function;
  category: number;
  page: number;
  setStateForRound: Function;
  setCurrentWord: Function;
  setCategory: Function;
  correctAnswers: Array<IwordResult>;
  incorrectAnswers: Array<IwordResult>;
  setDefault: Function;
  handleAudiocallStart: MouseEventHandler<HTMLButtonElement>,
  setAnswered: Function,
  todayDate: string,
  amountOfGames: number,
  bestSeries: number,
  wins: number,
  mistakes: number,
  learnedWordsId: [],
  seriesCounter: Array<number>,
  aggregatedWords: any,
  getFilteredWords: Function,
  setAggWords: Function,
  isStartedFromTextBook: boolean,
  counterConditionValue: number,
  amountOfRemainingWords: number,
  statisticsWordsID: string[],
  amountOfNewWords: number
}