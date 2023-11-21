import { Calendar } from "./Calendar"
import { CalendarController } from "./Calendar/controller/CalendarController";
import { CalendarEventsProvider } from "./Calendar/data_provider/CalendarEventsProvider";
import { CalendarEvents } from "./Calendar/controller/CalendarEvents";
import { CalendarConfig } from "./Calendar/ui/CalendarConfig";

import "./App.css";
import { CalendarProvider } from "./Calendar/context/CalendarContext";

export const App = () => {
  const controller = new CalendarController();
  const events = new CalendarEvents(new CalendarEventsProvider());  
  const configs = new CalendarConfig()
  
  return <Calendar controller={controller} configs={configs} />
};
