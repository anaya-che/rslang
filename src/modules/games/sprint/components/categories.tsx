import { observer } from 'mobx-react-lite';
import { sprintState } from '../../../../store/sprint-state';

export const Categories= observer(()=> {

  const startRound = (category: number) => {
    sprintState.setCategory(category);
    sprintState.setStateForRound();
    sprintState.startGame(true);
    sprintState.timerHandler();
  }
  return (
    <div>
      <button onClick={() => startRound(0)}>1</button>
      <button onClick={() => startRound(1)}>2</button>
      <button onClick={() => startRound(2)}>3</button>
      <button onClick={() => startRound(3)}>4</button>
      <button onClick={() => startRound(4)}>5</button>
      <button onClick={() => startRound(5)}>6</button>
    </div>
  )
})