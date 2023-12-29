import {
  Calendar,
  CalendarDataProvider,
  CalendarController,
  CalendarView,
  CalendarConfig,
  CalendarDataAdapter
} from "./Calendar";
import { AsideEvents } from "./AsideEvents";

import "./App.css";

export const App = () => {
  const calendar_data_provider = new CalendarDataProvider(new CalendarDataAdapter())
  const calendar_controller = new CalendarController()
  const calendar_view = new CalendarView() // Если не передавать mode - будет year
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
