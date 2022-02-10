import { observer } from 'mobx-react-lite';
import { sprintState } from '../../../../store/sprint-state';

export const Result= observer(()=> {

  return (
    <div>
      <div>Result</div> 
      <div>Score: {sprintState.score}</div>
    </div>
  )
})