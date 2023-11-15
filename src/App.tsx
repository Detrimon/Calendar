import { Calendar } from "./Calendar"
import { CalendarController } from "./Calendar/controller/CalendarController";

import "./App.css";

export const App = () => {
  let calendarController = new CalendarController();
  
  return <Calendar controller={calendarController} />
};
