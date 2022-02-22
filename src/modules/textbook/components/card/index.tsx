import React from 'react';
import { baseUrl } from '../../../../api/consts';
import { textbookState, userState } from '../../../../store';
import { IWordData } from '../../../../utils/interfaces';
import { playAudio } from '../../../../utils/textbook-helpers/audio';
import style from './card.module.scss';

export const Card: React.FC<{ wordInfo: IWordData; cardStyle: string }> = ({
  wordInfo,
  cardStyle,
}) => {
  const textMeaning = { __html: `${wordInfo.textMeaning}` };
  const textExample = { __html: `${wordInfo.textExample}` };
  const urlImage = `${baseUrl + wordInfo.image}`;
  const currentStyle =
    wordInfo.userWord?.difficulty === 'easy' ? 'learnedCard' : cardStyle;

  return (
    <div className={style.card + ' ' + style[currentStyle]}>
      <div
        className={style.imageContainer + ' ' + style[currentStyle]}
        style={{ backgroundImage: `url(${urlImage})` }}
      >
        <div className={style.cardWrapper}>
          {userState.isAuthorized && (
            <div className={style.cardButtons}>
              <>
                <div
                  className={
                    wordInfo.userWord?.difficulty === 'difficult'
                      ? style.active + ' ' + style.difficultWord
                      : style.difficultWord
                  }
                  onClick={() => {
                    textbookState.changeDifficulty(wordInfo.id, 'difficult');
                  }}
                ></div>

                <div
                  className={style.easyWord}
                  onClick={() => {
                    textbookState.changeDifficulty(wordInfo.id, 'easy');
                  }}
                ></div>
              </>
            </div>
          )}
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
      </div>

      <div className={style.textWrapper}>
        <div className={style.textContainer}>
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
          {userState.isAuthorized &&
            wordInfo.userWord &&
            (wordInfo.userWord?.optional.mistakes !== 0 ||
              wordInfo.userWord?.optional.wins !== 0) && (
              <div className={style.wordGameInfo}>
                угадано: {wordInfo.userWord?.optional.wins} / ошибок:{' '}
                {wordInfo.userWord?.optional.mistakes}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
