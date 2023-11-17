import { ParentComponent, createContext, useContext } from "solid-js";

import { CalendarController } from "../controller/CalendarController";
import { CalendarProps } from "../ui/CalendarTypes";
import { CalendarEvents } from "../controller/CalendarEvents";
import { CalendarEventsProvider } from "../data_provider/CalendarEventsProvider";

export const CalendarContext = createContext<CalendarProps>({
  controller: new CalendarController(),
  events: new CalendarEvents(new CalendarEventsProvider())
});

export const CalendarProvider: ParentComponent<CalendarProps> = (props) => (
  <CalendarContext.Provider value={{
    controller: props.controller,
    events: props.events
  }}>
    {props.children}
  </CalendarContext.Provider>
);

export const useCalendarContext = () => useContext(CalendarContext);