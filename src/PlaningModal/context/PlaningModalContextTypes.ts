import { TRepeatRate } from "../../Calendar";
import { REPEAT_RATE_DAYS } from "../../shared/lib/constants";
import { TPlaningModalProps } from "../PlaningModalTypes";
import { PlaningModalController } from "../controller/PlaningModalController";

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
  // get_field_value(field_name: keyof TPlaningModalState): string | number | boolean | REPEAT_RATE_DAYS[] | undefined
  // get_field_value(field_name: keyof TPlaningModalState): TPlaningModalState[field_name]

  get_is_allday_meeting(): boolean;
  set_is_allday_meeting(value: boolean): void;
  get_is_repeated(): boolean;
  set_is_repeated(value: boolean): void;
  get_time_start(): string;
  set_time_start(value: string): void;
  get_time_end(): string;
  set_time_end(value: string): void;
  get_repeat_rate(): TRepeatRate;
  set_repeat_rate(value: TRepeatRate): void;
  get_repeat_every_week_row(): number;
  set_repeat_every_week_row(value: number): void;
  get_repeat_week_days(): REPEAT_RATE_DAYS[];
  change_repeat_week_days(value: REPEAT_RATE_DAYS): void;
  get_start_date(): string;
  set_start_date(value: string): void;
  get_end_date(): string;
  set_end_date(value: string): void;
  get_is_repeat_infinitely(): boolean;
  set_is_repeat_infinitely(value: boolean): void;
  get_is_repeats_quantity(): boolean;
  set_is_repeats_quantity(value: boolean): void;
  toggle_is_repeats_quantity(): void;
  get_finish_repeats_quantity(): number;
  set_finish_repeats_quantity(value: number): void;
};

export type TPlaningModalStore = Partial<TPlaningModalProps> & {
  state: Partial<TPlaningModalState>;
};
