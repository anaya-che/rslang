import React from 'react';
import { IDailyGameStatistic } from '../../../utils/interfaces';

export const SprintStat: React.FC<{ data: IDailyGameStatistic }> = (data) => {
  return (
    <section>
      <h3>Спринт</h3>
      <div>Новых слов:  <span>{data.data.newWords}</span></div>
      <div>Процент правильных ответов:  <span>{data.data.percentOfAnswers}%</span></div>
      <div>Лучшая серия правильных ответов:  <span>{data.data.bestSeries}</span></div>
    </section>
  );
};
