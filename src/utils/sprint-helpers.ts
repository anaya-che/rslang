export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getTrueOrFalse() {
  return !!(Math.floor(Math.random() * 2));
}

export const countPercentage = (total: number, part: number) => {
  if (total !== 0) {
    return Math.floor(100 * part /total)
  } return 0
  
}