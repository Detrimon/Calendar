import { TRepeatRate } from "../../Calendar";
import { TPlaningModalState } from "../context";

export class PlaningModalConfig {
  is_allday_meeting: TPlaningModalState["is_allday_meeting"];
  is_repeated: TPlaningModalState['is_repeated'];
  time_start: TPlaningModalState["time_start"];
  time_end: TPlaningModalState["time_end"];
  repeat_rate: TPlaningModalState["repeat_rate"];
  repeat_every_week_row: TPlaningModalState["repeat_every_week_row"];
  repeat_week_days: TPlaningModalState["repeat_week_days"];
  start_date: TPlaningModalState["start_date"];
  end_date: TPlaningModalState["end_date"];
  is_repeat_infinitely:TPlaningModalState["is_repeat_infinitely"];
  is_repeats_quantity: TPlaningModalState["is_repeats_quantity"];
  finish_repeats_quantity: TPlaningModalState["finish_repeats_quantity"];
  
  constructor(params: Partial<TPlaningModalState>) {
    this.is_allday_meeting =
      typeof params.is_allday_meeting === "boolean" ? params.is_allday_meeting : false;
    this.is_repeated =
      typeof params.is_repeated === "boolean" ? params.is_repeated : true;
    this.time_start =
      typeof params.time_start === "string" ? params.time_start : '';
    this.time_end =
      typeof params.time_end === "string" ? params.time_end : '';
       this.start_date =
      typeof params.start_date === "string" ? params.start_date : '';
    this.end_date =
      typeof params.end_date === "string" ? params.end_date : '';
    this.repeat_rate = 
      typeof params.repeat_rate === "string" ? params.repeat_rate : TRepeatRate.WEEK;
    this.repeat_every_week_row = 
      typeof params.repeat_every_week_row === "number" ? params.repeat_every_week_row : 1;
    this.repeat_week_days = 
      Array.isArray(params.repeat_week_days) ? params.repeat_week_days : ["MONDAY", "TUESDAY"];
    this.is_repeat_infinitely =
      typeof params.is_repeat_infinitely === "boolean" ? params.is_repeat_infinitely : false;
    this.is_repeats_quantity =
      typeof params.is_repeats_quantity === "boolean" ? params.is_repeats_quantity : true;
    this.finish_repeats_quantity = 
      typeof params.finish_repeats_quantity === "number" ? params.finish_repeats_quantity : 10;

    return this;
  };
};
