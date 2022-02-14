import { observer } from "mobx-react-lite";
import React, { useEffect } from "react"
import { sprintState } from "../../../../store/sprint-state"
import { playWordAudio } from "../../../../utils/sprint-helpers";
import style from './sprint.module.scss'; 


export const Card: React.FC = observer(() => {  
  const checkRightPair = (isRight: boolean): void => {
    sprintState.checkAnswer(isRight);
    sprintState.setStateForRound();
  }

  const noBtn: React.RefObject<HTMLButtonElement> = React.useRef<HTMLButtonElement>(null);
  const yesBtn: React.RefObject<HTMLButtonElement> = React.useRef<HTMLButtonElement>(null);

  useEffect((): void => {
    const handleKeyCode = (event: KeyboardEvent): void => {
      if ((event.key === 'ArrowLeft') && noBtn.current) {
        noBtn.current.click();
      } else if ((event.key === 'ArrowRight') && yesBtn.current) {
        yesBtn.current.click();
      } 
    }
    document.addEventListener('keydown', (event: KeyboardEvent): void => handleKeyCode(event))
  }, []);

  return (
    <div className={style.sprintCard}>
      <div>Score: {sprintState.score}</div>
      <div>Timer: {sprintState.secondsInRound}</div>
      <ul className={style.pointsIndicationGroup}>
        {sprintState.countTrueAnswers.map((el: boolean, i: number) => <li key={i} className={style.pointsIndicationDot}></li>)}
      </ul>
      <button className={style.audioBtn} onClick={playWordAudio}>🔈</button>
      <div>{sprintState.currentWord && sprintState.currentWord.word}</div>
      <div>{sprintState.translate}</div>
      <div className={style.buttonGroup}>
        <button ref={noBtn} onClick={(): void => checkRightPair(false)}>Не верю</button>
        <button ref={yesBtn} onClick={(): void => checkRightPair(true)}>Верю</button>
      </div>
    </div>
  )
})

