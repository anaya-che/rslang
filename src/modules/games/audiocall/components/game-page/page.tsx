import React, { useEffect } from "react";
import { CreateAudioCallQuestion } from "./question/question";
import { Answer } from "./right-answer/answer"
import { AudioResult } from "./result-page/result"
import { audiocallState } from "../../../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';
import style from './page.module.scss'

export const  CreateAudioCallGame = observer(() => {

  const nextBtn = React.useRef<HTMLButtonElement>(null)

  useEffect(()=>{
    function handlePress(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        if (null !== nextBtn.current) {
          nextBtn.current.click()
        }
      }
    }
    document.addEventListener('keydown', handlePress)
  }, [])

  function handleNext(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    return !audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer(e) : audiocallState.nextCallQuestion(e)
  }

    return (
      <div>
        <div>
          {audiocallState.isAnswered === true ? <Answer/> : null}
          {audiocallState.counter < audiocallState.counterConditionValue ? <CreateAudioCallQuestion/> : null }
          {audiocallState.counter > (audiocallState.counterConditionValue -1) ? <AudioResult/> : null}
        </div>
        {audiocallState.counter < audiocallState.counterConditionValue ?
        <div className={style.nextBtnContainer}>
          <button  className={!audiocallState.isAnswered ? style.false : style.next} ref={nextBtn} onClick={handleNext}>{!audiocallState.isAnswered ? 'Не знаю' : `→`}</button>
        </div>: null}
      </div>
    )
})
