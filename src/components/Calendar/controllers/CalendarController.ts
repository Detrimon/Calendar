import { Accessor, Setter, createSignal } from "solid-js";

export class CalendarController {
  signals: {
    get_today: Accessor<Date> | null;
    set_today: Setter<Date> | null;
  };

  constructor() {
    this.signals = {
      get_today: null,
      set_today: null,
    };
  }

  initialize() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const [get_today, set_today] = createSignal(today);

    this.signals = {
      get_today,
      set_today,
    };
  }

  get_today() {
    return this.signals?.get_today && this.signals.get_today();
  }

  set_today() {
    this.signals.set_today && this.signals.set_today(new Date());
  }
}
