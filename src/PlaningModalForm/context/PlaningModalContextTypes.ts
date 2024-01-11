import { TRepeatRate } from "../../Calendar";
import { REPEAT_RATE_DAYS } from "../../shared/lib/constants";
import { TPlaningModalFormProps } from "../ui/PlaningModalTypes";
import { PlaningModalController } from "../controller";

export type TPlaningModalState = {
  title: string;
  username: string;
  type: string;
  is_allday_meeting: boolean,
  is_repeated: boolean,
  start_time: string,
  end_time: string,
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
  initialize(data: TPlaningModalFormProps): void;
  get_controller(): PlaningModalController;
  get_context_value<T extends TPlaningModalState, U extends keyof TPlaningModalState>(field_name: U): T[U]
  set_context_value(field_name: keyof TPlaningModalState, value: TPlaningModalState[typeof field_name]): void
  change_repeat_week_days(value: REPEAT_RATE_DAYS): void;
  toggle_is_repeats_quantity(): void;
  set_store_to_default(): void
  get_form_data(): Partial<TPlaningModalState>
};

export type TPlaningModalStore = Partial<TPlaningModalFormProps> & {
  state: Partial<TPlaningModalState>;
};