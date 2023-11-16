import { SetStoreFunction, createStore } from "solid-js/store";
import { CalendarEventsProvider } from "../data_provider/CalendarEventsProvider";

export class CalendarEvents{
  events: CalendarDayEventsInterface[]
  set_events: SetStoreFunction<CalendarDayEventsInterface[]> | null
  eventsProvider: CalendarEventsProvider

  constructor(eventsProvider: CalendarEventsProvider) {
    const [events, set_events] = createStore<CalendarEventsInterface[]>([]);
    this.events = events;
    this.set_events = set_events;

    this.eventsProvider = eventsProvider;
  }

  initialize() {
    this.eventsProvider.get_events()
  }

}