import React from "react";
import { CreateAudioCallQuestion } from "./question/question";
import { Answer } from "./right-answer/answer"
import { AudioResult } from "./result-page/result"
import { audiocallState } from "../../../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';

export const  CreateAudioCallGame = observer(() => {

    return (
      <div>
        <div>
          {audiocallState.isAnswered === true ? <Answer/> : null}
          {audiocallState.counter < 11 ?
           <CreateAudioCallQuestion/> : null }
          {audiocallState.counter > 10 ? <AudioResult/> : null}
        </div>
        {audiocallState.counter < 11 ?
        <div>
          <button className='next-call' onClick={!audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer : audiocallState.nextCallQuestion}>{!audiocallState.isAnswered ? 'I don`t know' : 'Next'}</button>
        </div>: null}
      </div>
    )
})