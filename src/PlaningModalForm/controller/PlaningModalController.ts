import { REPEAT_RATE_DAYS } from "../../shared/lib/constants";
import { TPlaningModalState, TPlaningModalStateMethods } from "../context";

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

  get_form_data() {
    const context = this.get_context();
    return context.get_form_data();
  }

  set_context_value(field_name: keyof TPlaningModalState, value: TPlaningModalState[typeof field_name]) {
    const context = this.get_context();
    context.set_context_value(field_name, value);
  };

  change_repeat_week_days(value: REPEAT_RATE_DAYS){
    const context = this.get_context();
    context.change_repeat_week_days(value);
  };

  toggle_is_repeats_quantity() {
    const context = this.get_context();
    context.toggle_is_repeats_quantity();
  };

  check() {
    const context = this.get_context();

    const is_allday_meeting = context.get_context_value('is_allday_meeting');
    const is_repeated = context.get_context_value('is_repeated');
    const time_start = context.get_context_value('time_start');
    const time_end = context.get_context_value('time_end');
    const repeat_every_week_row = context.get_context_value('repeat_every_week_row');
    const repeat_week_days = context.get_context_value('repeat_week_days');
    const is_repeat_infinitely = context.get_context_value('is_repeat_infinitely');
    const is_repeats_quantity = context.get_context_value('is_repeats_quantity');
    const finish_repeats_quantity = context.get_context_value('finish_repeats_quantity');
    const start_date = context.get_context_value('start_date');
    const end_date = context.get_context_value('end_date');

    if (!is_allday_meeting && (time_start.length === 0 || time_end.length === 0)) return false;
    if (is_repeated && repeat_every_week_row < 1) return false;
    if (is_repeated && repeat_week_days.length === 0) return false;
    if (is_repeated && start_date.length === 0) return false;
    if (is_repeated && !is_repeat_infinitely && end_date.length === 0) return false;
    if (is_repeated && is_repeats_quantity && finish_repeats_quantity < 1) return false;

    // TODO сделать проверку на дата начала > дата окончания

    return true;
  };

  get_scheduling() {
    const context = this.get_context();
    return context.get_form_data();
  };

  clear() {
    const context = this.get_context();
    context.set_store_to_default();
  };
};