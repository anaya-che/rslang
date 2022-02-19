
import { observable, action, toJS } from "mobx";
import { asdI } from "../utils/interfaces/long-term";
import { statisticsState } from "./statistics-state";


export const longTermState = observable({
  lineChartData: [] as unknown as asdI,
  isTrue: false,
  compile: [] as unknown as asdI,
  dates: [] as Array<string>,
  newWords: [] as Array<number>,
  learnedWords: [] as Array<number>,

  setChartData: action(()=> {
    setTimeout(action(()=> {
      let date_regex = /^\d{2}\/\d{2}\/\d{4}$/ ;
      let statistics = toJS(statisticsState.statistics)
      let keys = Object.keys(statistics);
      let dayLearned: number
      let dayNew: number
      for (let i = 0; i < keys.length; ++i) {
        dayLearned = statistics[keys[i]]['audiocall'].learnedWordsId.length + statistics[keys[i]]['sprint'].learnedWordsId.length
        dayNew = statistics[keys[i]]['audiocall'].newWords + statistics[keys[i]]['sprint'].newWords
        longTermState.newWords.push(dayNew)
        longTermState.learnedWords.push(dayLearned)
      }

      Object.keys(statistics).forEach(key => {
        if (date_regex.test(key)) {
          longTermState.dates.push(key)
        }
      })

    longTermState.setCompile()
    longTermState.lineChartData = longTermState.compile
    longTermState.isTrue = true;
    }), 450)
  }),

  setCompile: action(() => {
    longTermState.compile = {
      labels: longTermState.dates,
      datasets: [
        {
          data: longTermState.newWords,
          label: "Изученных слов",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          fill: true,
          lineTension: 0
        },
        {
          data: longTermState.learnedWords,
          label: "Новых слов",
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          fill: true,
          lineTension: 0
        }
      ]
    };
  }),

  setDefault: action (() => {
    longTermState.isTrue = false;
    longTermState.dates = []
    longTermState.newWords = []
    longTermState.learnedWords =[]
  })

})