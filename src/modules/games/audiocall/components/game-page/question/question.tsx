import './question.scss'
import { audiocallState } from "../../../../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';

export const CreateAudioCallQuestion = observer(()=> {

  function handleAnswerButton(e: any) {
    return !audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer(e) : () => null
  }

    return (
    <div>
      <div className="play-audio">
        { !audiocallState.isAnswered ? <button onClick={audiocallState.playAudio}>Sound</button> : null}
      </div>
      <div>
        <ul className='audio-answer'>
          <button onClick={(e) => handleAnswerButton(e)}>{audiocallState.first}</button>
          <button onClick={(e) => handleAnswerButton(e)}>{audiocallState.second}</button>
          <button onClick={(e) => handleAnswerButton(e)}>{audiocallState.third}</button>
          <button onClick={(e) => handleAnswerButton(e)}>{audiocallState.fourth}</button>
          <button onClick={(e) => handleAnswerButton(e)}>{audiocallState.fifth}</button>
        </ul>
      </div>
    </div>
    )
})