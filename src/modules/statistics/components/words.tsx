import React from 'react';
import { IPageStatistic } from '../../../utils/interfaces';

export const WordsStat: React.FC<{ data: IPageStatistic }> = (data) => {
  return (
    <div>
      <h3>Статистика по словам</h3>
      <div>Новых слов: {data.data.newWords}</div>
      <div>Изученных слов: {data.data.learnedWords}</div>
      <div>Процент правильных ответов: {data.data.percentOfAnswers}</div>
    </div>
  );
};
