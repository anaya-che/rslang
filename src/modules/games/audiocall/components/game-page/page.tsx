import React, { useEffect } from "react";
import { CreateAudioCallQuestion } from "./question/question";
import { Answer } from "./right-answer/answer"
import { AudioResult } from "./result-page/result"
import { audiocallState } from "../../../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';

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
          {audiocallState.counter < 11 ? <CreateAudioCallQuestion/> : null }
          {audiocallState.counter > 10 ? <AudioResult/> : null}
        </div>
        {audiocallState.counter < 11 ?
        <div>
          <button className='next-call' ref={nextBtn} onClick={handleNext}>{!audiocallState.isAnswered ? 'I don`t know' : 'Next'}</button>
        </div>: null}
      </div>
    )
})
