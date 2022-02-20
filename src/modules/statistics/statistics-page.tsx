import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { longTermState } from '../../store/long-term-state';
import { statisticsState } from '../../store/statistics-state';
import { AudiocallStat, SprintStat, WordsStat } from './components';
import { Chart } from './components/long-term-statistics/chart';
import style from './statistics.module.scss';

export const StatisticsPage = observer(() => {
  useEffect(() => {
    longTermState.setChartData()
  }, [])

  return (
    <div>
      <div onClick={longTermState.setDefault}>
        <Link to="/">Главная страница</Link>
      </div>
      <h1>Статистика</h1>
      <h2>Статистика за день</h2>
      <WordsStat data={statisticsState.todayWordsStatistics} />
      <AudiocallStat data={statisticsState.todayAudiocallStatistics} />
      <SprintStat data={statisticsState.todaySprintStatistics} />
      {longTermState.isTrue ? <Chart/> : null}
    </div>
  );
});
