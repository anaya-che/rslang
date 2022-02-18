export interface IStatistic {
  learnedWords: number;
  optional: IStatisticOptional;
}

export interface IStatisticOptional {
  [index: string]: {
    [game: string]: IGameStatistic;
  };
}

export interface IGameStatistic {
  gamesCount: number;
  bestSeries: number;
  totalWins: number;
  totalMistakes: number;
  learnedWordsId: string[];
}
