import { ParentComponent, createContext, useContext } from "solid-js";

import { CalendarController } from "../controller/CalendarController";
import { CalendarProps } from "../ui/CalendarTypes";

export const CalendarContext = createContext<CalendarProps>({
  controller: new CalendarController()
});

export const CalendarProvider: ParentComponent<CalendarProps> = (props) => (
  <CalendarContext.Provider value={{ controller: props.controller }}>
    {props.children}
  </CalendarContext.Provider>
);

export const useCalendarContext = () => useContext(CalendarContext);