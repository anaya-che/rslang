import { MutableRefObject } from "react"

export function handleAnswersKeyPress(event: KeyboardEvent, first: MutableRefObject<HTMLButtonElement | null>, second: MutableRefObject<HTMLButtonElement | null>, third: MutableRefObject<HTMLButtonElement | null>, fourth: MutableRefObject<HTMLButtonElement | null>, fifth: MutableRefObject<HTMLButtonElement | null>, handleAnswerButton: Function ) {
  if (event.key === '1') {
    if (null !== first.current) {
      first.current.click()
    }
  } else if (event.key === '2') {
    if (null !== second.current) {
      second.current.click()
    }
  } else if (event.key === '3') {
    if (null !== third.current) {
      third.current.click()
    }
  } else if (event.key === '4') {
    if (null !== fourth.current) {
      fourth.current.click()
    }
  } else if (event.key === '5') {
    if (null !== fifth.current) {
      fifth.current.click()
    }
  }
  document.removeEventListener('keydown', handleAnswerButton.bind(event,first,second, third, fourth, fifth))
}

export const playAnswerAudio = (src: string): void => {
  const audio = new Audio(src);
  audio.load();
  audio.play();
}