import React from 'react';
import { audiocallState } from "./../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';
import { CreateAudioCallGame } from './components/game-page/page';
import { useHistory } from 'react-router-dom';

export const  AudiocallPage = observer(()=> {

  const history = useHistory();

  async function handleStart (category: number) {
    await audiocallState.setCategory(category)
    audiocallState.counterConditionValue = 11
    audiocallState.setStart()
  }

  function goToMainPage() {
    history.push("/");
    audiocallState.setDefault()
  }

  return <div id='audio-game'>Audiocall Page
  <button onClick={goToMainPage}>Main</button>
      {!audiocallState.isStarted ?

      <><button onClick={audiocallState.words.length > 0 ? () => {audiocallState.setStart()} : () => handleStart(0)}>Start</button><div>
        <p>Категории слов</p>
        <button onClick={() => handleStart(0)}>1</button>
        <button onClick={() => handleStart(1)}>2</button>
        <button onClick={() => handleStart(2)}>3</button>
        <button onClick={() => handleStart(3)}>4</button>
        <button onClick={() => handleStart(4)}>5</button>
        <button onClick={() => handleStart(5)}>6</button>
        </div></>
      : null}
      <div id='audio-call'>
        {audiocallState.isStarted ? <CreateAudioCallGame /> : null}
      </div>
    </div>

})
