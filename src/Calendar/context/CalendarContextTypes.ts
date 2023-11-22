import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarEventsInterface } from "../data_provider/CalendarDataProviderTypes";
import { CalendarView } from "../ui/CalendarView/CalendarView";

export type TStore = {
  controller: CalendarController | null;
  data_provider: CalendarDataProvider | null;
  view: CalendarView | null;
  state: TCalendarState;
};

export type TEventsParams = {
  date_from: Date;
  date_to: Date;
  time_from: string;
  time_to: string;
};

export type TCalendarState = {
  events_params: TEventsParams;
  year: number;
  selected_date: Date;
  events: CalendarEventsInterface[]
}