
import { observable, action, toJS } from "mobx";
import { IlineChart } from "../utils/interfaces/long-term";
import { statisticsState } from "./statistics-state";


export const longTermState = observable({
  lineChartData: [] as unknown as IlineChart,
  isTrue: false,
  compile: [] as unknown as IlineChart,
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
          label: "Новых слов",
          borderColor: '#f7cc7e',
          backgroundColor: '#fbe0b3',
          fill: true,
          lineTension: 0
        },
        {
          data: longTermState.learnedWords,
          label: "Изученных слов",
          borderColor: '#3c8f7d',
          backgroundColor: '#51bfa6',
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