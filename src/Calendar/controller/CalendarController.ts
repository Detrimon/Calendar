import { v4 as uuidv4 } from "uuid";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarView } from "../ui/CalendarView/CalendarView";
import { CalendarActions } from "../ui/CalendarTypes";
import type { TEventsTypesByDate } from "../data_provider/CalendarDataProviderTypes";
import type { GUID, Observers } from "./CalendarControllerTypes";
import { TCalendarStateMethods } from "../context/CalendarContextTypes";
import { CalendarViewMode } from "../ui/CalendarView/CalendarViewTypes";
import { createEffect, on } from "solid-js";

export class CalendarController {
  data_provider: CalendarDataProvider | null;
  view: CalendarView | null;
  context: TCalendarStateMethods | null;
  observers: Observers;

  subscribe(event: CalendarActions, fn: (data: any) => void) {
    if (this.observers[event] === undefined) {
      this.observers[event] = {};
    }
    const guid = uuidv4() as GUID;
    this.observers[event][guid] = fn;
    return guid;
  }
  
  notify(event: CalendarActions, data: any) {
    let observers_by_event = this.observers[event];
    if (!observers_by_event) return;

    Object.values(observers_by_event).forEach((fn) => {
      fn({ event, data });
    });
  }

  constructor() {
    this.data_provider = null;
    this.view = null;
    this.context = null;
    this.observers = {};

    this.subscribe = this.subscribe.bind(this);
    this.notify = this.notify.bind(this);
  }

  initialize(context: TCalendarStateMethods) {
    this.data_provider = context.get_data_provider();
    this.view = context.get_view();
    this.context = context;

    createEffect(on(context.get_year, (year) => {
      this.load_and_set_new_events(year);
      this.notify(CalendarActions.GET_YEAR, year);
    }, { defer: true }));
  };

  get_context() {
    if (!this.context)
      throw Error('CalendarController instance has not "context" property');
    return this.context;
  }
  
  get_view() {
    if (!this.view)
      throw Error('CalendarController instance has not "view" property');
    return this.view;
  }

  get_data_provider() {
    if (!this.data_provider)
      throw Error(
        'CalendarController instance has not "data_provider" property'
      );
    return this.data_provider;
  }

  //! Нужно другое название функции?
  async load_and_set_new_events(year: number) {
    const context = this.get_context();
    const data_provider = this.get_data_provider();

    const events = (await data_provider.get_year_events(
      year
    )) as TEventsTypesByDate;
    context.set_events(events);
  };

  async get_date_events(date: Date) {
    const data_provider = this.get_data_provider();
    return await data_provider.get_date_events(date);
  };

  plus_year() {
    const context = this.get_context();
    const next_year = context.get_year() + 1;
    context.set_year(next_year);
  };

  minus_year() {
    const context = this.get_context();
    const prev_year = context.get_year() - 1;
    context.set_year(prev_year);
  };
        
  set_calendar_mode(mode: CalendarViewMode) {
    const view = this.get_view();
    view.set_mode(mode);
  };
}
