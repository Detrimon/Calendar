import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarConfig } from "../config/CalendarConfig";
import { CalendarView } from "./CalendarView/CalendarView";

export type TCalendarProps = {
  data_provider: CalendarDataProvider
  controller: CalendarController
  view: CalendarView
  config?: CalendarConfig
};

export type MonthItemHeader = {
  month_name: string
  is_current: () => boolean
  year?: number
}

export type MonthItemProps = {
  month: string
  month_dates: Date[][]
  year?: number
};

export type MonthItemBodyProps = {
  month_dates: Date[][]
};

export type PrevCreateEffectValues = Partial<Record<CalendarActions, any>>;

export enum CalendarActions{
  SELECTED_DATE = 'get_selected_date',
  GET_YEAR = 'get_year',
  GET_SELECTED_DATE_EVENTS = 'get_selected_date_events'
};
