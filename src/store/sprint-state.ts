import { isNewWord } from './../utils/statistics-helpers/new-words';
import { wordsStore, getWords, userWordsStore } from './words-store';
import { observable, action, toJS } from 'mobx';
import { compareId, getRandomInt, getTrueOrFalse, playAnswerAudio, shuffle } from '../utils/sprint-helpers';
import { ISprintState } from '../utils/interfaces/sprint';
import { textbookState, userState } from '.';
import { getUserAggregatedWords } from '../api';
import { getLearnedWords } from '../utils/statistics-helpers/learned-words';
import { statisticsState } from './statistics-state';

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

  newWordsCount: 0,
  bestSeries: 0,
  totalWins: 0,
  totalMistakes: 0,
  learnedWords: [],
  date: new Date().toLocaleString('en-GB', { dateStyle: 'short'}),
  
  
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

    sprintState.newWordsCount = 0;
    sprintState.bestSeries = 0;
    sprintState.totalWins = 0;
    sprintState.totalMistakes = 0;
    sprintState.learnedWords = [];
    sprintState.date = new Date().toLocaleString('en-GB', { dateStyle: 'short'});
  }),

  setNewWordCounter: action (() => {
    if (sprintState.currentWord && isNewWord(sprintState.currentWord)) {
      sprintState.newWordsCount +=1;
    }  
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

  setWordsFromTextbook: action(async (): Promise<void> => {
    if (userState.isAuthorized){
      if (sprintState.category === 6) {
        sprintState.wordsFromTextbook = [...textbookState.difficultWords];
        shuffle(sprintState.wordsFromTextbook);
      } 
      else {
        const wordsPerPage = '20';
        const filter = `{"$and":[{"$or":[{"userWord.difficulty":"difficult"},{"userWord.difficulty":"normal"},{"userWord":null}]},{"group":${sprintState.category}},{"page":${sprintState.page}}]}`;
        const data = await getUserAggregatedWords(userState.tokenInfo.userId, wordsPerPage, filter);
        sprintState.wordsFromTextbook = [...data];
        shuffle(sprintState.wordsFromTextbook);
      }
    }
     else {
      wordsStore.forEach((el) => {
        if (el.wordGroup === sprintState.category
             && el.wordPage === sprintState.page) {
              sprintState.wordsFromTextbook = [...el.wordData];
              shuffle(sprintState.wordsFromTextbook);
        }
      })
    }
  }),

  setCurrentWordFromTextbook: action((): void => {
    sprintState.currentWord = sprintState.wordsFromTextbook[sprintState.currentWordIdx];   
  }),

  setFalseAnswerFromTextbook: action(async(): Promise<void> => {
    let group = sprintState.category;
    let page = sprintState.page;
    if (sprintState.category !== 6) {
      if (page === 0 || page < 29) {
        page += 1;
      } 
      else if (page === 29) page -= 1;
      let falseAnswerIdx = getRandomInt(0, 19);
      await getWords(group, page);

      wordsStore.forEach((el) => {
        if (el.wordGroup === group
            && el.wordPage === page) {
              sprintState.setAnswer(el.wordData[falseAnswerIdx].wordTranslate);
        }
      })
    }
    else {
      sprintState.setAnswer(sprintState.wordsFromTextbook[sprintState.falseAnswerIdx].wordTranslate);
    }
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

  setTranslate: action(async(): Promise<void> => {
    sprintState.isRightPair = getTrueOrFalse();    
    if (!sprintState.isRightPair) {
      sprintState.falseAnswerIdx = compareId();
      if (sprintState.startGamePage === 'main') {
      sprintState.setFalseAnswer();
      } 
      else if (sprintState.startGamePage === 'textbook') {
        await sprintState.setFalseAnswerFromTextbook();
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
        && (sprintState.currentWordIdx === sprintState.wordsFromTextbook.length-1)) {
      sprintState.secondsInRound = 0;
      if (userState.isAuthorized) {
        await sprintState.checkLearnedWords();
        statisticsState.updateStatistics(sprintState.date, 'sprint', {
          gamesCount: 1,
          newWords: sprintState.newWordsCount,
          bestSeries: sprintState.bestSeries,
          totalWins: sprintState.totalWins,
          totalMistakes: sprintState.totalMistakes,
          learnedWordsId: sprintState.learnedWords,
        })
      }
    } 
    else if (sprintState.currentWordIdx < sprintState.wordsFromTextbook.length-1) {
      sprintState.currentWordIdx +=1;
      sprintState.setCategory(category);
      sprintState.page = page;
      await getWords(sprintState.category, sprintState.page);
      sprintState.setCurrentWordFromTextbook();
      sprintState.setTranslate();
    } 
    else if (sprintState.currentWordIdx === sprintState.wordsFromTextbook.length-1) {
      sprintState.wordsFromTextbook.splice(0, sprintState.wordsFromTextbook.length);
      sprintState.currentWordIdx = 0;
      if (sprintState.page === 0) {
        sprintState.category = sprintState.category - 1;
        sprintState.page = 29;
      } else {
        sprintState.page = sprintState.page - 1;
      }
      await getWords(sprintState.category, sprintState.page);
      await sprintState.setWordsFromTextbook();
      sprintState.setCurrentWordFromTextbook();      
      sprintState.setTranslate();
      sprintState.currentWordIdx +=1;
    }
  }),
  
  startRound: action ((category: number): void => {
    sprintState.setDefault();
    sprintState.setCategory(category);
    sprintState.startGamePage = 'main';
    sprintState.setStateForRound();
    sprintState.startGame(true);
    sprintState.timerHandler();
  }),

  startFromTextbook: action (async(category: number, page: number): Promise<void> => {
    sprintState.setDefault();
    sprintState.startGamePage = 'textbook';
    sprintState.setCategory(category);
    sprintState.page = page;
    await getWords(category, page);
    await sprintState.setWordsFromTextbook();
    sprintState.setCurrentWordFromTextbook();
    sprintState.setTranslate();
    sprintState.startGame(true);
    sprintState.timerHandler();
  }),

  timerHandler: action (() => {
    sprintState.interval = setInterval(action(async () => {
      if (sprintState.secondsInRound > 0) {
        sprintState.setTimer();
      } else {
        clearInterval(sprintState.interval);
        if (userState.isAuthorized) {
          await sprintState.checkLearnedWords();
          statisticsState.updateStatistics(sprintState.date, 'sprint', {
          gamesCount: 1,
          newWords: sprintState.newWordsCount,
          bestSeries: sprintState.bestSeries,
          totalWins: sprintState.totalWins,
          totalMistakes: sprintState.totalMistakes,
          learnedWordsId: sprintState.learnedWords,
        })
        console.log('learnedWordsId:', toJS(sprintState.learnedWords));
        
       }
      }
    }), 1000);
  }),

  checkAnswer: action ((bool: boolean): void =>  {
    if (bool === sprintState.isRightPair) {
      sprintState.isRightAnswer = true;
      playAnswerAudio(`../../right.mp3`);
      sprintState.bestSeries += 1;
      sprintState.totalWins += 1;
    } else {
      sprintState.isRightAnswer = false;
      playAnswerAudio(`../../mistake.mp3`);
      sprintState.bestSeries = 0;
      sprintState.totalMistakes += 1;
    } 
    if (userState.isAuthorized && sprintState.currentWord) {
      sprintState.setNewWordCounter();
      userWordsStore.changeUserWordFromGame(sprintState.currentWord?.id, sprintState.isRightAnswer);
    }
    sprintState.answers.push({
      word: sprintState.currentWord, 
      isRightAnswer: sprintState.isRightAnswer 
    });
    sprintState.setPoints();
  }),

  checkLearnedWords: action (async() => {
    const learnnWordsArr: string[] = [];
    sprintState.answers.forEach((el) => {
      el.word && learnnWordsArr.push(el.word?.id);
    });
    sprintState.learnedWords = await getLearnedWords(learnnWordsArr);
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

