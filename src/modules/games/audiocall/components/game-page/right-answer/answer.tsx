import { audiocallState } from "../../../../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';

export const Answer = observer(()=> {

    return(
      <div>
        <div>
          <img src={`${audiocallState.image}`} alt="" />
        </div>
        <div>
          <button onClick={async () => {
              await audiocallState.getWordAudio(audiocallState.savedAudioUrl)
            }}>sound button</button>
          <div>
            <p>{audiocallState.originalWord}</p>
            <p>{audiocallState.transcription}</p>
            <p>{audiocallState.translate}</p>
          </div>
        </div>
      </div>
    )
})