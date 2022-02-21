import { audiocallState } from "../../../../../../store/audiocall-state";
import { observer } from 'mobx-react-lite';
import style from './answer.module.scss'

export const Answer = observer(()=> {

    return(
      <div className={style.answerWrapper}>
        <div>
          <img className={style.answerImg} src={`${audiocallState.image}`} alt="" />
        </div>
        <div>
          <button className={style.audioBtn} onClick={() => {
              audiocallState.getWordAudio(audiocallState.savedAudioUrl)
            }}></button>
          <div>
            <p className={style.answer}>{audiocallState.originalWord}</p>
            <p className={style.answer}>{audiocallState.transcription}</p>
            <p className={style.answer}>{audiocallState.translate}</p>
          </div>
        </div>
      </div>
    )
})
