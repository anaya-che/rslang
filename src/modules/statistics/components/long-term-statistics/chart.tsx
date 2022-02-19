import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { observer } from "mobx-react-lite";
import { statisticsState } from '../../../../store/statistics-state';
import { toJS } from "mobx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = observer(() => {

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

  const lineChartData = {
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

  return (
    <Line
    data={lineChartData}
    options={{
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 3,
       plugins: {
          legend: {
           display: true,
               position:'bottom',
               labels:{
                  padding: 40
               },
            },
          },
       }}
    />
  );
})