import React from 'react';
import { audiocallState} from "./../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';

export const  AudiocallPage = observer(()=> {

  return <div id='audio-game'>Audiocall Page
      {!audiocallState.isStarted ?

      <><button onClick={audiocallState.words.length > 0 ? audiocallState.setStart : () => {
        audiocallState.setCategory(0)
        setTimeout(() => {
          audiocallState.setStart()
        }, 400)
      }}>Start</button><div>
        <p>Категории слов</p>
        <button onClick={() => audiocallState.setCategory(0)}>0</button>
        <button onClick={() => audiocallState.setCategory(1)}>1</button>
        <button onClick={() => audiocallState.setCategory(2)}>2</button>
        <button onClick={() => audiocallState.setCategory(3)}>3</button>
        <button onClick={() => audiocallState.setCategory(4)}>4</button>
        <button onClick={() => audiocallState.setCategory(5)}>5</button>
        </div></>
      : null}
      <div id='audio-call'>
      </div>
    </div>

})
