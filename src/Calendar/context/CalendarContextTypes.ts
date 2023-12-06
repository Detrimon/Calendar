import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { HolidaysData, ICalendarDayEvent, TEventsTypesByDate } from "../data_provider/CalendarDataProviderTypes";
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
  events_params?: TEventsParams;
  year?: number;
  month?: number;
  selected_date?: Date;
  selected_date_events: ICalendarDayEvent[];
  events: TEventsTypesByDate;
  holidays: HolidaysData
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
  get_events(): TEventsTypesByDate;
  set_events(events: TEventsTypesByDate): void;
  get_calendar_mode(): CalendarViewMode;
  get_selected_date_events(): ICalendarDayEvent[];
  set_selected_date_events(events: ICalendarDayEvent[]): void;
  get_holidays(): HolidaysData;
  set_holidays(holidays: HolidaysData): void;
};

export type TContextStore = Partial<TCalendarProps> & {
  state: TCalendarState;
};
