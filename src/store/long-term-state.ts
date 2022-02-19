import { action } from "mobx/dist/api/action";
import { observable } from "mobx/dist/api/observable";
import { toJS } from "mobx/dist/api/tojs";
import { asdI } from "../utils/interfaces/long-term";
import { statisticsState } from "./statistics-state";


export const longTermState = observable({
  lineChartData: [] as asdI,

  asd: action(()=> {
    let date_regex = /^\d{2}\/\d{2}\/\d{4}$/ ;
    let statistics = toJS(statisticsState.statistics)
    let learnedWords = []
    let newWords = []
    let dates: Array<string> = []
    let keys = Object.keys(statistics);
    let dayLearned
    let dayNew
    for (let i = 0; i < keys.length; ++i) {
      dayLearned = statistics[keys[i]]['audiocall'].learnedWordsId.length + statistics[keys[i]]['sprint'].learnedWordsId.length
      dayNew = statistics[keys[i]]['audiocall'].newWords + statistics[keys[i]]['sprint'].newWords
      newWords.push(dayNew)
      learnedWords.push(dayLearned)
    }

  Object.keys(statistics).forEach(key => {
    if (date_regex.test(key)) {
      dates.push(key)
    }
  })

  let asd = {
    labels: dates,
    datasets: [
      {
        data: newWords,
        label: "Изученных слов",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
        lineTension: 0
      },
      {
        data: learnedWords,
        label: "Новых слов ",
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: true,
        lineTension: 0
      }
    ]
  };
  longTermState.lineChartData = asd
  })

})