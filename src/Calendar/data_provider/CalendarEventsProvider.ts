import { Accessor, Resource, Setter, createResource, createSignal } from "solid-js";
import { get_unique_events } from "../utils/get_events";
import { EventsParams } from "./CalendarEventsProviderTypes";

export class CalendarEventsProvider {
  signals: {
    unique_events_params: Accessor<EventsParams>;
    set_unique_events_params: Setter<EventsParams>;
    repeated_events_params: Accessor<EventsParams>;
    set_repeated_events_params: Setter<EventsParams>;
  };

  resources: {
    unique_events_resource: Resource<CalendarEventsInterface>,
    repeated_events_resource: Resource<CalendarEventsInterface>
  }

  constructor() {
    const defaultParams: EventsParams = {
      date_from: new Date(),
      date_to: new Date(),
      time_from: '00:00:00',
      time_to: '23:59:59'
    };

    const [unique_events_params, set_unique_events_params] = createSignal(defaultParams);
    const [repeated_events_params, set_repeated_events_params] = createSignal(defaultParams);
    const [unique_events] = createResource(unique_events_params, get_unique_events);
    const [repeated_events] = createResource(repeated_events_params, get_unique_events);

    this.signals = {
      unique_events_params,
      set_unique_events_params,
      repeated_events_params,
      set_repeated_events_params
    };

    this.resources = {
      unique_events_resource: unique_events,
      repeated_events_resource: repeated_events
    };
  };

  initialize(params: EventsParams) {
    this.set_repeated_events_params(params);
    this.set_unique_events_params(params);
  };

  get_unique_events() {
    return this.resources.unique_events_resource();
  };

  get_repeated_events() {
    return this.resources.repeated_events_resource();
  };

  // TODO Имплементировать функцию, когда появится чёткое представление о структуре repeated_events. Нужна функция transform 
  get_events() {
    const result = {
      ...this.get_unique_events(),
      ...this.get_repeated_events()
    }
    return result
  };

  set_unique_events_params(params: EventsParams) {
    return this.signals.set_unique_events_params(params)
  };

  set_repeated_events_params(params: EventsParams) {
    return this.signals.set_repeated_events_params(params)
  };
};

