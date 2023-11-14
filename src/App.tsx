import "./App.css";
import { Calendar } from "./components/Calendar/Calendar";
import { CalendarProvider } from "./components/Calendar/context/CalendarContext";
import { CalendarController } from "./components/Calendar/controllers/CalendarController";

function App() {
  let calendarController = new CalendarController();
  
  return (
    <CalendarProvider controller={calendarController}>
      <Calendar />
    </CalendarProvider>
  );
}

export default App;
