import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { HolidaysData, TDateTask, TEventsByDate } from "../data_provider/CalendarDataProviderTypes";
import { TCalendarProps } from "../ui/CalendarTypes";
import { CalendarView } from "../ui/CalendarView/CalendarView";
import { CalendarViewMode } from "../ui/CalendarView/CalendarViewTypes";

export type TStore = {
  controller: CalendarController | null;
  data_provider: CalendarDataProvider | null;
  view: CalendarView | null;
  state: TCalendarState;
};

export type TCalendarState = {
  year?: number;
  month?: number;
  selected_date?: Date;
  selected_date_tasks: TDateTask[];
  events: TEventsByDate;
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
  get_events(): TEventsByDate;
  set_events(events: TEventsByDate): void;
  get_calendar_mode(): CalendarViewMode;
  get_selected_date_tasks(): TDateTask[];
  set_selected_date_tasks(events: TDateTask[]): void;
  get_holidays(): HolidaysData;
  set_holidays(holidays: HolidaysData): void;
};

export type TContextStore = Partial<TCalendarProps> & {
  state: TCalendarState;
};
