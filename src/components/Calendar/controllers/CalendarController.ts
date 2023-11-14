import { Accessor, Setter, createSignal } from "solid-js";

export class CalendarController {
  signals: {
    get_today: Accessor<Date> | null;
    set_today: Setter<Date> | null;
    get_year: Accessor<number> | null;
    set_year: Setter<number> | null;
  };

  constructor() {
    this.signals = {
      get_today: null,
      set_today: null,
      get_year: null,
      set_year: null,
    };
  }

  initialize() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const [get_today, set_today] = createSignal(today);
    const [get_year, set_year] = createSignal(today.getFullYear());

    this.signals = {
      get_today,
      set_today,
      get_year,
      set_year,
    };
  }

  get_today() {
    return this.signals?.get_today && this.signals.get_today();
  }

  set_today() {
    this.signals.set_today && this.signals.set_today(new Date());
  }

  get_year() {
    return this.signals.get_year && this.signals.get_year();
  }

  set_year(year: number) {
    return this.signals.set_year && this.signals.set_year(year);
  }
}
