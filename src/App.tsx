import "./App.css";
import { Calendar } from "./components/Calendar/Calendar";
import { CalendarController } from "./components/Calendar/controllers/CalendarController";

function App() {
  let calendarController = new CalendarController();
  return (
    <>
      <Calendar controller={calendarController} />
    </>
  );
}

export default App;
