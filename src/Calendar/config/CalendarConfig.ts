import { get_current_month, get_current_year, get_today } from "../../shared/lib/helpers";
import { CalendarViewMode } from "../ui/CalendarView/CalendarViewTypes";
import type { CalendarConfigProps } from "./CalendarConfigTypes";

export class CalendarConfig {
  year: CalendarConfigProps["year"];
  month: CalendarConfigProps["month"];
  selected_date: CalendarConfigProps["selected_date"];
  events_params: CalendarConfigProps["events_params"];
  calendar_mode: CalendarConfigProps["calendar_mode"];

  constructor(params: CalendarConfigProps) {
    this.year =
      typeof params.year === "number" ? params.year : get_current_year();
    this.month =
      typeof params.month === "number" ? params.month : get_current_month();
    this.selected_date = params.selected_date
      ? params.selected_date
      : get_today();
    this.events_params = params.events_params ? params.events_params : {
      date_from: new Date(),
      date_to: new Date(),
      time_from: '00:00:00',
      time_to: '23:59:59'
    };
    this.calendar_mode = params.calendar_mode ? params.calendar_mode : CalendarViewMode.YEAR;

    return this;
  }
}
