export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getTrueOrFalse() {
  return !!(Math.floor(Math.random() * 2));
}