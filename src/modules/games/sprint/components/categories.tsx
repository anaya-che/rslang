import { observer } from 'mobx-react-lite';
import { sprintState } from '../../../../store/sprint-state';

export const Categories: React.FC = observer(()=> {
  return (
    <div>
      <button onClick={(): void => sprintState.startRound(0)}>1</button>
      <button onClick={(): void => sprintState.startRound(1)}>2</button>
      <button onClick={(): void => sprintState.startRound(2)}>3</button>
      <button onClick={(): void => sprintState.startRound(3)}>4</button>
      <button onClick={(): void => sprintState.startRound(4)}>5</button>
      <button onClick={(): void => sprintState.startRound(5)}>6</button>
    </div>
  )
})