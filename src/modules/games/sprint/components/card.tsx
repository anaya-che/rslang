import { observer } from "mobx-react-lite";
import React from "react"
import { sprintState } from "../../../../store/sprint-state"
import style from './sprint.module.scss'; 


export const Card = observer(() => {
  return (
    <div className={style.sprintCard}>
      <div>Score: {sprintState.score}</div>
      <button onClick={sprintState.playWordAudio}>🔈</button>
      <div>{sprintState.currentWord.word}</div>
      <div>{sprintState.answer}</div>
      <button onClick={() => sprintState.checkAnswer(false)}>Не верю</button>
      <button onClick={() => sprintState.checkAnswer(true)}>Верю</button>
      <button onClick={() => sprintState.setStateForRound()}>Next</button>
      <div id='result'></div>
    </div>
  )
})

