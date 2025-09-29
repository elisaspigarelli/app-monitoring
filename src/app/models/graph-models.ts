export enum GraphType {
  Errors = 'errors',
  ResponseTime = 'response-time'
}

export interface GraphData {
  day: string, 
  value: number
}