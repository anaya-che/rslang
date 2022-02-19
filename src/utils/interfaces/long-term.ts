export interface Idataset {
  data: number[],
  label: string,
  borderColor: string,
  backgroundColor: string,
  fill: boolean,
  lineTension: number
}

export interface asdI {
  labels: string[],
  datasets: Idataset[]
}
