import { baseUrl } from "../../api/consts";
import { textbookState } from "../../store";
import { sprintState } from "../../store/sprint-state";
import { IWordData } from "../interfaces";

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getTrueOrFalse() {
  return !!(Math.floor(Math.random() * 2));
}

export const countPercentage = (total: number, part: number) => {
  if (total !== 0) {
    return Math.floor(100 * part /total)
  } return 0 
}

export const compareId = (): number => {
  let falseAnswerId: number = 0;
  if(sprintState.startGamePage === 'textbook') {
    falseAnswerId = getRandomInt(0, sprintState.wordsFromTextbook.length-1);
  } else falseAnswerId = getRandomInt(0, 19);
 
  if (falseAnswerId === sprintState.currentWordIdx) {
    compareId();
  } 
  return falseAnswerId;
}

export const playWordAudio = (): void => {
  const audio = new Audio();
  if (sprintState.currentWord) audio.src = `${baseUrl}${sprintState.currentWord.audio}`;
  audio.play();
}

export const playAnswerAudio = (src: string): void => {
  const audio = new Audio(src);
  audio.load();  
  audio.play();
}

export const checkRightPair = (isRight: boolean): void => {
  sprintState.checkAnswer(isRight);
  if (sprintState.startGamePage === 'main'){
    sprintState.setStateForRound();
  } else if (sprintState.startGamePage === 'textbook') {
    sprintState.setStateFromTextbook(sprintState.category, sprintState.page);
  }
}

export const handlePlayAgain = (): void => {
  sprintState.setDefault();
  if(sprintState.startGamePage === 'textbook') { 
    sprintState.startFromTextbook(textbookState.wordGroup, textbookState.wordPage)}
}

export const shuffle = (array: IWordData[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

