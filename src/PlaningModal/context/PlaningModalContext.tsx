import { JSX, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import type { TPlaningModalStore, TPlaningModalStateMethods } from "./PlaningModalContextTypes";
import type { TPlaningModalProps } from "../PlaningModalTypes";
import { TRepeatRate } from "../../Calendar";
import { REPEAT_RATE_DAYS } from "../../shared/lib/constants";

const PlaningModalContext = createContext<[TPlaningModalStore, TPlaningModalStateMethods]>();

export const PlaningModalProvider = (props: { children: JSX.Element }) => {
  const [store, set_store] = createStore<TPlaningModalStore>({ state: {} });

  const context: [TPlaningModalStore, TPlaningModalStateMethods] = [
    store,
    {
      initialize(data: TPlaningModalProps) {
        set_store("controller", data.controller);
        if (data.config) {
          set_store("state", { ...store.state, ...data.config });
        }
      },

      get_controller() {
        if (!store.controller)
          throw Error("PlaningModalProvider has not controller in it store");
        return store.controller;
      },

      //  get_field_value(field_name) {
      //   if (typeof store.state[field_name] === "undefined")
      //     throw Error(`PlaningModalProvider has not ${field_name} in it store`);
      //   return store.state[field_name];
      // },

      get_is_allday_meeting() {
        if (typeof store.state.is_allday_meeting === "undefined")
          throw Error("PlaningModalProvider has not is_allday_meeting in it store");
        return store.state.is_allday_meeting;
      },

      set_is_allday_meeting(value: boolean) {
        set_store('state', 'is_allday_meeting', value);
      },

      get_is_repeated() {
        if (typeof store.state.is_repeated === "undefined")
          throw Error("PlaningModalProvider has not is_repeated in it store");
        return store.state.is_repeated;
      },

      set_is_repeated(value: boolean) {
        set_store('state', 'is_repeated', value);
      },

      get_time_start() {
        if (typeof store.state.time_start === "undefined")
          throw Error("PlaningModalProvider has not time_start in it store");
        return store.state.time_start;
      },

      set_time_start(value: string) {
        set_store('state', 'time_start', value);
      },

      get_time_end() {
        if (typeof store.state.time_end === "undefined")
          throw Error("PlaningModalProvider has not time_end in it store");
        return store.state.time_end;
      },

      set_time_end(value: string) {
        set_store('state', 'time_end', value);
      },

      get_repeat_rate() {
        if (typeof store.state.repeat_rate === "undefined")
          throw Error("PlaningModalProvider has not repeat_rate in it store");
        return store.state.repeat_rate;
      },

      set_repeat_rate(value: TRepeatRate) {
        set_store('state', 'repeat_rate', value);
      },

      get_repeat_every_week_row() {
        if (typeof store.state.repeat_every_week_row === "undefined")
          throw Error("PlaningModalProvider has not repeat_every_week_row in it store");
        return store.state.repeat_every_week_row;
      },

      set_repeat_every_week_row(value: number) {
        set_store('state', 'repeat_every_week_row', value);
      },

      get_repeat_week_days() {
        if (!Array.isArray(store.state.repeat_week_days))
          throw Error("PlaningModalProvider has not repeat_week_days in it store");
        return store.state.repeat_week_days;
      },

      change_repeat_week_days(value: REPEAT_RATE_DAYS) {
        const current_list = this.get_repeat_week_days();
        let new_list: REPEAT_RATE_DAYS[];

        if (current_list.includes(value)) {
          new_list = current_list.filter(day => day !== value);
        } else {
          new_list = [...current_list, value];
        };

        set_store('state', 'repeat_week_days', new_list);
      },

      get_start_date() {
        if (typeof store.state.start_date === "undefined")
          throw Error("PlaningModalProvider has not start_date in it store");
        return store.state.start_date;
      },

      set_start_date(value: string) {
        set_store('state', 'start_date', value);
      },

      get_end_date() {
        if (typeof store.state.end_date === "undefined")
          throw Error("PlaningModalProvider has not end_date in it store");
        return store.state.end_date;
      },

      set_end_date(value: string) {
        set_store('state', 'end_date', value);
      },

      get_is_repeat_infinitely() {
        if (typeof store.state.is_repeat_infinitely === "undefined")
          throw Error("PlaningModalProvider has not is_repeat_infinitely in it store");
        return store.state.is_repeat_infinitely;
      },

      set_is_repeat_infinitely(value: boolean) {
        set_store('state', 'is_repeat_infinitely', value);
      },
    
      get_is_repeats_quantity() {
        if (typeof store.state.is_repeats_quantity === "undefined")
          throw Error("PlaningModalProvider has not is_repeats_quantity in it store");
        return store.state.is_repeats_quantity;
      },

      set_is_repeats_quantity(value: boolean) {
        set_store('state', 'is_repeats_quantity', value);
      },

      toggle_is_repeats_quantity() {
        set_store('state', 'is_repeats_quantity', prev => !prev)
      },

      get_finish_repeats_quantity() {
        if (typeof store.state.finish_repeats_quantity === "undefined")
          throw Error("PlaningModalProvider has not finish_repeats_quantity in it store");
        return store.state.finish_repeats_quantity;
      },

      set_finish_repeats_quantity(value: number) {
        set_store('state', 'finish_repeats_quantity', value);
      }
    },
  ];

  return (
    <PlaningModalContext.Provider value={context}>
      {props.children}
    </PlaningModalContext.Provider>
  );
};

export const usePlaningModalContext = () => {
  let context = useContext(PlaningModalContext);
  if (!context) {
    throw new Error("usePlaningModalContext: cannot find a PlaningModalContext");
  }
  return context;
};