import { JSX, createContext, useContext } from "solid-js";

import { type TCalendarProps } from "../ui/CalendarTypes";
import { createStore } from "solid-js/store";
import { TCalendarStateMethods, TContextStore } from "./CalendarContextTypes";
import { HolidaysData, ICalendarDayEvent, TEventsByDate } from "../data_provider/CalendarDataProviderTypes";

const CalendarContext = createContext<[TContextStore, TCalendarStateMethods]>();

export const CalendarProvider = (props: { children: JSX.Element }) => {
  const [store, set_store] = createStore<TContextStore>({
    state: {
      selected_date_events: [],
      events: {},
      holidays: {
        holidays: [],
        preholidays: [],
        become_working: []
      }
    }
  });

  const context: [TContextStore, TCalendarStateMethods] = [
    store,
    {
      initialize(data: TCalendarProps) {
        set_store("controller", data.controller);
        set_store("data_provider", data.data_provider);
        set_store("view", data.view);

        if (data.config) {
          set_store("state", { ...store.state, ...data.config });
        }
      },

      get_controller() {
        if (!store.controller)
          throw Error("CalendarProvider has not controller in it store");
        return store.controller;
      },

      get_data_provider() {
        if (!store.data_provider)
          throw Error("CalendarProvider has not data_provider in it store");
        return store.data_provider;
      },

      get_view() {
        if (!store.view)
          throw Error("CalendarProvider has not view in it store");
        return store.view;
      },

      get_calendar_mode() {
        return this.get_view().get_mode();
      },

      get_year() {
        if (!store.state.year)
          throw Error("CalendarProvider has not year in it store");
        return store.state.year;
      },

      set_year(year: number) {
        set_store("state", "year", year);
      },

      get_month() {
        if (!store.state.month && store.state.month !== 0)
          throw Error("CalendarProvider has not month in it store");
        return store.state.month;
      },

      set_month(month: number) {
        set_store("state", "month", month);
      },

      get_selected_date() {
        if (!store.state.selected_date)
          throw Error("CalendarProvider has not selected_date in it store");
        return store.state.selected_date;
      },

      set_selected_date(date: Date) {
        set_store("state", "selected_date", date);
      },

      get_events() {
        return store.state.events;
      },

      set_events(events: TEventsByDate) {
        set_store("state", "events", events);
      },

      get_selected_date_events() {
        return store.state.selected_date_events;
      },

      set_selected_date_events(events: ICalendarDayEvent[]) {
        set_store("state", "selected_date_events", events)
      },

      get_holidays() {
        return store.state.holidays;
      },

      set_holidays(holidays: HolidaysData) {
        set_store("state", "holidays", holidays);
      }
    },
  ];

  return (
    <CalendarContext.Provider value={context}>
      {props.children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  let context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendarContext: cannot find a CalendarContext");
  }
  return context;
};
