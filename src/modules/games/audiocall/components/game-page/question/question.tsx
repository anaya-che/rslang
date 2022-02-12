import { audiocallState } from "../../../../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';
import React from 'react';
import { handleAnswersKeyPress } from '../../../../../../utils/audiocall-helpers';
import style from './question.module.scss';

export const CreateAudioCallQuestion = observer(()=> {

  function handleAnswerButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    return !audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer(e) : () => null
  }

  const firstBtn = React.useRef<HTMLButtonElement>(null)
  const secBtn = React.useRef<HTMLButtonElement>(null)
  const thirdBtn = React.useRef<HTMLButtonElement>(null)
  const fourthBtn = React.useRef<HTMLButtonElement>(null)
  const fifthBtn = React.useRef<HTMLButtonElement>(null)

  document.addEventListener('keydown', (event) => handleAnswersKeyPress(event, firstBtn, secBtn, thirdBtn, fourthBtn, fifthBtn, handleAnswersKeyPress))

    return (
    <div>
      <div className="play-audio">
        { !audiocallState.isAnswered ? <button onClick={() => {audiocallState.playAudio()}}>Sound</button> : null}
      </div>
      <div>
        <ul className={style.audioAnswer}>
          <button ref={firstBtn} onClick={(e) => handleAnswerButton(e)}>{audiocallState.first}</button>
          <button ref={secBtn} onClick={(e) => handleAnswerButton(e)}>{audiocallState.second}</button>
          <button ref={thirdBtn} onClick={(e) => handleAnswerButton(e)}>{audiocallState.third}</button>
          <button ref={fourthBtn} onClick={(e) => handleAnswerButton(e)}>{audiocallState.fourth}</button>
          <button ref={fifthBtn} onClick={(e) => handleAnswerButton(e)}>{audiocallState.fifth}</button>
        </ul>
      </div>
    </div>
    )
})