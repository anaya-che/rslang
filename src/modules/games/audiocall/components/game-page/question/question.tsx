import { audiocallState } from "../../../../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';
import React from 'react';
import { handleAnswersKeyPress } from '../../../../../../utils/audiocall-helpers';
import style from './question.module.scss';

export const CreateAudioCallQuestion = observer(()=> {

  function handleAnswerButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    return !audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer(e) : () => null
  }

  function handleStyle(val: number) {
    return (audiocallState.isAnswered && audiocallState.lastAnswer && audiocallState.randomAnsw === val ? style.true : (!audiocallState.isAnswered ? style.answerBtn : style.false ? (audiocallState.isAnswered && !audiocallState.lastAnswer && audiocallState.randomAnsw === val ? style.true : style.false) : style.false))
  }

  const firstBtn = React.useRef<HTMLButtonElement>(null)
  const secBtn = React.useRef<HTMLButtonElement>(null)
  const thirdBtn = React.useRef<HTMLButtonElement>(null)
  const fourthBtn = React.useRef<HTMLButtonElement>(null)
  const fifthBtn = React.useRef<HTMLButtonElement>(null)

  document.addEventListener('keydown', (event) => handleAnswersKeyPress(event, firstBtn, secBtn, thirdBtn, fourthBtn, fifthBtn, handleAnswersKeyPress))

    return (
    <div>
      { !audiocallState.isAnswered ?
      <div className={style.audioContainer}>
         <button className={style.audioBtn} onClick={() => {audiocallState.playAudio()}}></button>
      </div> : null}
      <div className={style.answersWrapper}>
        <ul className={style.audioAnswer}>
          <button className={handleStyle(0)} ref={firstBtn} onClick={(e) => handleAnswerButton(e)}>{audiocallState.first}</button>
          <button className={handleStyle(1)} ref={secBtn} onClick={(e) => handleAnswerButton(e)}>{audiocallState.second}</button>
          <button className={handleStyle(2)} ref={thirdBtn} onClick={(e) => handleAnswerButton(e)}>{audiocallState.third}</button>
          <button className={handleStyle(3)} ref={fourthBtn} onClick={(e) => handleAnswerButton(e)}>{audiocallState.fourth}</button>
          <button className={handleStyle(4)} ref={fifthBtn} onClick={(e) => handleAnswerButton(e)}>{audiocallState.fifth}</button>
        </ul>
      </div>
    </div>
    )
})