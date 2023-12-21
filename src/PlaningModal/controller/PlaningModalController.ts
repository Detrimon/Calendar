import { REPEAT_RATE_DAYS } from "../../shared/lib/constants";
import { TPlaningModalState, TPlaningModalStateMethods } from "../context/PlaningModalContextTypes";

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

  set_context_value(field_name: keyof TPlaningModalState, value: TPlaningModalState[typeof field_name]) {
    const context = this.get_context();
    context.set_context_value(field_name, value)
  };

  change_repeat_week_days(value: REPEAT_RATE_DAYS){
    const context = this.get_context();
    context.change_repeat_week_days(value);
  };

  toggle_is_repeats_quantity() {
    const context = this.get_context();
    context.toggle_is_repeats_quantity()
  };
};