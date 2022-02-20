import { observer } from "mobx-react-lite"
import React from "react"
import { sprintState } from "../../../../store/sprint-state"
import { Card } from './card/card'
import { Result } from "./result/result"
import style from './sprint.module.scss';

export const Game: React.FC = observer(()=> {
  return (
    <div className={style.game}>    
      {sprintState.secondsInRound === 0 
      ? ( <Result /> ) 
      : ( <Card /> )
      }
    </div>
  )
})
