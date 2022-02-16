import { IWordData } from ".";

export interface ISprintAnswer {
  word: IWordData | null, 
  isRightAnswer: boolean 
}

export interface ISprintState {
  setCategory(category: number): void,
  setCurrentWord(): void,
  setFalseAnswer(): void,
  setAnswer(wordTranslate: string): void,
  setScore(score: number): void,
  checkAnswer(bool: boolean): void,
  setStateForRound(): Promise<void>,
  setPoints(): void,
  startGame(isGame: boolean): void,
  setTimer(): void,
  setDefault(): void,
  timerHandler(): void,
  setStateFromTextbook(category: number, page: number): Promise<void>,
  setWordsFromTextbook(): void,
  setCurrentWordFromTextbook(): void,
  setTranslate(): void,
  setFalseAnswerFromTextbook(): void,
  startRound(category: number): void,
  startFromTextbook(category: number, page: number): void,

  category: number,
  page: number,
  currentWordIdx: number,
  currentWord: IWordData | null,
  isRightPair: boolean,
  translate: string,
  falseAnswerIdx: number,
  score: number,
  points: number,
  countTrueAnswers: boolean[],
  isRightAnswer: boolean,
  isGame: boolean,
  secondsInRound: number,
  interval: NodeJS.Timer,
  answers: ISprintAnswer[],
  startGamePage: string,
  wordsFromTextbook: IWordData[],
}