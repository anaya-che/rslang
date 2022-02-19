import React from 'react';
import { textbookState } from '../../../../store';
import { IWordData } from '../../../../utils/interfaces';
import { Card } from '../card';
import style from './card-container.module.scss';

export const CardContainer: React.FC<{
  wordsCollection: IWordData[];
}> = ({ wordsCollection }) => {
  const pageFrom = textbookState.wordPage * 20;
  const pageTo = (textbookState.wordPage + 1) * 20;

  return (
    <div className={style.cardContainer}>
      {textbookState.wordGroup !== 6 ? (
        wordsCollection.map((el: IWordData) => (
          <Card wordInfo={el} key={el.id}></Card>
        ))
      ) : textbookState.wordGroup === 6 && wordsCollection.length === 0 ? (
        <div>Извините, здесь пока ничего нет</div>
      ) : (
        wordsCollection.map(
          (el: IWordData, index: number) =>
            index >= pageFrom &&
            index < pageTo && <Card wordInfo={el} key={el.id}></Card>
        )
      )}
    </div>
  );
};
