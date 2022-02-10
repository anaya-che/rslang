// import { wordsStore, getWords } from './words-store';
import { observable, action, toJS } from 'mobx';
import ReactDOM from 'react-dom';
import { CreateAudioCallGame } from '../modules/games/audiocall/components/game-page/page'
import { getWords, wordsStore } from './words-store';
import { IWordData } from './../utils/interfaces'

interface IwordResult {
  word: string;
  transcription: string;
  wordTranslate: string;
  audio: string;
}

export const audiocallState: { first: string, second: string, third: string,fourth: string, fifth: string, words: Array<IWordData>, counter: number, randomAnsw: number, answersArr: number[], answered: Array<IWordData>, isAnswered: boolean | null, image: string, originalWord: string, transcription: string, translate: string, isStarted: boolean | null, savedAudioUrl: string,  nextCallQuestion: Function, playAudio: any, chooseCorrectAnswer: any, getNextWords: Function, getImage: any, setStart: any, getWordAudio: any, randomArrayShuffle: Function, category: number, page: number, setStateForRound: any, setCurrentWord: Function, setCategory: Function, correctAnswers: Array<IwordResult>, incorrectAnswers: Array<IwordResult>,} = observable({
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

  setCategory: action((category: number): void => {
    audiocallState.category = category;
    audiocallState.setStateForRound()
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
            console.log(toJS(audiocallState.words));
      }
    })
  }),

  nextCallQuestion: action(() => {
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
    console.log(audiocallState.correctAnswers)
    if ( audiocallState.counter < 10) {
      setTimeout(() => {
        audiocallState.playAudio()
      })
    }
  }),

  playAudio: action(() => {
    new Promise((resolve, reject) => {
      resolve(audiocallState.getWordAudio(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio))
    })
  }),

  chooseCorrectAnswer: action((e: React.MouseEvent): void => {
    let target = e.target as HTMLButtonElement
    audiocallState.getImage(audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].image)
    audiocallState.originalWord = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].word
    audiocallState.transcription = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].transcription
    audiocallState.translate = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate
    audiocallState.savedAudioUrl = audiocallState.answered[audiocallState.answersArr[audiocallState.randomAnsw]].audio

    if (target.innerHTML === audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate) {
      console.log('right answer')
      console.log(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].word, audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].transcription, audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate, audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio)
      audiocallState.correctAnswers.push({
        word: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].word,
        transcription: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].transcription,
        wordTranslate: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate,
        audio: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio
      })
      console.log(toJS(audiocallState.correctAnswers))
      var filtered = audiocallState.answered.filter((el) => { return el.word !== audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].word; })
      audiocallState.answered = filtered
      audiocallState.words = filtered
    } else {
      audiocallState.incorrectAnswers.push({
        word: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].word,
        transcription: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].transcription,
        wordTranslate: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate,
        audio: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio
      })
    }

    audiocallState.isAnswered = true
  }),

  getNextWords: action(() => {
    let wordsArr: any = audiocallState.randomArrayShuffle(audiocallState.words)
    let questionAnswers: any = audiocallState.randomArrayShuffle(Array.from(Array(20).keys())).slice(0,5)
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

  getImage: action((url: string) => {
    new Promise((resolve, reject) => {
      resolve(fetch(`https://vismmax-rslang.herokuapp.com/${url}`))
    }).then(action((response: any) => {
      audiocallState.image = response.url
    }))
  }),

  setStart: action(() => {
    ReactDOM.render(
      <CreateAudioCallGame />,
      document.getElementById('audio-call')
    );
    audiocallState.isStarted = true
    audiocallState.getNextWords()
    setTimeout(() => {
        audiocallState.getWordAudio(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio)
        }, 500)
  }),

  getWordAudio: action( (url: string) => {
    const context = new AudioContext();
    let audio: any

    const URL = `https://vismmax-rslang.herokuapp.com/${url}`;

    window.fetch(URL)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        audio = audioBuffer;
      });

    function play(audioBuffer: AudioBuffer) {
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start();
    }

    setTimeout(() => {
      play(audio)
    }, 100)
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