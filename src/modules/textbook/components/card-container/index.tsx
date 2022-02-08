import React from 'react';
import { IWordData } from '../../../../utils/interfaces';
import { Card } from '../card';
import style from './card-container.module.scss';

export const CardContainer: React.FC<{ wordsCollection: IWordData[] }> = ({
  wordsCollection,
}) => {
  return (
    <div className={style.cardContainer}>
      {wordsCollection.map((el: any) => (
        <Card wordInfo={el} key={el.id}></Card>
      ))}
    </div>
  );
};
