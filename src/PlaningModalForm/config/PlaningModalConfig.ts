import { TRepeatRate } from "../../Calendar";
import { TPlaningModalState } from "../context";

export class PlaningModalConfig {
  title: TPlaningModalState["title"];
  is_allday_meeting: TPlaningModalState["is_allday_meeting"];
  is_periodic: TPlaningModalState['is_periodic'];
  start_time: TPlaningModalState["start_time"];
  end_time: TPlaningModalState["end_time"];
  repeat_rate: TPlaningModalState["repeat_rate"];
  repeat_every_week_row: TPlaningModalState["repeat_every_week_row"];
  repeat_week_days: TPlaningModalState["repeat_week_days"];
  start_date: TPlaningModalState["start_date"];
  end_date: TPlaningModalState["end_date"];
  is_repeat_infinitely:TPlaningModalState["is_repeat_infinitely"];
  is_repeats_quantity: TPlaningModalState["is_repeats_quantity"];
  finish_repeats_quantity: TPlaningModalState["finish_repeats_quantity"];
  
  constructor(params: Partial<TPlaningModalState>) {
    this.title =
      typeof params.title === "string" ? params.title : '';
    this.is_allday_meeting =
      typeof params.is_allday_meeting === "boolean" ? params.is_allday_meeting : true;
    this.is_periodic =
      typeof params.is_periodic === "boolean" ? params.is_periodic : false;
    this.start_time =
      typeof params.start_time === "string" ? params.start_time : '00:00:00';
    this.end_time =
      typeof params.end_time === "string" ? params.end_time : '00:00:00';
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
