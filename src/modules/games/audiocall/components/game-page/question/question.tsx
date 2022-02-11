import './question.scss'
import { audiocallState } from "../../../../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';
import React from 'react';

export const CreateAudioCallQuestion = observer(()=> {

  function handleAnswerButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    return !audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer(e) : () => null
  }

  const firstBtn = React.useRef<HTMLButtonElement>(null)
  const secBtn = React.useRef<HTMLButtonElement>(null)
  const thirdBtn = React.useRef<HTMLButtonElement>(null)
  const fourthBtn = React.useRef<HTMLButtonElement>(null)
  const fifthBtn = React.useRef<HTMLButtonElement>(null)

  function handlePress(event: KeyboardEvent) {
    if (event.key === '1') {
      if (null !== firstBtn.current) {
        firstBtn.current.click()
      }
    } else if (event.key === '2') {
      if (null !== secBtn.current) {
        secBtn.current.click()
      }
    } else if (event.key === '3') {
      if (null !== thirdBtn.current) {
        thirdBtn.current.click()
      }
    } else if (event.key === '4') {
      if (null !== fourthBtn.current) {
        fourthBtn.current.click()
      }
    } else if (event.key === '5') {
      if (null !== fifthBtn.current) {
        fifthBtn.current.click()
      }
    }
    document.removeEventListener('keydown', handlePress)
  }

  document.addEventListener('keydown', handlePress)

    return (
    <div>
      <div className="play-audio">
        { !audiocallState.isAnswered ? <button onClick={() => {audiocallState.playAudio()}}>Sound</button> : null}
      </div>
      <div>
        <ul className='audio-answer'>
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