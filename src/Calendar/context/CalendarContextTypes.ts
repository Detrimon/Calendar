import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarEventsInterface } from "../data_provider/CalendarDataProviderTypes";
import { TCalendarProps } from "../ui/CalendarTypes";
import { CalendarView } from "../ui/CalendarView/CalendarView";
import { CalendarViewMode } from "../ui/CalendarView/CalendarViewTypes";

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
  month: number;
  selected_date: Date;
  events: CalendarEventsInterface[];
};

export type TCalendarStateMethods = {
  initialize(data: TCalendarProps): void;
  get_controller(): CalendarController;
  get_data_provider(): CalendarDataProvider;
  get_view(): CalendarView;
  get_year(): number;
  set_year(year: number): void;
  get_month(): number;
  set_month(month: number): void;
  get_selected_date(): Date;
  set_selected_date(date: Date): void;
  set_events(events: CalendarEventsInterface[]): void;
  get_calendar_mode(): CalendarViewMode;
};

export type TContextStore = Partial<TCalendarProps> & {
  state: Partial<TCalendarState>;
};
