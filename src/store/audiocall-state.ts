import { observable, action, toJS } from 'mobx';
import { getWords, wordsStore } from './words-store';
import { IWordData } from '../utils/interfaces/words'
import { baseUrl } from '../api/consts'
import { IaudiocallStat } from '../utils/interfaces/audiocall';
import { textbookState, userState } from '../store/index';
import { playAnswerAudio } from '../utils/audiocall-helpers';
import { userWordsStore } from './words-store'

export const audiocallState: IaudiocallStat = observable({
  randomAnsw: Math.round(Math.random() * (4 - 0) + 0),
  answersArr: [],
  counter: 1,
  words: [],
  first: '',
  second: '',
  third: '',
  fourth: '',
  fifth: '',
  answered: [],
  isAnswered: null,
  isStarted: null,
  image: '',
  originalWord: '',
  transcription: '',
  translate: '',
  savedAudioUrl: '',
  category: 0,
  page: 0,
  correctAnswers: [],
  incorrectAnswers: [],
  optionals: {
    statistics: []
  },
  todayDate: new Date().toLocaleDateString("en-US"),
  amountOfGames: 0,
  bestSeries: 0,
  wins: 0,
  mistakes: 0,
  learnedWordsId: [],
  seriesCounter: [],
  aggregatedWords: [],

  setCategory: action(async (category: number) => {
    audiocallState.category = category;
    await audiocallState.setStateForRound()
  }),

  setStateForRound: action(async (): Promise<void> => {
    audiocallState.page = getRandomInt(0, 29);
    await getWords(audiocallState.category, audiocallState.page);
    audiocallState.setCurrentWord()
  }),

  setCurrentWord: action((): void => {
    wordsStore.forEach((el) => {
      if (el.wordGroup === audiocallState.category
           && el.wordPage === audiocallState.page) {
            audiocallState.words = el.wordData
      }
    })
  }),

  nextCallQuestion: action( () => {
    let answersArr: number[] = audiocallState.randomArrayShuffle(Array.from(Array(audiocallState.words.length).keys())).slice(0,5)
    audiocallState.randomAnsw = Math.round(Math.random() * (4 - 0) + 0)
    audiocallState.counter = audiocallState.counter + 1
    audiocallState.first = audiocallState.words[answersArr[0]].wordTranslate
    audiocallState.second = audiocallState.words[answersArr[1]].wordTranslate
    audiocallState.third = audiocallState.words[answersArr[2]].wordTranslate
    audiocallState.fourth = audiocallState.words[answersArr[3]].wordTranslate
    audiocallState.fifth = audiocallState.words[answersArr[4]].wordTranslate
    audiocallState.answersArr = answersArr
    audiocallState.isAnswered = false
    if ( audiocallState.counter < 11) {
      audiocallState.playAudio()
    } else if ( audiocallState.counter === 11) {
      audiocallState.amountOfGames = audiocallState.amountOfGames +  1
      audiocallState.bestSeries = Math.max(...Array.from(audiocallState.seriesCounter.join("").matchAll(/(.)\1+/g), m=>m[0].length))
      audiocallState.mistakes = audiocallState.seriesCounter.filter(x => x === 0).length
      audiocallState.wins = audiocallState.seriesCounter.filter(x => x === 1).length
    }
  }),

  playAudio: action( () => {
    audiocallState.getWordAudio(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio)
  }),

  chooseCorrectAnswer: action( async (e: React.MouseEvent) => {
    let target = e.target as HTMLButtonElement
    audiocallState.image = `https://vismmax-rslang.herokuapp.com/${audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].image}`
    audiocallState.originalWord = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].word
    audiocallState.transcription = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].transcription
    audiocallState.translate = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate
    audiocallState.savedAudioUrl = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].audio
    if (target.innerHTML === audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate) {
      playAnswerAudio(`../../right.mp3`);
      await userWordsStore.changeUserWordFromGame(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].id, true)
      audiocallState.correctAnswers.push({
        word: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].word,
        transcription: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].transcription,
        wordTranslate: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate,
        audio: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio
      })
      audiocallState.seriesCounter.push(1)
    } else {
      playAnswerAudio(`../../mistake.mp3`);
      await userWordsStore.changeUserWordFromGame(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].id, false)
      audiocallState.incorrectAnswers.push({
        word: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].word,
        transcription: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].transcription,
        wordTranslate: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate,
        audio: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio
      })
      audiocallState.seriesCounter.push(0)
    }
    audiocallState.setAnswered()
  }),

  setAnswered: action (() => {
    let filtered = audiocallState.answered.filter((el) => { return el.word !== audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].word; })
    audiocallState.answered = filtered
    audiocallState.words = filtered
    audiocallState.isAnswered = true
  }),

  getNextWords: action(() => {
    let wordsArr: Array<IWordData> = audiocallState.randomArrayShuffle(audiocallState.words)
    let questionAnswers: Array<number> = audiocallState.randomArrayShuffle(Array.from(Array(20).keys())).slice(0,5)
    audiocallState.words = wordsArr
    audiocallState.first = wordsArr[questionAnswers[0]].wordTranslate
    audiocallState.second = wordsArr[questionAnswers[1]].wordTranslate
    audiocallState.third = wordsArr[questionAnswers[2]].wordTranslate
    audiocallState.fourth = wordsArr[questionAnswers[3]].wordTranslate
    audiocallState.fifth = wordsArr[questionAnswers[4]].wordTranslate
    audiocallState.answersArr = questionAnswers
    audiocallState.answered = wordsArr
    audiocallState.isStarted = true
  }),

  setStart: action( async () => {
    audiocallState.isStarted = true
    audiocallState.getNextWords()
    audiocallState.getWordAudio(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio)

    // await getUserAggregatedWords(userState.tokenInfo.userId, '20', `{"$and": [{"group":${0}},{"page":${audiocallState.page}},{"userWord.difficulty":"easy"}]}`)
    // console.log(toJS(audiocallState.aggregatedWords))

    // console.log(toJS(audiocallState.words))
    // if ( audiocallState.optionals.statistics.length === 0 ) {
    //   let audiocall = [{
    //     amountOfGames: 0,
    //     bestSeries: 0,
    //     wins: 0,
    //     mistakes: 0,
    //     learnedWordsId: []
    //   }]
    //   let obj = {'audiocall': audiocall};
    //   let optional = {[audiocallState.todayDate]: obj};
    //   audiocallState.optionals.statistics.push(optional)
    // }
  }),

  getWordAudio: action( (url: string) => {
    const audioPlayer = new Audio() as HTMLAudioElement;
    const URL = baseUrl + url;
    audioPlayer.src = URL
    audioPlayer.play()
  }),

  randomArrayShuffle: action((array: [] | number[]) => {
    var currentIndex: number = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }),

  setDefault: action (() => {
    audiocallState.answersArr = []
    audiocallState.counter =  1
    audiocallState.words = []
    audiocallState.answered = []
    audiocallState.correctAnswers = []
    audiocallState.incorrectAnswers = []
    audiocallState.isStarted = null
    audiocallState.isAnswered = null
  }),

  handleAudiocallStart: action( async () => {
    audiocallState.category = textbookState.wordGroup
    audiocallState.page = textbookState.wordPage
    await getWords(audiocallState.category, audiocallState.page);
    audiocallState.setCurrentWord()
    audiocallState.setStart()
  }),

});

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
