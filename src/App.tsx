import { Calendar } from "./Calendar/ui/Calendar";
import { CalendarDataProvider } from "./Calendar/data_provider/CalendarDataProvider";
import { CalendarController } from "./Calendar/controller/CalendarController";
import { CalendarView } from "./Calendar/ui/CalendarView/CalendarView";
import { CalendarConfig } from "./Calendar/config/CalendarConfig";
import { CalendarDataAdapter } from "./Calendar/data_adapter/CalendarDataAdapter";
import { AsideEvents } from "./AsideEvents/AsideEvents";

import "./App.css";

export const App = () => {
  const calendar_data_provider = new CalendarDataProvider(new CalendarDataAdapter())
  const calendar_controller = new CalendarController()
  const calendar_view = new CalendarView()
  const calendar_config = new CalendarConfig({}) // Если конфиг дефолтный - можно не делать
  
  return (
    <div class="container">
      <Calendar
        data_provider={calendar_data_provider}
        controller={calendar_controller}
        view={calendar_view}
        config={calendar_config}
      />
      <AsideEvents subscribe={calendar_controller.subscribe } />
    </div>
  );
};
