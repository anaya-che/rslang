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
import { longTermState } from "../../../../store/long-term-state";

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

  return (
    <Line
    data={longTermState.lineChartData}
    options={{
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 3,
      scales: {
        y: {
            position: 'left',
            type: 'linear',
            beginAtZero: true,
        },
      },
      plugins: {
          legend: {
           display: true,
               position:'bottom',
               labels:{
                  padding: 40
               },
            },
          }
       }}
    />
  );
})