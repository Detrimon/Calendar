import { SetStoreFunction, createStore } from "solid-js/store";
import { EventsParams, ICalendarEventsProvider } from "../data_provider/CalendarEventsProviderTypes";

export class CalendarEvents{
  events: CalendarEventsInterface[]
  set_events: SetStoreFunction<CalendarEventsInterface[]>
  get_events: (params: EventsParams) => CalendarEventsInterface[]

  constructor(provider: ICalendarEventsProvider) {
    const [events, set_events] = createStore<CalendarEventsInterface[]>([]);
    this.events = events;
    this.set_events = set_events;
    this.get_events = provider.get_events.bind(provider);
  }

  initialize(params: EventsParams) {
    const events = this.get_events(params);
    this.set_calendar_events(events);
  }

  set_calendar_events(events: CalendarEventsInterface[]) {
    this.set_events(events)
  }
}