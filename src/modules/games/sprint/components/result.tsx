import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../../api/consts';
import { sprintState } from '../../../../store/sprint-state';
import { countPercentage, playAnswerAudio } from '../../../../utils/sprint-helpers';
import { ISprintAnswer } from '../../../../utils/sprint-interfaces';
import style from './sprint.module.scss'; 

export const Result: React.FC = observer(()=> {
  const rightAnswers: ISprintAnswer[] = sprintState.answers.filter(
    (answer: ISprintAnswer): boolean => answer.isRightAnswer === true);
  const mistakeAnswers: ISprintAnswer[] = sprintState.answers.filter(
    (answer: ISprintAnswer): boolean => answer.isRightAnswer === false);

  const rightAnswersPercentage = countPercentage(sprintState.answers.length, rightAnswers.length);
  const mistakeAnswersPercentage = countPercentage(sprintState.answers.length, mistakeAnswers.length);

  const renderAnswers = (answer: ISprintAnswer): JSX.Element | null => {
    if(answer.word) {
      return (
        <li className={style.answer} key={answer.word.id}>
          <div>{answer.word.word} - {answer.word.wordTranslate}</div>
          <button className={style.audioBtn} onClick={(): void | null =>
             answer.word && playAnswerAudio(`${baseUrl}${answer.word.audio}`)
             }>🔈</button>
        </li>
      ) 
    } else return null;
  }

  useEffect(() => {
    playAnswerAudio(`../../../../../winner.mp3`);
  }, [])  

  return (
    <div>
      <div className={style.title}>Result</div>  
      <button onClick={sprintState.setDefault}>
        <Link to="/games/sprint">Play again</Link>
      </button>
      <div>Right: {rightAnswersPercentage} % </div>
      <div>Mistakes: {mistakeAnswersPercentage} % </div>
      <div className={style.title}>Score: {sprintState.score}</div>
      <div className={style.title}>Words were repeated: {sprintState.answers.length}</div>
      <div className={style.title}>Right answers: {rightAnswers.length}</div>
      <ul>{rightAnswers.map(renderAnswers)}</ul>
      <div className={style.title}>Mistake answers: {mistakeAnswers.length}</div>
      <ul>{mistakeAnswers.map(renderAnswers)}</ul>
    </div>
  )
})