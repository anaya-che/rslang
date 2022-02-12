// import { wordsStore, getWords } from './words-store';
import { observable, action } from 'mobx';
import { getWords, wordsStore } from './words-store';
import { IaudiocallStat, IWordData } from './../utils/interfaces'

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
    }
  }),

  playAudio: action( () => {
    audiocallState.getWordAudio(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio)
  }),

  chooseCorrectAnswer: action((e: React.MouseEvent): void => {
    let target = e.target as HTMLButtonElement
    audiocallState.image = `https://vismmax-rslang.herokuapp.com/${audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].image}`
    audiocallState.originalWord = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].word
    audiocallState.transcription = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].transcription
    audiocallState.translate = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate
    audiocallState.savedAudioUrl = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].audio

    if (target.innerHTML === audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate) {
      audiocallState.correctAnswers.push({
        word: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].word,
        transcription: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].transcription,
        wordTranslate: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate,
        audio: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio
      })
    } else {
      audiocallState.incorrectAnswers.push({
        word: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].word,
        transcription: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].transcription,
        wordTranslate: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate,
        audio: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio
      })
    }
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

  setStart: action( () => {
    audiocallState.isStarted = true
    audiocallState.getNextWords()
    audiocallState.getWordAudio(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio)
  }),

  getWordAudio: action( (url: string) => {
    const audioPlayer = new Audio() as HTMLAudioElement;
    const URL = `https://vismmax-rslang.herokuapp.com/${url}`;
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
  })
});

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
