import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { statisticsState } from '../../store/statistics-state';
import { AudiocallStat, SprintStat, WordsStat } from './components';
import LongTermState from './components/long-term-statistics/long-term-statistics';
import style from './statistics.module.scss';

export const StatisticsPage = observer(() => {
  return (
    <div>
      <div>
        <Link to="/">Главная страница</Link>
      </div>
      <h1>Статистика</h1>
      <h2>Статистика за день</h2>
      <WordsStat data={statisticsState.todayWordsStatistics} />
      <AudiocallStat data={statisticsState.todayAudiocallStatistics} />
      <SprintStat data={statisticsState.todaySprintStatistics} />
      <LongTermState />
    </div>
  );
});
