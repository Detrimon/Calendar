import { ParentComponent, createContext, useContext } from "solid-js";

import { CalendarController } from "../controllers/CalendarController";
import { CalendarProps } from "../lib/types";

export const CalendarContext = createContext<CalendarProps>({
  controller: new CalendarController()
});

export const CalendarProvider: ParentComponent<CalendarProps> = (props) => (
  <CalendarContext.Provider value={{ controller: props.controller }}>
    {props.children}
  </CalendarContext.Provider>
);

export const useCalendarContext = () => useContext(CalendarContext);