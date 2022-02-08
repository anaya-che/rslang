import { wordsStore, getWords } from './words-store';
import { observable, action, toJS } from 'mobx';
import { IWordData } from '../utils/interfaces';
import { baseUrl } from '../api/consts';
//to do create interface

export const sprintState = observable({
  category: 0,
  randPage: 0,
  randWordId: 0,
  isCorrectWord: true,
  currentWord: {wordTranslate: '', word: '', audio: ''},
  answer: '',
  randomFalseAnswerId: 0,
  score: 0,

  setCategory: action((category: number) => {
    sprintState.category = category;
  }),

  setStateForRound: action(async () => {
    sprintState.randPage = getRandomInt(0, 29);
    sprintState.randWordId = getRandomInt(0, 19);
    sprintState.isCorrectWord = getTrueOrFalse();
    await getWords(sprintState.category, sprintState.randPage);
    sprintState.setCurrentWord();
    if (!sprintState.isCorrectWord) {
      sprintState.randomFalseAnswerId = sprintState.compareId();
      sprintState.setFalseAnswer();
    } else sprintState.setAnswer(sprintState.currentWord.wordTranslate);
    
    console.log(sprintState.randPage, sprintState.randWordId, sprintState.isCorrectWord, sprintState.answer);
  }),

  setAnswer: action((answer: string) => {
    sprintState.answer = answer;
  }),

  setScore: action((score: number) => {
    sprintState.score += score;
  }),

  setCurrentWord: action(() => {
    wordsStore.forEach((el) => {
      if (el.wordGroup === sprintState.category
           && el.wordPage === sprintState.randPage) {
            sprintState.currentWord = el.wordData[sprintState.randWordId];
            console.log(toJS(sprintState.currentWord));   
      }
    })
  }),

  setFalseAnswer: action(() => {
    wordsStore.forEach((el) => {
      if (el.wordGroup === sprintState.category
           && el.wordPage === sprintState.randPage) {
            sprintState.answer = el.wordData[sprintState.randomFalseAnswerId].wordTranslate;
            console.log(sprintState.answer);   
      }
    })
  }),

  checkAnswer: action ((bool: boolean) =>  {
    const resEl = document.querySelector('#result') as HTMLElement;
    if (bool === sprintState.isCorrectWord) {
      resEl.innerHTML = 'Вы угадали';
      sprintState.setScore(10)
    } else resEl.innerHTML = 'Вы не угадали :(';
    sprintState.playAnswerAudio(bool);
  }),

  compareId: action ( () => {
    const falseId: number = getRandomInt(0, 19);
    if (falseId === sprintState.randWordId) {
      sprintState.compareId();
    } return falseId;
  }),

  playWordAudio: action ( () => {
    const audio = new Audio();
    audio.src = `${baseUrl}${sprintState.currentWord.audio}`;
    audio.play();
  }),

  playAnswerAudio: action ( (bool: boolean) => {
    const audio = new Audio();
    if (bool) {
      audio.src = `..src/modules/games/sprint/assets/right.mp3`;
    } else audio.src = `..src/modules/games/sprint/assets/mistake.mp3`;
    audio.play();
  })

});

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getTrueOrFalse() {
  return !!(Math.floor(Math.random() * 2));
}
