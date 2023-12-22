import { TRepeatRate } from "../../Calendar";
import { REPEAT_RATE_DAYS } from "../../shared/lib/constants";
import { TPlaningModalProps } from "../ui/PlaningModalTypes";
import { PlaningModalController } from "../controller";

export type TPlaningModalState = {
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

export type TPlaningModalStateMethods = {
  initialize(data: TPlaningModalProps): void;
  get_controller(): PlaningModalController;
  get_context_value(field_name: keyof TPlaningModalState): TPlaningModalState[typeof field_name] | undefined
  set_context_value(field_name: keyof TPlaningModalState, value: TPlaningModalState[typeof field_name]): void
  change_repeat_week_days(value: REPEAT_RATE_DAYS): void;
  toggle_is_repeats_quantity(): void;
  set_store_to_default(): void
};

export type TPlaningModalStore = Partial<TPlaningModalProps> & {
  state: Partial<TPlaningModalState>;
};
