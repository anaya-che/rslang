import { sprintState } from "../../../store/sprint-state";
import { observer } from 'mobx-react-lite';
import { Card } from "./components/card";

export const SprintPage= observer(()=> {

  return (
    <>
      <div>Sprint Page</div>
      <Card />
      <div>{sprintState.category}</div>
      <button onClick={() => {
        sprintState.setCategory(0)
        sprintState.setStateForRound()
        }}>1</button>
      <button onClick={() => sprintState.setCategory(1)}>2</button>
      <button onClick={() => sprintState.setCategory(2)}>3</button>
      <button onClick={() => sprintState.setCategory(3)}>4</button>
      <button onClick={() => sprintState.setCategory(4)}>5</button>
      <button onClick={() => sprintState.setCategory(5)}>6</button>
    </>
  
  )
})
