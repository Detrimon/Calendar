import { Accessor, Resource, Setter, batch, createResource, createSignal, onMount } from "solid-js";
import { get_repeated_events, get_unique_events } from "../utils/get_events";
import { EventsParams, ICalendarEventsProvider } from "./CalendarEventsProviderTypes";

export class CalendarEventsProvider implements ICalendarEventsProvider {
  signals: {
    unique_events_params: Accessor<EventsParams> | null;
    set_unique_events_params: Setter<EventsParams> | null;
    repeated_events_params: Accessor<EventsParams> | null;
    set_repeated_events_params: Setter<EventsParams> | null;
    get_events: Accessor<CalendarEventsInterface[]> | null;
    set_events: Setter<CalendarEventsInterface[]> | null;
  };

  // resources: {
  //   unique_events_resource: Resource<CalendarEventsInterface>,
  //   repeated_events_resource: Resource<CalendarEventsInterface>
  // }

  constructor() {
    this.signals = {
      unique_events_params: null,
      set_unique_events_params: null,
      repeated_events_params: null,
      set_repeated_events_params: null,
      events: CalendarEventsInterface[]
    };
 


    
    // const [unique_events] = createResource(unique_events_params, get_unique_events);
    // const [repeated_events] = createResource(repeated_events_params, get_repeated_events);

    

    // this.resources = {
    //   unique_events_resource: unique_events,
    //   repeated_events_resource: repeated_events
    // };
  };

  initialize(events_params: EventsParams) {
    const [unique_events_params, set_unique_events_params] = createSignal(events_params);
    const [repeated_events_params, set_repeated_events_params] = createSignal(events_params);
    const [get_events, set_events] = createSignal<CalendarEventsInterface[]>([]);

    this.signals = {
      unique_events_params,
      set_unique_events_params,
      repeated_events_params,
      set_repeated_events_params,
      get_events,
      set_events
    };

    onMount(async () => {
      const unique_events = await get_unique_events(events_params);
      const repeated_events = await get_repeated_events(events_params);
      // const holidays = await get_holidays(year);
      // set_public_holidays(holidays);
    });
  };

  get_unique_events() {
    return this.resources.unique_events_resource();
  };

  get_repeated_events() {
    return this.resources.repeated_events_resource();
  };

  // TODO Имплементировать функцию, когда появится чёткое представление о структуре repeated_events. Нужна функция transform 
  get_events(params: EventsParams): CalendarEventsInterface[] {
    batch(() => {
      this.set_repeated_events_params(params);
      this.set_unique_events_params(params);
    });
    

    const result = {
      ...this.get_unique_events(),
      ...this.get_repeated_events()
    }

    return []
  };

  set_unique_events_params(params: EventsParams) {
    this.signals.set_unique_events_params(params)
  };

  set_repeated_events_params(params: EventsParams) {
    this.signals.set_repeated_events_params(params)
  };
};
