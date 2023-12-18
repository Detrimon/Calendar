import { get_current_month, get_current_year, get_today } from "../../shared/lib/helpers";
import type { CalendarConfigProps } from "./CalendarConfigTypes";

export class CalendarConfig {
  year: CalendarConfigProps["year"];
  month: CalendarConfigProps["month"];
  selected_date: CalendarConfigProps["selected_date"];

  constructor(params: CalendarConfigProps) {
    this.year =
      typeof params.year === "number" ? params.year : get_current_year();
    this.month =
      typeof params.month === "number" ? params.month : get_current_month();
    this.selected_date = params.selected_date
      ? params.selected_date
      : get_today();

    return this;
  }
}
