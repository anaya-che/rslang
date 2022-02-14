export interface IUserWord {
  difficulty: string;
  id: string;
  optional: IOptions;
  wordId: string;
}

export interface IOptions {
  group: number;
  page: number;
  isNew: boolean;
  winsInARow: number;
  mistakesInARow: number;
  wins: number;
  mistakes: number;
}
