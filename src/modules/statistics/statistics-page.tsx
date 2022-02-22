import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
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
    <div className={style.statisticPage}>
      <Header />
      <div className={style.statisticWrapper}>
        <h1>Статистика</h1>
        <h2>Статистика за день</h2>
        <section className={style.statTodayContainer}>
          <WordsStat data={statisticsState.todayWordsStatistics} />
          <AudiocallStat data={statisticsState.todayAudiocallStatistics} />
          <SprintStat data={statisticsState.todaySprintStatistics} />
        </section>
        <h2>Долгосрочная статистика</h2>
        <section className={style.statLongContainer}>
          {longTermState.isTrue ? <Chart/> : null}
        </section>
      </div>
      <Footer />
    </div>
  );
});
