import React from 'react';
import { observer } from 'mobx-react-lite';
import { audiocallState } from "../../../../../../store/audiocall-state";
import style from "./result.module.scss"
import { getWords } from '../../../../../../store/words-store';


export const AudioResult = observer(()=> {


async function handlePlayAgain(e: any) {
  if (audiocallState.isSimpleGame) {
    audiocallState.setDefault()
    await getWords(audiocallState.category, audiocallState.page);
    audiocallState.setCurrentWord()
    audiocallState.setStart()
    audiocallState.setConditionValue(11)
  } else {
    audiocallState.setDefault()
    audiocallState.handleAudiocallStart(e)
  }
}

    return(
      <><h1 className={style.mainTitle}>Результаты</h1>
      <button onClick={(e) => handlePlayAgain(e)} className={style.playAgain}>Играть снова</button>
      <div className={style.resultWrapper && style.answersContainer}>
        <ul className={style.rightAnswList}>
          <div className={style.audioCorrect}>
            <p className={style.title}>Угадано правильно: {audiocallState.correctAnswers.length}</p>
            {audiocallState.correctAnswers.map((answer, index) => (<ul key={index} className={style.audioAnswer}>
              <li key={answer.word} className={style.liBtn}>{answer.word}</li>
              <li key={answer.transcription} className={style.liBtn}>{answer.transcription}</li>
              <li key={answer.wordTranslate} className={style.liBtn}>{answer.wordTranslate}</li>
              <li><button key={answer.audio} className={style.audioBtn} onClick={() => { audiocallState.getWordAudio(answer.audio); } }></button></li>
            </ul>))}
          </div>
        </ul>
        <ul className={style.mistakeAnswList}>
          <div className={style.audioCorrect}>
            <p className={style.title}>Угадано неправильно: {audiocallState.counterConditionValue - 1 - audiocallState.correctAnswers.length}</p>
            {audiocallState.incorrectAnswers.map((answer, index) => (<ul key={index} className={style.audioAnswer}>
              <li key={answer.word}  className={style.liBtn}>{answer.word}</li>
              <li key={answer.transcription}  className={style.liBtn}>{answer.transcription}</li>
              <li key={answer.wordTranslate}  className={style.liBtn}>{answer.wordTranslate}</li>
              <li><button key={answer.audio} className={style.audioBtn} onClick={() => { audiocallState.getWordAudio(answer.audio); } }></button></li>
            </ul>))}
          </div>
        </ul>
      </div></>
    )
})
