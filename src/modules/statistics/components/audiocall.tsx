import React from 'react';
import { IDailyGameStatistic } from '../../../utils/interfaces';

export const AudiocallStat: React.FC<{ data: IDailyGameStatistic }> = (data) => {
  return (
    <div>
      <h3>Аудиовызов</h3>
      <div>Новых слов: {data.data.newWords}</div>
      <div>Процент правильных ответов: {data.data.percentOfAnswers}</div>
      <div>Лучшая серия правильных ответов: {data.data.bestSeries}</div>
    </div>
  );
};
