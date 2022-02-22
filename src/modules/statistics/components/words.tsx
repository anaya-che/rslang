import React from 'react';
import { IDailyWordsStatistic } from '../../../utils/interfaces';

export const WordsStat: React.FC<{ data: IDailyWordsStatistic }> = (data) => {
  return (
    <section>
      <h3>Статистика по словам</h3>
      <div>Новых слов:  <span>{data.data.newWords}</span></div>
      <div>Изученных слов:  <span>{data.data.learnedWords}</span></div>
      <div>Процент правильных ответов:  <span>{data.data.percentOfAnswers}%</span></div>
    </section>
  );
};
