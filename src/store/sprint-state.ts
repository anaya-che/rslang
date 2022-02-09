import { wordsStore, getWords } from './words-store';
import { observable, action, toJS } from 'mobx';
import { IWordData } from '../utils/interfaces';
import { baseUrl } from '../api/consts';
import { getRandomInt, getTrueOrFalse } from '../utils/sprint-helpers';


//to do create interface

interface ISprintState {
  setCategory(category: number): void,
  setCurrentWord(): void,
  compareId(): number,
  setFalseAnswer(): void,
  setAnswer(wordTranslate: string): void,
  setScore(score: number): void,
  playAnswerAudio(src: string): void,
  playWordAudio(): void,
  checkAnswer(bool: boolean): void,
  setStateForRound(): Promise<void>,
  setPoints(): void,
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
}

export const sprintState: ISprintState = observable({
  category: 0,
  page: 0,
  currentWordIdx: 0,
  currentWord: null,
  isRightPair: true,
  translate: '',
  falseAnswerIdx: 0,
  score: 0,
  points: 10,
  countTrueAnswers: [],
  isRightAnswer: true,
  
  setPoints: action((): void => {
    if (sprintState.isRightAnswer  
      && sprintState.countTrueAnswers.length < 3) {
      sprintState.countTrueAnswers.push(sprintState.isRightAnswer);
      sprintState.setScore(sprintState.points);
    } else if (sprintState.isRightAnswer  
      && sprintState.countTrueAnswers.length === 3){
      sprintState.countTrueAnswers.splice(0, sprintState.countTrueAnswers.length);
      if (sprintState.points < 80) sprintState.points *= 2;
      sprintState.setScore(sprintState.points);
    } else if (!sprintState.isRightAnswer){
      sprintState.countTrueAnswers.splice(0, sprintState.countTrueAnswers.length);
    }
  }),

  setCategory: action((category: number): void => {
    sprintState.category = category;
  }),

  setStateForRound: action(async (): Promise<void> => {
    sprintState.page = getRandomInt(0, 29);
    // sprintState.randPage = (page === 'textbook') ? textBook.page : getRandomInt(0, 29);
    sprintState.currentWordIdx = getRandomInt(0, 19);
    sprintState.isRightPair = getTrueOrFalse();
    await getWords(sprintState.category, sprintState.page);
    sprintState.setCurrentWord();
    if (!sprintState.isRightPair) {
      sprintState.falseAnswerIdx = sprintState.compareId();
      sprintState.setFalseAnswer();
    } else if (sprintState.currentWord) sprintState.setAnswer(sprintState.currentWord.wordTranslate);
    
    console.log(sprintState.page, sprintState.currentWordIdx, sprintState.isRightPair, sprintState.translate);
  }),

  setAnswer: action((answer: string): void => {
    sprintState.translate = answer;
  }),

  setScore: action((score: number): void => {
    sprintState.score += score;
  }),

  setCurrentWord: action((): void => {
    wordsStore.forEach((el) => {
      if (el.wordGroup === sprintState.category
           && el.wordPage === sprintState.page) {
            sprintState.currentWord = el.wordData[sprintState.currentWordIdx];
            console.log(toJS(sprintState.currentWord));   
      }
    })
  }),

  setFalseAnswer: action((): void => {
    wordsStore.forEach((el) => {
      if (el.wordGroup === sprintState.category
           && el.wordPage === sprintState.page) {
            sprintState.translate = el.wordData[sprintState.falseAnswerIdx].wordTranslate;  
      }
    })
  }),

  checkAnswer: action ((bool: boolean): void =>  {
    const resEl = document.querySelector('#result') as HTMLElement;
    const card = document.querySelector('.sprintCard') as HTMLElement;
    if (bool === sprintState.isRightPair) {
      resEl.innerHTML = 'Вы угадали';
      sprintState.isRightAnswer = true;
      sprintState.playAnswerAudio(`../../right.mp3`);
    } else {
      resEl.innerHTML = 'Вы не угадали :(';
      sprintState.isRightAnswer = false;
      sprintState.playAnswerAudio(`../../mistake.mp3`);
    } 
    sprintState.setPoints();
    console.log(toJS(sprintState.countTrueAnswers), sprintState.points);
  }),

  compareId: action ( (): number => {
    const falseId: number = getRandomInt(0, 19);
    if (falseId === sprintState.currentWordIdx) {
      sprintState.compareId();
    } return falseId;
  }),

  playWordAudio: action ( (): void => {
    const audio = new Audio();
    if (sprintState.currentWord) audio.src = `${baseUrl}${sprintState.currentWord.audio}`;
    audio.play();
  }),

  playAnswerAudio: action ( (src: string): void => {
    const audio = new Audio(src);
    audio.load();  
    audio.play();
  })
});
