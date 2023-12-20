import { TRepeatRate } from "../Calendar";
import { REPEAT_RATE_DAYS } from "../shared/lib/constants";

export type TPlaningModalProps = {
  show: boolean;
  onModalHide: () => void;
};

export type FORM_STORE = {
  is_allday_meeting: boolean,
  is_repeated: boolean,
  time_period: {
    start: string,
    end: string
  },
  repeat_rate: TRepeatRate,
  repeat_rate_custom: {
    repeat_every_week_row: number,
    week_days: REPEAT_RATE_DAYS[]
  },
  repeat_limits: {
    start_date: string,
    is_infinitely: boolean,
    end_date: string,
    is_repeats_quantity: boolean,
    finish_repeats_quantity: number
  }
};