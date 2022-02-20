import { observable, action, toJS } from 'mobx';
import { getWords, wordsStore } from './words-store';
import { IWordData } from '../utils/interfaces/words'
import { baseUrl } from '../api/consts'
import { IaudiocallStat } from '../utils/interfaces/audiocall';
import { textbookState, userState } from '../store/index';
import { playAnswerAudio } from '../utils/audiocall-helpers';
import { userWordsStore } from './words-store'
import { getUserAggregatedWords } from '../api';
import { statisticsState } from './statistics-state';
import { getLearnedWords } from '../utils/statistics-helpers/learned-words';
import { isNewWord } from '../utils/statistics-helpers/new-words';

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
  statisticsWordsID: [],
  todayDate: new Date().toLocaleString('en-GB', { dateStyle: 'short'}),
  amountOfGames: 0,
  bestSeries: 0,
  wins: 0,
  mistakes: 0,
  learnedWordsId: [],
  seriesCounter: [],
  aggregatedWords: [],
  isStartedFromTextBook: false,
  counterConditionValue: 0,
  amountOfRemainingWords: 0,
  amountOfNewWords: 0,

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

  nextCallQuestion: action( async () => {
    if (!audiocallState.amountOfRemainingWords) {
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
    } else if (audiocallState.amountOfRemainingWords > 0) {
      let dynamicAnswer = audiocallState.counter - 1
      let answersArr = [dynamicAnswer, -1, -2, -3, -4]
      let questionAnswers: Array<number> = audiocallState.randomArrayShuffle(answersArr)
      questionAnswers.map((el, index) => el >= 0 ? audiocallState.randomAnsw = index : null)
      const proxy = new Proxy(audiocallState.words, {
        get(target, prop: number | string | symbol) {
            if (!isNaN(Number(prop))) {

                prop = parseInt(String(prop), 10);
                if (prop < 0) {
                    prop += target.length;
                }
            }
            return target[Number(prop)];
        }
      });
      audiocallState.counter = audiocallState.counter + 1
      audiocallState.first = proxy[questionAnswers[0]].wordTranslate
      audiocallState.second = proxy[questionAnswers[1]].wordTranslate
      audiocallState.third = proxy[questionAnswers[2]].wordTranslate
      audiocallState.fourth = proxy[questionAnswers[3]].wordTranslate
      audiocallState.fifth = proxy[questionAnswers[4]].wordTranslate
      audiocallState.answersArr = questionAnswers
      audiocallState.isAnswered = false
    }
    if ( audiocallState.counter < audiocallState.counterConditionValue) {
      audiocallState.playAudio()
    } else if ( audiocallState.counter === audiocallState.counterConditionValue) {
      audiocallState.isStartedFromTextBook = false
      audiocallState.amountOfGames = audiocallState.amountOfGames +  1
      audiocallState.bestSeries = Math.max(...Array.from(audiocallState.seriesCounter.join("").matchAll(/(.)\1+/g), m=>m[0].length))
      audiocallState.mistakes = audiocallState.seriesCounter.filter(x => x === 0).length
      audiocallState.wins = audiocallState.seriesCounter.filter(x => x === 1).length
      if (textbookState.isAuthorized) {
        let easyWords = await getLearnedWords(audiocallState.statisticsWordsID)
        await statisticsState.updateStatistics(audiocallState.todayDate, "audiocall", {gamesCount: 1,
          newWords: audiocallState.amountOfNewWords,
          bestSeries: audiocallState.bestSeries,
          totalWins: audiocallState.wins,
          totalMistakes: audiocallState.mistakes,
          learnedWordsId: easyWords
        })
      }
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
    if (isNewWord(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]])) {
      audiocallState.amountOfNewWords = audiocallState.amountOfNewWords + 1
    }
    if (target.innerHTML === audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate) {
      playAnswerAudio(`../../right.mp3`);
      const wordId = audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].id as string
      audiocallState.statisticsWordsID.push(wordId)
      if (textbookState.isAuthorized) {
        await userWordsStore.changeUserWordFromGame(wordId, true)
      }
      audiocallState.correctAnswers.push({
        word: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].word,
        transcription: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].transcription,
        wordTranslate: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].wordTranslate,
        audio: audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio
      })
      audiocallState.seriesCounter.push(1)
    } else {
      playAnswerAudio(`../../mistake.mp3`);
      const wordId = audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].id as string
      audiocallState.statisticsWordsID.push(wordId)
      if (textbookState.isAuthorized) {
        await userWordsStore.changeUserWordFromGame(wordId, false)
      }
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
    let wordsArr: Array<IWordData>
    let questionAnswers: Array<number>

    if (!audiocallState.amountOfRemainingWords) {
      wordsArr = audiocallState.randomArrayShuffle(audiocallState.words)
      wordsArr = toJS(wordsArr)
      questionAnswers = audiocallState.randomArrayShuffle(Array.from(Array(wordsArr.length).keys())).slice(0,5)
      audiocallState.words = wordsArr
      audiocallState.first = wordsArr[questionAnswers[0]].wordTranslate
      audiocallState.second = wordsArr[questionAnswers[1]].wordTranslate
      audiocallState.third = wordsArr[questionAnswers[2]].wordTranslate
      audiocallState.fourth = wordsArr[questionAnswers[3]].wordTranslate
      audiocallState.fifth = wordsArr[questionAnswers[4]].wordTranslate
      audiocallState.answersArr = questionAnswers
      audiocallState.answered = wordsArr
    } else if (audiocallState.amountOfRemainingWords > 0) {

      wordsArr = audiocallState.words
      wordsArr = toJS(wordsArr)
      let dynamicAnswer = audiocallState.counter - 1
      let arr = [dynamicAnswer, -1, -2, -3, -4]
      questionAnswers = audiocallState.randomArrayShuffle(arr)
      questionAnswers.map((el, index) => el >= 0 ? audiocallState.randomAnsw = index : null)
      const proxy = new Proxy(wordsArr, {
        get(target, prop:  number | string | symbol) {
            if (!isNaN(Number(prop))) {
                prop = parseInt(String(prop), 10);
                if (prop < 0) {
                    prop += target.length;
                }
            }
            return target[Number(prop)];
        }
      });
      audiocallState.first = proxy[questionAnswers[0]].wordTranslate
      audiocallState.second = proxy[questionAnswers[1]].wordTranslate
      audiocallState.third = proxy[questionAnswers[2]].wordTranslate
      audiocallState.fourth = proxy[questionAnswers[3]].wordTranslate
      audiocallState.fifth = proxy[questionAnswers[4]].wordTranslate
      audiocallState.answersArr = questionAnswers
      audiocallState.answered = wordsArr
    }
    audiocallState.isStarted = true
  }),

  setStart: action(async () => {
  audiocallState.seriesCounter = []
   audiocallState.isStarted = true
   if (audiocallState.counterConditionValue > 1) {
    audiocallState.getNextWords()
    audiocallState.getWordAudio(audiocallState.words[audiocallState.answersArr[audiocallState.randomAnsw]].audio)
   }
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
    audiocallState.isStartedFromTextBook = true
    if (audiocallState.category !== 6) {
      await getWords(audiocallState.category, audiocallState.page);
      audiocallState.setCurrentWord()
      if (textbookState.isAuthorized) {
        await audiocallState.getFilteredWords()
      } else if (!textbookState.isAuthorized) {
        audiocallState.counterConditionValue = 11
      }
    } else if (audiocallState.category === 6) {
      if (textbookState.difficultWords.length > 4 && textbookState.difficultWords.length < 21) {
        let copy = textbookState.difficultWords.slice(0,15)
        if (copy.length > 14) {
          audiocallState.counterConditionValue = 11
        } else {
          audiocallState.counterConditionValue = copy.length - 5 + 1
        }
        audiocallState.setAggWords(toJS(copy))
      } else if (textbookState.difficultWords.length > 20) {
        let start = audiocallState.page * 20
        let end = 20 + (audiocallState.page * 20)
        let copy = toJS(textbookState.difficultWords.slice(start,end))
        if (copy.length < 15) {
          let delta = 15 - copy.length
          let reserve = textbookState.difficultWords.slice((audiocallState.page - 1) * 20, 20 + ((audiocallState.page - 1) * 20))
          reserve = reserve.slice(0, delta)
          let final = copy.concat(reserve)
          audiocallState.counterConditionValue = 11
          audiocallState.setAggWords(toJS(final))
        } else {
          audiocallState.setAggWords(toJS(copy))
          audiocallState.counterConditionValue = 11
        }
      } else if ( textbookState.difficultWords.length < 5 && textbookState.difficultWords.length > 0) {
        audiocallState.amountOfRemainingWords = textbookState.difficultWords.length
        audiocallState.counterConditionValue = textbookState.difficultWords.length + 1
        let somewords = await getUserAggregatedWords(userState.tokenInfo.userId, '4', `{"$and": [{"group":${getRandomInt(0,4)}},{"page":${getRandomInt(0,20)}}]}`)
        let result = textbookState.difficultWords.concat(somewords)
        audiocallState.setAggWords(toJS(result))
      } else if (textbookState.difficultWords.length === 0) {
        audiocallState.counterConditionValue = 1
        audiocallState.counter = 1
      }
    }
    audiocallState.setStart()
  }),

  getFilteredWords: action( async() => {
    audiocallState.aggregatedWords = await getUserAggregatedWords(userState.tokenInfo.userId, '20', `{"$and": [{"group":${audiocallState.category}},{"page":${audiocallState.page}},{"$or":[{"userWord.difficulty":"difficult"},{"userWord":null},{"userWord.difficulty":"normal"}]}]}`)
    let pageCount = audiocallState.page
    let final: IWordData[]
    let sliced
    let copy
    let delta
    let reserve
    audiocallState.counterConditionValue = 11
    if (audiocallState.aggregatedWords.length >= 15) {
      audiocallState.setAggWords(toJS(audiocallState.aggregatedWords))
    }
    while (audiocallState.aggregatedWords.length < 15) {
      pageCount -= 1
      reserve =  await getUserAggregatedWords(userState.tokenInfo.userId, '20', `{"$and": [{"group":${audiocallState.category}},{"page":${pageCount}},{"$or":[{"userWord.difficulty":"difficult"},{"userWord":null},{"userWord.difficulty":"normal"}]}]}`)
      delta = 15 - audiocallState.aggregatedWords.length
      sliced = toJS(reserve.slice(0, delta))
      copy = toJS(audiocallState.aggregatedWords)
      final = copy.concat(sliced)
      if (sliced.length < delta && pageCount > 0) {
        audiocallState.aggregatedWords = [...audiocallState.aggregatedWords, ...sliced]
        continue
        } else if (pageCount === 0 && sliced.length < delta) {
          if (final.length < 5 && final.length > 0) {
            audiocallState.amountOfRemainingWords = final.length
            audiocallState.counterConditionValue = final.length + 1
            let somewords = await getUserAggregatedWords(userState.tokenInfo.userId, '4', `{"$and": [{"group":${getRandomInt(0,4)}},{"page":${getRandomInt(0,20)}}]}`)
            let result = final.concat(somewords)
            audiocallState.setAggWords(toJS(result))
          } else if (final.length === 0) {
            audiocallState.counterConditionValue = 1
            audiocallState.counter = 1
          } else {
            audiocallState.setAggWords(final)
            audiocallState.counterConditionValue = final.length - 5 + 1
          }
        break
      } else if (sliced.length === delta && pageCount > 0) {
        audiocallState.setAggWords(final)
        audiocallState.counterConditionValue = 11
        break
      } else if (sliced.length === delta && pageCount === 0) {
        audiocallState.setAggWords(final)
        audiocallState.counterConditionValue = 11
        break
      }
    }
  }),

  setAggWords: action( (arr: IWordData[])=> {
    audiocallState.words = arr
  })

});

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}