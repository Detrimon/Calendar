import { get_current_year, get_today } from "../helpers/calendar_helpers";
import type { CalendarConfigProps } from "./CalendarConfigTypes";

export class CalendarConfig {
  year: CalendarConfigProps["year"];
  selected_date: CalendarConfigProps["selected_date"];
  events_params: CalendarConfigProps["events_params"];

  constructor(params: CalendarConfigProps) {
    this.year =
      typeof params.year === "number" ? params.year : get_current_year();
    this.selected_date = params.selected_date
      ? params.selected_date
      : get_today();
    this.events_params = params.events_params ? params.events_params : [];

    return this;
  }
}
