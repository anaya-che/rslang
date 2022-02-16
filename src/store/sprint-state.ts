import { wordsStore, getWords } from './words-store';
import { observable, action } from 'mobx';
import { compareId, getRandomInt, getTrueOrFalse, playAnswerAudio, shuffle } from '../utils/sprint-helpers';
import { ISprintState } from '../utils/interfaces/sprint';


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
  isGame: false,
  secondsInRound: 60,
  interval: setInterval(() => {}),
  answers: [],
  startGamePage: '',
  wordsFromTextbook: [],
  
  setDefault: action (() => {
    sprintState.category = 0;
    sprintState.page = 0;
    sprintState.currentWordIdx = 0;
    sprintState.currentWord = null;
    sprintState.isRightPair = true;
    sprintState.translate = '';
    sprintState.falseAnswerIdx = 0;
    sprintState.score = 0;
    sprintState.points = 10;
    sprintState.countTrueAnswers = [];
    sprintState.isRightAnswer = true;
    sprintState.isGame = false;
    sprintState.secondsInRound = 60;
    clearInterval(sprintState.interval);
    sprintState.answers = [];
    sprintState.wordsFromTextbook = [];
  }),

  setCategory: action((category: number): void => {
    sprintState.category = category;
  }),

  startGame: action((isGame: boolean): void => {
    sprintState.isGame = isGame;
  }),
  
  setTimer: action((): void => {
    sprintState.secondsInRound -= 1;
  }),

  setWordsFromTextbook: action((): void => {
    wordsStore.forEach((el) => {
      if (el.wordGroup === sprintState.category
           && el.wordPage === sprintState.page) {
            sprintState.wordsFromTextbook = [...el.wordData];
            shuffle(sprintState.wordsFromTextbook);
      }
    })
  }),

  setCurrentWordFromTextbook: action((): void => {
    sprintState.currentWord = sprintState.wordsFromTextbook[sprintState.currentWordIdx];   
  }),

  setFalseAnswerFromTextbook: action((): void => {
    sprintState.translate = sprintState.wordsFromTextbook[sprintState.falseAnswerIdx].wordTranslate;  
  }),

  setCurrentWord: action((): void => {
    wordsStore.forEach((el) => {
      if (el.wordGroup === sprintState.category
           && el.wordPage === sprintState.page) {
            sprintState.currentWord = el.wordData[sprintState.currentWordIdx];   
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

  setAnswer: action((answer: string): void => {
    sprintState.translate = answer;
  }),

  setTranslate: action((): void => {
    sprintState.isRightPair = getTrueOrFalse();    
    if (!sprintState.isRightPair) {
      sprintState.falseAnswerIdx = compareId();
      if (sprintState.startGamePage === 'main') {
      sprintState.setFalseAnswer();
      } else if (sprintState.startGamePage === 'textbook') {
        sprintState.setFalseAnswerFromTextbook();
      }
    } 
    else if (sprintState.currentWord) sprintState.setAnswer(sprintState.currentWord.wordTranslate);
  }),

  setStateForRound: action(async (): Promise<void> => {
    sprintState.page = getRandomInt(0, 29);
    sprintState.currentWordIdx = getRandomInt(0, 19);
    await getWords(sprintState.category, sprintState.page);
    sprintState.setCurrentWord();
    sprintState.setTranslate();    
  }),
  
  setStateFromTextbook: action(async (category: number, page: number): Promise<void> => {
    if((sprintState.page === 0) 
        && (sprintState.category === 0) 
        && (sprintState.currentWordIdx === 19)) {
      sprintState.secondsInRound = 0;
    } 
    else if (sprintState.currentWordIdx < 19) {
      sprintState.setCategory(category);
      sprintState.page = page;
      await getWords(sprintState.category, sprintState.page);
      sprintState.setCurrentWordFromTextbook();
      sprintState.setTranslate();
      sprintState.currentWordIdx +=1;
    } 
    else if (sprintState.currentWordIdx === 19) {
      sprintState.wordsFromTextbook.splice(0, sprintState.wordsFromTextbook.length);
      sprintState.currentWordIdx = 0;
      if (sprintState.page === 0) {
        sprintState.category = sprintState.category - 1;
        sprintState.page = 29;
      } else {
        sprintState.page = sprintState.page - 1;
      }
      await getWords(sprintState.category, sprintState.page);
      sprintState.setWordsFromTextbook();
      sprintState.setCurrentWordFromTextbook();      
      sprintState.setTranslate();
      sprintState.currentWordIdx +=1;
    }
  }),
  
  startRound: action ((category: number): void => {
    sprintState.setCategory(category);
    sprintState.startGamePage = 'main';
    sprintState.setStateForRound();
    sprintState.startGame(true);
    sprintState.timerHandler();
  }),

  startFromTextbook: action ((category: number, page: number): void => {
    sprintState.startGamePage = 'textbook';
    sprintState.setStateFromTextbook(category, page);
    sprintState.setWordsFromTextbook();
    sprintState.startGame(true);
    sprintState.timerHandler();
  }),

  timerHandler: action (() => {
    sprintState.interval = setInterval(action(() => {
      if (sprintState.secondsInRound > 0) {
        sprintState.setTimer();
      } else clearInterval(sprintState.interval);
    }), 1000);
  }),

  checkAnswer: action ((bool: boolean): void =>  {
    if (bool === sprintState.isRightPair) {
      sprintState.isRightAnswer = true;
      playAnswerAudio(`../../right.mp3`);
    } else {
      sprintState.isRightAnswer = false;
      playAnswerAudio(`../../mistake.mp3`);
    } 
    sprintState.answers.push({
      word: sprintState.currentWord, 
      isRightAnswer: sprintState.isRightAnswer 
    });
    sprintState.setPoints();
  }),

  setScore: action((score: number): void => {
    sprintState.score += score;
  }),
  
  setPoints: action((): void => {
    if (sprintState.isRightAnswer  
      && sprintState.countTrueAnswers.length < 3) {
      sprintState.countTrueAnswers.push(sprintState.isRightAnswer);
      sprintState.setScore(sprintState.points);
    } 
    else if (sprintState.isRightAnswer  
      && sprintState.countTrueAnswers.length === 3){
      sprintState.countTrueAnswers.splice(0, sprintState.countTrueAnswers.length);
      if (sprintState.points < 80) sprintState.points *= 2;
      sprintState.setScore(sprintState.points);
    } 
    else if (!sprintState.isRightAnswer){
      sprintState.countTrueAnswers.splice(0, sprintState.countTrueAnswers.length);
    }
  }),

});

