// import style from './style.module.scss';
import React from 'react';
import { baseUrl } from '../../../../api/consts';
import { IWordData } from '../../../../utils/interfaces';
import { playAudio } from './audio';
import style from './card.module.scss';

export const Card: React.FC<{ wordInfo: IWordData }> = ({ wordInfo }: any) => {
  const textMeaning = { __html: `${wordInfo.textMeaning}` };
  const textExample = { __html: `${wordInfo.textExample}` };
  return (
    <div className={style.card}>
      <div className={style.wordContainer}>
        <img
          className={style.wordImg}
          src={baseUrl + wordInfo.image}
          alt={wordInfo.word}
          width="250px"
          height="200px"
        />
        <div className={style.wordInfo}>
          <div>{wordInfo.word}</div>
          <div>{wordInfo.transcription}</div>
          <div>{wordInfo.wordTranslate}</div>
          <div
            className={style.playButton}
            id="play-word-translation"
            onClick={() =>
              playAudio(
                baseUrl + wordInfo.audio,
                baseUrl + wordInfo.audioMeaning,
                baseUrl + wordInfo.audioExample
              )
            }
          ></div>
        </div>
      </div>
      <div className={style.meaningInfo}>
        <div
          className="text-meaning"
          dangerouslySetInnerHTML={textMeaning}
        ></div>
        <div>{wordInfo.textMeaningTranslate}</div>
      </div>
      <div className={style.exampleInfo}>
        <div
          className="text-example"
          dangerouslySetInnerHTML={textExample}
        ></div>
        <div>{wordInfo.textExampleTranslate}</div>
      </div>
    </div>
  );
};
