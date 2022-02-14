export interface IWordData {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IWordStore {
  wordGroup: number;
  wordPage: number;
  wordData: IWordData[];
}

export interface ILinkProps {
  group: string;
  page: string;
}