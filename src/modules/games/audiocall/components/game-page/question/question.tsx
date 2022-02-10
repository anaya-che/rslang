import './question.scss'
import { audiocallState } from "../../../../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';

export const CreateAudioCallQuestion = observer(()=> {

    return (
    <div>
      <div className="play-audio">
        { !audiocallState.isAnswered ? <button  onClick={audiocallState.playAudio}>Sound</button> : null}
      </div>
      <div>
        <ul className='audio-answer'>
          <button onClick={!audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer : () => null}>{audiocallState.first}</button>
          <button onClick={!audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer : () => null}>{audiocallState.second}</button>
          <button onClick={!audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer : () => null}>{audiocallState.third}</button>
          <button onClick={!audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer : () => null}>{audiocallState.fourth}</button>
          <button onClick={!audiocallState.isAnswered ? audiocallState.chooseCorrectAnswer : () => null}>{audiocallState.fifth}</button>
        </ul>
      </div>
    </div>
    )
})