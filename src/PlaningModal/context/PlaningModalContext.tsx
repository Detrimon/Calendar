import { JSX, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import type { TPlaningModalStore, TPlaningModalStateMethods } from "./PlaningModalContextTypes";
import type { TPlaningModalProps } from "../ui/PlaningModalTypes";
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

       get_context_value(field_name){
        if (typeof store.state[field_name] === "undefined")
          throw Error(`PlaningModalProvider has not ${field_name} in it store`);
        return store.state[field_name];
      },
       
       set_context_value(field_name, value){
         set_store('state', field_name, value);
      },

      change_repeat_week_days(value: REPEAT_RATE_DAYS) {
        const current_list = this.get_context_value('repeat_week_days') as REPEAT_RATE_DAYS[];
        let new_list: REPEAT_RATE_DAYS[];

        if (current_list.includes(value)) {
          new_list = current_list.filter(day => day !== value);
        } else {
          new_list = [...current_list, value];
        };

        set_store('state', 'repeat_week_days', new_list);
      },

      toggle_is_repeats_quantity() {
        set_store('state', 'is_repeats_quantity', prev => !prev)
      },
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