import React from 'react';
import { textbookState } from '../../../../store';
import { IWordData } from '../../../../utils/interfaces';
import { Card } from '../card';
import style from './card-container.module.scss';

export const CardContainer: React.FC<{
  wordsCollection: IWordData[];
}> = ({ wordsCollection }) => {
  return (
    <div className={style.cardContainer}>
      {textbookState.isAuthorized
        ? wordsCollection.map((el: IWordData) => (
            <Card wordInfo={el} key={el._id}></Card>
          ))
        : wordsCollection.map((el: IWordData) => (
            <Card wordInfo={el} key={el.id}></Card>
          ))}
    </div>
  );
};
