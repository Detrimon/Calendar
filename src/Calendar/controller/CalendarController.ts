import { Accessor, Resource, Setter, createResource, createSignal, onMount } from "solid-js";
import { get_holidays } from "../utils/get_holidays";
import type { Observers, CalendarActions, Observer } from "./CalendarControllerTypes";


type TInitializeProps = {
  year: number;
  selected_date: Date
}
export class CalendarController {
  readonly observers: Observers;
  signals: {
    get_selected_date: Accessor<Date> | null;
    set_selected_date: Setter<Date> | null;
    get_year: Accessor<number> | null;
    set_year: Setter<number> | null;
    get_public_holidays: Accessor<Date[]> | null,
    set_public_holidays: Setter<Date[]> | null
  };

  constructor() {
    this.signals = {
      get_year: null,
      set_year: null,
      get_selected_date: null,
      set_selected_date: null,
      get_public_holidays: null,
      set_public_holidays: null
    };
    this.get_selected_date = this.get_selected_date.bind(this);
    this.observers = {}
  };

  subscribe(event: CalendarActions, observer: Observer) {
    if (this.observers[event] === undefined) {
      this.observers[event] = [];
    }
    this.observers[event]?.push(observer);
  };

  initialize({year, selected_date}: TInitializeProps) {
    const [get_year, set_year] = createSignal(year);
    const [get_selected_date, set_selected_date] = createSignal(selected_date);
    const [get_public_holidays, set_public_holidays] = createSignal<Date[]>([]);

    this.signals = {
      get_year,
      set_year,
      get_selected_date,
      set_selected_date,
      get_public_holidays,
      set_public_holidays
    };

    onMount(async () => {
      const holidays = await get_holidays(year);
      set_public_holidays(holidays);
    });
  }

  get_holidays() {
    return this.signals.get_public_holidays && this.signals.get_public_holidays();
  }

  async set_holidays(year: number) {
    const holidays = await get_holidays(year);
    return this.signals.set_public_holidays && this.signals.set_public_holidays(holidays);
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
    if (this.signals.set_year && this.signals.set_public_holidays) {
      this.signals.set_year(year);
      this.set_holidays(year);
    }
  }

  get_selected_date() {
    return this.signals.get_selected_date && this.signals.get_selected_date();
  }

  set_selected_date(date: Date) {
    return this.signals.set_selected_date && this.signals.set_selected_date(date);
  }
};
