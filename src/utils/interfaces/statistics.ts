export interface IStatistic {
  learnedWords: number;
  optional: IStatisticOptional;
}

export interface IStatisticOptional {
  [index: string]: {
    audiocall: IGameStatistic;
    sprint: IGameStatistic;
  };
}

export interface IGameStatistic {
  gamesCount: number;
  newWords: number;
  bestSeries: number;
  totalWins: number;
  totalMistakes: number;
  learnedWordsId: string[];
}
