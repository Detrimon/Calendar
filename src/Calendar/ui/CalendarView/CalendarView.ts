import { Accessor, Setter, createSignal } from "solid-js";
import { CalendarViewMode } from "./CalendarViewTypes";

export class CalendarView{
  signals: {
    get_mode: Accessor<CalendarViewMode> | null
    set_mode: Setter<CalendarViewMode> | null
  };
  
  constructor() {
    this.signals = {
      get_mode: null,
      set_mode: null
    }
  };

  initialize(mode: CalendarViewMode) {
    const [get_mode, set_mode] = createSignal(mode);

    this.signals.get_mode = get_mode;
    this.signals.set_mode = set_mode;
  };

  get_mode() {
    if (!this.signals.get_mode)
      throw Error("CalendarView has not get_mode Accessor");
    return this.signals.get_mode();
  };

  set_mode(mode: CalendarViewMode) {
    if (!this.signals.set_mode)
      throw Error("CalendarView has not set_mode Setter");
    this.signals.set_mode(mode);
  };
};