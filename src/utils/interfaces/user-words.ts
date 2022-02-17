export interface IUserWord {
  difficulty: string;
  id: string;
  optional: IOptions;
  wordId: string;
}

export interface IOptions {
  winsInARow: number;
  mistakesInARow: number;
  wins: number;
  mistakes: number;
}
