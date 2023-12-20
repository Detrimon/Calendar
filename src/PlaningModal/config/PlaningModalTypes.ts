import { TRepeatRate } from "../../Calendar";
import { REPEAT_RATE_DAYS } from "../../shared/lib/constants";

export interface IPlaningModal{
  is_allday_meeting: boolean,
  is_repeated: boolean,
  time_start: string,
  time_end: string,
  repeat_rate: TRepeatRate,
  repeat_every_week_row: number,
  repeat_week_days: REPEAT_RATE_DAYS[],
  start_date: string,
  end_date: string,
  is_repeat_infinitely: boolean,
  is_repeats_quantity: boolean,
  finish_repeats_quantity: number
};

export type PlaningModalProps = Partial<IPlaningModal>;