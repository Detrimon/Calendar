import { Calendar } from "./components/Calendar/Calendar";
import { CalendarController } from "./components/Calendar/controllers/CalendarController";

import "./App.css";

export const App = () => {
  let calendarController = new CalendarController();
  
  return <Calendar controller={calendarController} />
};
