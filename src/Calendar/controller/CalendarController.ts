import { batch } from "solid-js";
import { v4 as uuidv4 } from "uuid";

import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarView } from "../ui/CalendarView/CalendarView";
import { CalendarActions } from "../ui/CalendarTypes";
import type { TCalendarStateMethods } from "../context/CalendarContextTypes";
import type { CalendarViewMode } from "../ui/CalendarView/CalendarViewTypes";
import { MONTHS } from "../../shared/lib/constants";
import type { THolidaysData, TDateTask, TEventsByDate } from "../data_provider/CalendarDataProviderTypes";
import type { GUID, Observers } from "./CalendarControllerTypes";
import { format_date_to_string } from "../../shared/lib/helpers";

export class CalendarController {
  data_provider: CalendarDataProvider | null;
  view: CalendarView | null;
  context: TCalendarStateMethods | null;
  observers: Observers;

  constructor() {
    this.data_provider = null;
    this.view = null;
    this.context = null;
    this.observers = {};

    this.subscribe = this.subscribe.bind(this);
    this.notify = this.notify.bind(this);
  };

  initialize(context: TCalendarStateMethods) {
    this.data_provider = context.get_data_provider();
    this.view = context.get_view();
    this.context = context;
  };
  
  get_context() {
    if (!this.context)
      throw Error('CalendarController instance has not "context" property');
    return this.context;
  };
  
  get_view() {
    if (!this.view)
      throw Error('CalendarController instance has not "view" property');
    return this.view;
  };

  get_data_provider() {
    if (!this.data_provider)
      throw Error(
        'CalendarController instance has not "data_provider" property'
      );
    return this.data_provider;
  };

  subscribe(event: CalendarActions, fn: (data: any) => void) {
    if (this.observers[event] === undefined) {
      this.observers[event] = {};
    };

    const guid = uuidv4() as GUID;
    this.observers[event][guid] = fn;
    return guid;
  };
  
  notify(event: CalendarActions, data: any) {
    let observers_by_event = this.observers[event];
    if (!observers_by_event) return;

    Object.values(observers_by_event).forEach((fn) => {
      fn({ event, data });
    });
  };

  async load_and_set_events(year: number) {
    const data_provider = this.get_data_provider();
    const context = this.get_context();

    const events = (await data_provider.get_year_events(
      year
    )) as TEventsByDate;

    this.set_context_events(events, year);

    if (!context.get_events(year + 1)) {
      const next_year_events = (await data_provider.get_year_events(
        year + 1
      )) as TEventsByDate;
      this.set_context_events(next_year_events, year + 1);
    };
    if (!context.get_events(year - 1)) {
      const prev_year_events = (await data_provider.get_year_events(
        year - 1
      )) as TEventsByDate;
      this.set_context_events(prev_year_events, year - 1);
    };
  };

  async load_and_set_date_tasks(date: Date) {
    const data_provider = this.get_data_provider();

    const date_events = (await data_provider.get_date_tasks(
      date
    )) as TDateTask[];
    this.set_context_selected_date_tasks(date_events);
  };

  async load_and_set_year_holidays(year: number) {
    const data_provider = this.get_data_provider();

    const holidays = (await data_provider.get_year_holidays(
      year
    )) as THolidaysData;
    this.set_context_holidays(holidays);
  };

  async get_date_tasks(date: Date) {
    const data_provider = this.get_data_provider();
    return await data_provider.get_date_tasks(date);
  };
       
  set_calendar_mode(mode: CalendarViewMode) {
    const view = this.get_view();
    view.set_mode(mode);
  };

  slide_right_handler() {
    const context = this.get_context();

    let new_month_number = context.get_month() + 1;
    if (new_month_number > 11) {
      batch(() => {
        this.set_context_year(context.get_year() + 1);
        this.set_context_month(0);
      });
    } else {
      this.set_context_month(new_month_number);
    };
  };

  slide_left_handler() {
    const context = this.get_context();

    let new_month_number = context.get_month() - 1;
    if (new_month_number < 0) {
      batch(() => {
        this.set_context_year(context.get_year() - 1);
        this.set_context_month(11);
      });
    } else {
      this.set_context_month(new_month_number);
    };
  };

  change_month_handler(value: string) {
    const new_month_number = MONTHS.findIndex(name => name === value);
    this.set_context_month(new_month_number);
  };

  select_day_handler(date: Date) {
    const context = this.get_context();
    const year_events_dates = Object.keys(context.get_events(date.getFullYear()));

    this.set_context_selected_date(date);

    if (year_events_dates.includes(format_date_to_string(date))) {
      this.load_and_set_date_tasks(date);
    } else {
      this.set_context_selected_date_tasks([]);
    }
  };

  set_context_year(year: number) {
    const context = this.get_context();

    context.set_year(year);
    this.notify(CalendarActions.GET_YEAR, year);
    this.load_and_set_events(year);
    this.load_and_set_year_holidays(year);
  }

  set_context_month(month: number) {
    const context = this.get_context();
    context.set_month(month);
  }

  set_context_selected_date(date: Date) {
    const context = this.get_context();
    context.set_selected_date(date);
    this.notify(CalendarActions.SELECTED_DATE, date);
  }

  set_context_events(events: TEventsByDate, year: number) {
    const context = this.get_context();
    context.set_events(events, year);

    this.notify(CalendarActions.GET_EVENTS, context.get_all_events());
  }

  set_context_selected_date_tasks(tasks: TDateTask[]) {
    const context = this.get_context();
    context.set_selected_date_tasks(tasks);
    this.notify(CalendarActions.GET_SELECTED_DATE_EVENTS, tasks);
  }

  set_context_holidays(holidays: THolidaysData) {
    const context = this.get_context();
    context.set_holidays(holidays);
  }
};
