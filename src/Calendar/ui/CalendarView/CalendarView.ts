import { Accessor, Setter, createSignal } from "solid-js";
import { CalendarViewMode } from "./CalendarViewTypes";

export class CalendarView{
  get_calendar_mode: Accessor<CalendarViewMode> | null
  set_calendar_mode: Setter<CalendarViewMode> | null

  constructor() {
    this.get_calendar_mode = null;
    this.set_calendar_mode = null;
  };

  initialize(mode: CalendarViewMode) {
    const [get_mode, set_mode] = createSignal(mode);

    this.get_calendar_mode = get_mode;
    this.set_calendar_mode = set_mode;
  };

  get_mode() {
    if (!this.get_calendar_mode)
      throw Error("CalendarView has not get_mode Accessor");
    return this.get_calendar_mode();
  };

  set_mode(mode: CalendarViewMode) {
    if (!this.set_calendar_mode)
      throw Error("CalendarView has not set_mode Setter");
    return this.set_calendar_mode && this.set_calendar_mode(mode);
  };
};