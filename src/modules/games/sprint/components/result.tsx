import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../../api/consts';
import { sprintState } from '../../../../store/sprint-state';
import { ISprintAnswer } from '../../../../utils/interfaces';
import { countPercentage } from '../../../../utils/sprint-helpers';
import style from './sprint.module.scss'; 

export const Result= observer(()=> {
  const rightAnswers: ISprintAnswer[] = sprintState.answers.filter(answer => answer.isRightAnswer === true);
  const mistakeAnswers: ISprintAnswer[] = sprintState.answers.filter(answer => answer.isRightAnswer === false);

  const rightAnswersPercentage = countPercentage(sprintState.answers.length, rightAnswers.length);
  const mistakeAnswersPercentage = countPercentage(sprintState.answers.length, mistakeAnswers.length);

  const renderAnswers = (answer: ISprintAnswer) => {
    if(answer.word) {
      return (
        <li className={style.answer} key={answer.word.id}>
          <div>{answer.word.word} - {answer.word.wordTranslate}</div>
          <div></div>
          <button className={style.audioBtn} onClick={() =>
             answer.word && sprintState.playAnswerAudio(`${baseUrl}${answer.word.audio}`)
             }>🔈</button>
        </li>
      ) 
    } else return '';
  }

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