import { TRepeatRate } from "../../Calendar";
import { PlaningModalProps} from "./PlaningModalTypes";

export class PlaningModalConfig {
  is_allday_meeting: PlaningModalProps["is_allday_meeting"];
  is_repeated: PlaningModalProps['is_repeated'];
  time_start: PlaningModalProps["time_start"];
  time_end: PlaningModalProps["time_end"];
  repeat_rate: PlaningModalProps["repeat_rate"];
  repeat_every_week_row: PlaningModalProps["repeat_every_week_row"];
  repeat_week_days: PlaningModalProps["repeat_week_days"];
  start_date: PlaningModalProps["start_date"];
  end_date: PlaningModalProps["end_date"];
  is_repeat_infinitely: PlaningModalProps["is_repeat_infinitely"];
  is_repeats_quantity: PlaningModalProps["is_repeats_quantity"];
  finish_repeats_quantity: PlaningModalProps["finish_repeats_quantity"];
  

  constructor(params: PlaningModalProps) {
    this.is_allday_meeting =
      typeof params.is_allday_meeting === "boolean" ? params.is_allday_meeting : false;
    this.is_repeated =
      typeof params.is_repeated === "boolean" ? params.is_repeated : true;
    this.time_start =
      typeof params.time_start === "string" ? params.time_start : '';
    this.time_end =
      typeof params.time_end === "string" ? params.time_end : '';
    this.repeat_rate = 
      typeof params.repeat_rate === "string" ? params.repeat_rate : TRepeatRate.WEEK;
    this.repeat_every_week_row = 
      typeof params.repeat_every_week_row === "number" ? params.repeat_every_week_row : 1;
    this.repeat_week_days = 
      Array.isArray(params.repeat_week_days) ? params.repeat_week_days : ["monday", "thursday"];
    
    
//! ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ тип






    
    
    
    



    return this;
  };
}
