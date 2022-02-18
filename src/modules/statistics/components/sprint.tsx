import React from 'react';
import { IPageStatistic } from '../../../utils/interfaces';

export const SprintStat: React.FC<{ data: IPageStatistic }> = (data) => {
  return (
    <div>
      <h3>Спринт</h3>
      <div>Новых слов: {data.data.newWords}</div>
      <div>Изученных слов: {data.data.learnedWords}</div>
      <div>Процент правильных ответов: {data.data.percentOfAnswers}</div>
    </div>
  );
};
