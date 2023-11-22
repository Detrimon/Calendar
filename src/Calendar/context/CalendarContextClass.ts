import { SetStoreFunction, createStore } from "solid-js/store";

import { get_start_of_day } from "../helpers/calendar_helpers";
import type { TCalendarState, TStore } from "./CalendarContextTypes";
import type { CalendarEventsInterface } from "../data_provider/CalendarDataProviderTypes";
import type { TCalendarProps } from "../ui/CalendarTypes";

const defaultState: TCalendarState = {
  events_params: {
    date_from: new Date(),
    date_to: new Date(),
    time_from: '00:00:00',
    time_to: '23:59:59'
  },
  year: new Date().getFullYear(),
  selected_date: get_start_of_day(new Date()),
  events: []
};

export class CalendarContextClass{
  set_store: SetStoreFunction<TStore>
  store: TStore

  constructor() {
    const [store, set_store] = createStore<TStore>({
      controller: null,
      data_provider: null,
      view: null,
      state: defaultState
    });

    this.store = store;
    this.set_store = set_store;
  };

  initialize(data: TCalendarProps) {
    this.set_store("controller", data.controller);
    this.set_store("data_provider", data.data_provider);
    this.set_store("view", data.view);

    if (data.config) {
      this.set_store("state", {...this.store.state, ...data.config});
    }
  };

  get_year() {
    return this.store.state.year
  };

  set_year(year: number) {
    this.set_store("state", "year", year);
  };

  get_selected_date() {
    return this.store.state.selected_date
  };

  set_selected_date(date: Date) {
    this.set_store && this.set_store("state", "selected_date", date);
  };

  set_events(events: CalendarEventsInterface[]) {
    this.set_store && this.set_store("state", "events", events);
  }
};
