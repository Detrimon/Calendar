import { REPEAT_RATE_DAYS } from "../../shared/lib/constants";
import { TPlaningModalState, TPlaningModalStateMethods } from "../context";

export class PlaningModalController{
  context: TPlaningModalStateMethods | null;
  data_provider: null;

  constructor() {
    this.context = null;
    this.data_provider = null;
  };

  initialize(context: TPlaningModalStateMethods) {
    this.context = context;
  };

  get_context() {
    if (!this.context)
      throw Error('PlaningModalController instance has not "context" property');
    return this.context;
  };

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

  // TODO Для проверки логики заполнения
  check() {
    const context = this.get_context();

    const is_allday_meeting = context.get_context_value('is_allday_meeting');
    const time_start = context.get_context_value('time_start');
    const time_end = context.get_context_value('time_end');
    const start_date = context.get_context_value('start_date');
    const end_date = context.get_context_value('end_date');

    if (!is_allday_meeting && !time_start && !time_end) return false;
  };

  // TODO Для получения объекта Планировщика
  get_scheduling() {
    
  };

  clear() {
    const context = this.get_context();
    context.set_store_to_default();
  };
};