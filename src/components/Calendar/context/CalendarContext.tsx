import { ParentComponent, createContext, useContext } from "solid-js";

import { CalendarController } from "../controllers/CalendarController";

type CalendarContextType = {
  events?: null,
  controller: CalendarController,
  view?: null
};

export const CalendarContext = createContext<CalendarContextType>({
  controller: new CalendarController()
});

export const CalendarProvider: ParentComponent<CalendarContextType> = (props) => {
  return (
    <CalendarContext.Provider value={{ controller: props.controller }}>
      {props.children}
    </CalendarContext.Provider>
  )
};

export const useCartContext = () => useContext(CalendarContext);