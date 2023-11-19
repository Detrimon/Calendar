import { Calendar } from "./Calendar"
import { CalendarController } from "./Calendar/controller/CalendarController";
import { CalendarEventsProvider } from "./Calendar/data_provider/CalendarEventsProvider";
import { CalendarEvents } from "./Calendar/controller/CalendarEvents";

import "./App.css";

export const App = () => {
  const controller = new CalendarController();
  const events = new CalendarEvents(new CalendarEventsProvider());  
  
  return <Calendar controller={controller} events={events}/>
};
