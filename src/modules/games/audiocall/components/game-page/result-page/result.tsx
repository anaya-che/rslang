import React from 'react';
import { observer } from 'mobx-react-lite';
import { audiocallState } from "../../../../../../store/audiocall-state";
import "./result.scss"

export const AudioResult = observer(()=> {

    return(
      <div>
        <ul>
          <div className="audio-correct">
            <p>Слова с ошибками: {10 - audiocallState.correctAnswers.length}</p>
            {audiocallState.incorrectAnswers.map((answer, index) =>
              (<ul key={index} className="audio-answer">
                <li><button key={answer.audio} onClick={() => {
                  audiocallState.getWordAudio(answer.audio)}
                  }>Sound</button></li>
                <li key={answer.word}>{answer.word}</li>
                <li key={answer.transcription}>{answer.transcription}</li>
                <li key={answer.wordTranslate}>{answer.wordTranslate}</li>
              </ul>))}
          </div>
        </ul>
        <ul>
          <div className="audio-correct">
            <p>Количество изученных слов: {audiocallState.correctAnswers.length}</p>
            {audiocallState.correctAnswers.map((answer, index) =>
              (<ul key={index} className="audio-answer">
                <li><button key={answer.audio} onClick={() => {
                  audiocallState.getWordAudio(answer.audio)}
                  }>Sound</button></li>
                <li key={answer.word}>{answer.word}</li>
                <li key={answer.transcription}>{answer.transcription}</li>
                <li key={answer.wordTranslate}>{answer.wordTranslate}</li>
              </ul>))}
          </div>
        </ul>
      </div>
    )
})