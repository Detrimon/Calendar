import { TRepeatRate } from "../../Calendar";
import { REPEAT_RATE_DAYS } from "../../shared/lib/constants";
import { TPlaningModalStateMethods } from "../context/PlaningModalContextTypes";

export class PlaningModalController{
  context: TPlaningModalStateMethods | null;

  constructor() {
    this.context = null;
  };

  initialize(context: TPlaningModalStateMethods) {
    this.context = context;
  };

  get_context() {
    if (!this.context)
      throw Error('PlaningModalController instance has not "context" property');
    return this.context;
  };

  set_is_allday_meeting(value: boolean) {
    const context = this.get_context();
    context.set_is_allday_meeting(value)
  };

  set_is_repeated(value: boolean) {
    const context = this.get_context();
    context.set_is_repeated(value);
  };

  set_time_start(value: string){
    const context = this.get_context();
    context.set_time_start(value);
  };

  set_time_end(value: string){
    const context = this.get_context();
    context.set_time_end(value);
  };

  set_repeat_rate(value: TRepeatRate){
    const context = this.get_context();
    context.set_repeat_rate(value);
  };

  set_repeat_every_week_row(value: number){
    const context = this.get_context();
    context.set_repeat_every_week_row(value);
  };

  change_repeat_week_days(value: REPEAT_RATE_DAYS){
    const context = this.get_context();
    context.change_repeat_week_days(value);
  };

  set_start_date(value: string){
    const context = this.get_context();
    context.set_start_date(value);
  };

  set_end_date(value: string){
    const context = this.get_context();
    context.set_end_date(value);
  };

  set_is_repeat_infinitely(value: boolean){
    const context = this.get_context();
    context.set_is_repeat_infinitely(value);
  };

  set_is_repeats_quantity(value: boolean){
    const context = this.get_context();
    context.set_is_repeats_quantity(value);
  };

  toggle_is_repeats_quantity() {
    const context = this.get_context();
    context.toggle_is_repeats_quantity()
  };

  set_finish_repeats_quantity(value: number){
    const context = this.get_context();
    context.set_finish_repeats_quantity(value);
  };
};