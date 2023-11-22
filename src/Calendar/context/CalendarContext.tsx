import { ParentComponent, createContext, createEffect, splitProps, useContext } from "solid-js";

import { CalendarContextClass } from "./CalendarContextClass";
import { CalendarController } from "../controller/CalendarController";
import { CalendarActions, type PrevCreateEffectValues, type TCalendarProps } from "../ui/CalendarTypes";

export const CalendarContext = createContext(new CalendarContextClass());

export const CalendarProvider: ParentComponent<TCalendarProps> = (props) => {
  const context = useCalendarContext();
  const [context_props] = splitProps(props, ['controller', 'data_provider', 'view', 'config']);

  context.initialize(context_props);
  props.controller.initialize(context);

  createEffect<PrevCreateEffectValues>((prev_values) => {
    const new_values: PrevCreateEffectValues = {};
    for (let action of Object.values(CalendarActions)) {
      const new_value = context[action]();
      const old_value = prev_values[action];
      if (new_value !== old_value) {
        CalendarController.observers[action]?.forEach(fn => fn(new_value));
        new_values[action] = new_value;
      };
    };
    return { ...prev_values, ...new_values }
  }, {});

  return (
    <CalendarContext.Provider value={context}>
      {props.children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => useContext(CalendarContext);