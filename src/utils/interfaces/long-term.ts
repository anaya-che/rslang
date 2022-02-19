export interface Idataset {
  data: number[],
  label: string,
  borderColor: string,
  backgroundColor: string,
  fill: boolean,
  lineTension: number
}

export interface IlineChart {
  labels: string[],
  datasets: Idataset[]
}
