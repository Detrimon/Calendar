import { Context, ParentComponent, createContext, createResource, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { get_holidays } from "../utils/get_holidays";
import { get_repeated_events, get_unique_events } from "../utils/get_events";

import type { EventsParams } from "../data_provider/CalendarEventsProviderTypes";
import type { CalendarActions, Observer, Observers } from "../controller/CalendarControllerTypes";
import { CalendarConfig } from "../ui/CalendarConfig";

export type TCalendarContext = {
  year: number;
  year_value: number;
  selected_date: Date,
  events_params: EventsParams,
  observers: Observers,
};

export type TCalendarContextMethods = {
  set_year(year: number): void;
  get_year(): number;
  set_year_value(year: number): void;
  get_year_value(): number;
  plus_year(): void;
  minus_year(): void;
  get_selected_date(): Date;
  set_selected_date(date: Date): void;
  get_holidays(): Date[];
  set_events_params(params: EventsParams): void;
  get_events(): CalendarEventsInterface[];
  subscribe(event: CalendarActions, observer: Observer): void
};

type CalendarProviderProps = {
  initial_settings: CalendarConfig;
}

export const CalendarContext = createContext() as Context<[TCalendarContext, TCalendarContextMethods]>;

export const CalendarProvider: ParentComponent<CalendarProviderProps> = (props) => {
   const [state, set_state] = createStore<TCalendarContext>({
    year: props.initial_settings.year,
    year_value: 23,
    selected_date: props.initial_settings.selected_date,
    events_params: props.initial_settings.events_params,
    observers: {}
  });
 
  const [public_holidays] = createResource(state.year, get_holidays);
  const [unique_events] = createResource(state.events_params, get_unique_events);
  const [repeated_events] = createResource(state.events_params, get_repeated_events);

  const store: [TCalendarContext, TCalendarContextMethods] = [
    state,
    {
      set_year(year: number) {
        set_state("year", year);
      },

      get_year() {
        return state.year;
      },

      set_year_value(value: number) {
        set_state("year_value", value);
      },

      get_year_value() {
        return state.year_value;
      },

      plus_year() {
        set_state("year", state.year + 1);
      },

      minus_year() {
        set_state("year", state.year - 1);
      },

      get_selected_date() {
        return state.selected_date;
      },

      set_selected_date(date) {
        set_state("selected_date", date);
      },

      get_holidays() {
        return public_holidays() || []
      },

      set_events_params(params: EventsParams) {
        set_state("events_params", params)
      },
      
      // TODO Имплементировать функцию, когда появится чёткое представление о структуре repeated_events. Нужна функция transform 
      get_events() {
        const result = {
          ...unique_events,
          ...repeated_events
        }
        return []
      },

      subscribe(event: CalendarActions, observer: Observer) {
        if (state.observers[event] === undefined) {
          state.observers[event] = [];
        }
        state.observers[event]?.push(observer);
      },
    }
  ];

  return (
    <CalendarContext.Provider value={store}>
      {props.children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);