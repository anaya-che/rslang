import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../../../api/consts';
import { sprintState } from '../../../../../store/sprint-state';
import { countPercentage, handlePlayAgain, playAnswerAudio } from '../../../../../utils/sprint-helpers';
import { ISprintAnswer } from '../../../../../utils/interfaces/sprint';
import style from './result.module.scss'; 

export const Result: React.FC = observer(()=> {
  const rightAnswers: ISprintAnswer[] = sprintState.answers.filter(
    (answer: ISprintAnswer): boolean => answer.isRightAnswer === true);
  const mistakeAnswers: ISprintAnswer[] = sprintState.answers.filter(
    (answer: ISprintAnswer): boolean => answer.isRightAnswer === false);

  const rightAnswersPercentage = countPercentage(sprintState.answers.length, rightAnswers.length);
  const mistakeAnswersPercentage = countPercentage(sprintState.answers.length, mistakeAnswers.length);

  const renderAnswers = (answer: ISprintAnswer, i: number): JSX.Element | null => {
    if(answer.word) {
      return (
        <li className={style.answer} key={i}>
          <div>{answer.word.word} - {answer.word.wordTranslate}</div>
          <button className={style.audioBtn} onClick={(): void | null =>
             answer.word && playAnswerAudio(`${baseUrl}${answer.word.audio}`)
             }></button>
        </li>
      ) 
    } else return null;
  }

  useEffect(() => {
    playAnswerAudio(`../../../../../winner.mp3`);
  }, [])  

  return (
    <div className={style.resultWrapper}>
      <div className={style.resultDescription}>
        <button className={style.playAgain} onClick={handlePlayAgain}>
          <Link to="/games/sprint">Играть снова</Link>
        </button>
        <div>
          <h2 className={style.title}>Результаты</h2>  
          <div className={style.title}>Набрано баллов: {sprintState.score}</div>
          <div className={style.title}>Количество слов в игре: {sprintState.answers.length}</div>
        </div>
      </div>
  
      <section className={style.answersContainer}>
        <div className={style.rightAnswList}>
          <div className={style.title}>Угадано правильно {rightAnswers.length} слов</div>
          <div className={style.percentage}>Правильных ответов: {rightAnswersPercentage} % </div>
          <ul>{rightAnswers.map((answer, i) => renderAnswers(answer, i))}</ul>
        </div>

        <div className={style.mistakeAnswList}>
          <div className={style.title}>Угадано неправильно {mistakeAnswers.length} слов</div>
          <div className={style.percentage}>Неправильных ответов: {mistakeAnswersPercentage} % </div>
          <ul>{mistakeAnswers.map((answer, i) => renderAnswers(answer, i))}</ul>
        </div>
      </section>
 
    </div>
  )
})