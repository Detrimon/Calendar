export enum CalendarActions{
  SELECTED_DATE = 'get_selected_date'
}

export type Observers = Partial<Record<CalendarActions, Array<Observer>>>

export interface Observer{
  handleEvent: (data: any) => void 
}