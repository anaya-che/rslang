import { MouseEventHandler } from "react";

export interface IWordData {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IWordStore {
  wordGroup: number;
  wordPage: number;
  wordData: IWordData[];
}

export interface IwordResult {
  word: string;
  transcription: string;
  wordTranslate: string;
  audio: string;
}

export interface IaudiocallStat {
  first: string,
  second: string,
  third: string,
  fourth: string,
  fifth: string,
  words: Array<IWordData>,
  counter: number,
  randomAnsw: number,
  answersArr: number[],
  answered: Array<IWordData>,
  isAnswered: boolean | null,
  image: string,
  originalWord: string,
  transcription: string,
  translate: string,
  isStarted: boolean | null,
  savedAudioUrl: string,
  nextCallQuestion: MouseEventHandler<HTMLButtonElement>,
  playAudio: Function,
  chooseCorrectAnswer: MouseEventHandler<HTMLButtonElement>,
  getNextWords: Function,
  setStart: Function,
  getWordAudio: Function,
  randomArrayShuffle: Function,
  category: number,
  page: number,
  setStateForRound: Function,
  setCurrentWord: Function,
  setCategory: Function,
  correctAnswers: Array<IwordResult>,
  incorrectAnswers: Array<IwordResult>,
  setDefault: Function,
  handleAudiocallStart: MouseEventHandler<HTMLButtonElement>
}


export interface ILinkProps {
  group: string;
  page: string;
}