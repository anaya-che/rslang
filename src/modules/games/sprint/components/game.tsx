import { observer } from "mobx-react-lite"
import React from "react"
import { sprintState } from "../../../../store/sprint-state"
import { Card } from './card'
import { Result } from "./result"

export const Game = observer(()=> {
  return (
    <>
    {sprintState.secondsInRound === 0 ? (
      <Result />
    ) : (
      <Card />
    )
    }
    </>
  )
  // return (
  //   <>
  //     <div>Sprint Page</div>
  //     <div className={style.sprintPage}>
  //       { sprintState.isGame && sprintState.currentWord ? (
  //         <Game />
  //         ) : (
  //         <Categories />
  //         ) 
  //       }
  //     </div>     
  //   </>
  
  // )
})
