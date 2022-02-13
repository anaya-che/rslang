import { observer } from 'mobx-react-lite';
import { sprintState } from '../../../../store/sprint-state';

export const Categories: React.FC = observer(()=> {

  const startRound = (category: number): void => {
    sprintState.setCategory(category);
    sprintState.setStateForRound();
    sprintState.startGame(true);
    sprintState.timerHandler();
  }
  return (
    <div>
      <button onClick={(): void => startRound(0)}>1</button>
      <button onClick={(): void => startRound(1)}>2</button>
      <button onClick={(): void => startRound(2)}>3</button>
      <button onClick={(): void => startRound(3)}>4</button>
      <button onClick={(): void => startRound(4)}>5</button>
      <button onClick={(): void => startRound(5)}>6</button>
    </div>
  )
})