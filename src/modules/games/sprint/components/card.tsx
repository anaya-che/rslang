import { observer } from "mobx-react-lite";
import React, { useEffect } from "react"
import { sprintState } from "../../../../store/sprint-state"
import style from './sprint.module.scss'; 


export const Card = observer(() => {
  useEffect(() => {

  }, []);

  return (
    <div className={style.sprintCard}>
      <div>Score: {sprintState.score}</div>
      <ul className={style.pointsIndicationGroup}>
      {sprintState.countTrueAnswers.map((el, i) => <li key={i} className={style.pointsIndicationDot}></li>)}
      </ul>
      <button className={style.audioBtn} onClick={sprintState.playWordAudio}>🔈</button>
      <div>{sprintState.currentWord && sprintState.currentWord.word}</div>
      <div>{sprintState.translate}</div>
      <div className={style.buttonGroup}>
        <button onClick={() => {
          sprintState.checkAnswer(false);
          sprintState.setStateForRound();
          }}>Не верю</button>
        <button onClick={() => {
          sprintState.checkAnswer(true);
          sprintState.setStateForRound();
          }}>Верю</button>
      </div>
      
      <div id='result'></div>
    </div>
  )
})

