export interface IUserWord {
  difficulty: string;
  id: string;
  optional: IOptions;
  wordId: string;
}

export interface IOptions {
  group: number;
  page: number;
  success: number;
  mistakes: number;
}
