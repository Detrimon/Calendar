import { JSX, createContext, useContext } from "solid-js";

import { type TCalendarProps } from "../ui/CalendarTypes";
import { createStore } from "solid-js/store";
import { TCalendarStateMethods, TContextStore } from "./CalendarContextTypes";
import { CalendarEventsInterface } from "../data_provider/CalendarDataProviderTypes";

// export const CalendarContext = createContext(new CalendarContextClass());
const CalendarContext = createContext<[TContextStore, TCalendarStateMethods]>();

export const CalendarProvider = (props: { children: JSX.Element }) => {
  // const context = useCalendarContext();
  // const [context_props] = splitProps(props, ['controller', 'data_provider', 'view', 'config']);

  const [store, set_store] = createStore<TContextStore>({ state: {} });

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

      get_selected_date() {
        if (!store.state.selected_date)
          throw Error("CalendarProvider has not selected_date in it store");
        return store.state.selected_date;
      },

      set_selected_date(date: Date) {
        set_store("state", "selected_date", date);
      },

      set_events(events: CalendarEventsInterface[]) {
        set_store("state", "events", events);
      },
    },
  ];

  // context.initialize(context_props);
  // props.controller.initialize(context);

  // createEffect<PrevCreateEffectValues>((prev_values) => {
  //   const new_values: PrevCreateEffectValues = {};
  //   for (let action of Object.values(CalendarActions)) {
  //     const new_value = context[action]();
  //     const old_value = prev_values[action];
  //     if (new_value !== old_value) {
  //       CalendarController.observers[action]?.forEach(fn => fn(new_value));
  //       new_values[action] = new_value;
  //     };
  //   };
  //   return { ...prev_values, ...new_values }
  // }, {});

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
