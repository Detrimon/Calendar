import { Accessor, Resource, Setter, createResource, createSignal } from "solid-js";
import { get_holidays } from "../utils/get_holidays";
import type { Observers, CalendarActions, Observer } from "./CalendarControllerTypes";

export class CalendarController {
  readonly observers: Observers;
  signals: {
    get_selected_date: Accessor<Date> | null;
    set_selected_date: Setter<Date> | null;
    get_year: Accessor<number> | null;
    set_year: Setter<number> | null;
  };
  public_holidays_resource: Resource<Date[]> | null;

  constructor() {
    this.signals = {
      get_year: null,
      set_year: null,
      get_selected_date: null,
      set_selected_date: null,
    };
    this.public_holidays_resource = null;
    this.get_selected_date = this.get_selected_date.bind(this);
    this.observers = {}
  };

  subscribe(event: CalendarActions, observer: Observer) {
    if (this.observers[event] === undefined) {
      this.observers[event] = [];
    }
    this.observers[event]?.push(observer);
  };

  initialize() {
    const [get_year, set_year] = createSignal(new Date().getFullYear());
    const [get_selected_date, set_selected_date] = createSignal(this.get_today());
    const [public_holidays] = createResource(get_year, get_holidays);

    this.signals = {
      get_year,
      set_year,
      get_selected_date,
      set_selected_date
    };
    this.public_holidays_resource = public_holidays;
  }

  get_holidays() {
    return this.public_holidays_resource && this.public_holidays_resource();
  }

  get_today() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today
  }

  get_year() {
    return this.signals.get_year && this.signals.get_year();
  }

  set_year(year: number) {
    return this.signals.set_year && this.signals.set_year(year);
  }

  get_selected_date() {
    return this.signals.get_selected_date && this.signals.get_selected_date();
  }

  set_selected_date(date: Date) {
    return this.signals.set_selected_date && this.signals.set_selected_date(date);
  }
}
