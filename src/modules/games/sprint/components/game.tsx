import { observer } from "mobx-react-lite"
import React from "react"
import { sprintState } from "../../../../store/sprint-state"
import { Card } from './card'
import { Result } from "./result"

export const Game: React.FC = observer(()=> {
  return (
    <>
    {sprintState.secondsInRound === 0 
    ? ( <Result /> ) 
    : ( <Card /> )
    }
    </>
  )
})
