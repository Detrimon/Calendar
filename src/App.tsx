import { Calendar } from "./Calendar"
import { CalendarController } from "./Calendar/controller/CalendarController";
import { CalendarEventsProvider } from "./Calendar/data_provider/CalendarEventsProvider";

import "./App.css";

export const App = () => {
  const controller = new CalendarController();
  const events_provider = new CalendarEventsProvider();
  
  return <Calendar controller={controller} events_provider={events_provider}/>
};
