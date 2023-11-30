import { Accessor, Setter, createSignal } from "solid-js";
import { CalendarViewMode } from "./CalendarViewTypes";

type TCalendarView = {
  mode: CalendarViewMode
}

export class CalendarView{
  signals: {
    get_mode: Accessor<CalendarViewMode>
    set_mode: Setter<CalendarViewMode>
  };
  
  constructor(params?: TCalendarView) {
    const mode = params ? params.mode : CalendarViewMode.YEAR;
    const [get_mode, set_mode] = createSignal(mode);

    this.signals = {
      get_mode,
      set_mode
    };
  };
  
  get_mode() {
    return this.signals.get_mode();
  };

  set_mode(mode: CalendarViewMode) {
    this.signals.set_mode(mode);
  };
};