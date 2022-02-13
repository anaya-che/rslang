import { baseUrl } from "../../api/consts";
import { sprintState } from "../../store/sprint-state";

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
  const falseAnswerId: number = getRandomInt(0, 19);
  if (falseAnswerId === sprintState.currentWordIdx) {
    compareId();
  } return falseAnswerId;
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

