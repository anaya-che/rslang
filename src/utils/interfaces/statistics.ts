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
  newWords: number;
  bestSeries: number;
  totalWins: number;
  totalMistakes: number;
  learnedWordsId: string[];
}

export interface IDailyWordsStatistic {
  newWords: number;
  learnedWords: number;
  percentOfAnswers: number;
}

export interface IDailyGameStatistic {
  newWords: number;
  percentOfAnswers: number;
  bestSeries: number;
}
