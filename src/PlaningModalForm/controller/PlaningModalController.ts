import { REPEAT_RATE_DAYS } from "../../shared/lib/constants";
import { TPlaningModalState, TPlaningModalStateMethods } from "../context";
import { TErrorsData } from "./PlaningModalControllerTypes";

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

    const is_valid: TErrorsData = {
      title: {
        status: true,
        title: 'Не введёно название события '
      },
      time: {
        status: true,
        title: 'Время события'
      },
      repeat_every_week_row: {
        status: true,
        title: 'Поле "Повторять каждую неделю"'
      },
      repeat_week_days: {
        status: true,
        title: 'Дни недели'
      },
      start_date: {
        status: true,
        title: 'Дата начала'
      },
      end_date: {
        status: true,
        title: 'Дата окончания'
      },
      finish_repeats_quantity: {
        status: true,
        title: 'Поле "Завершить после повторений"'
      },
      date_diapason: {
        status: true,
        title: 'Не корректный диапазон дат'
      },
      total: {
        status: true,
        title: ''
      }
    };
    

    const title = context.get_context_value('title');
    const is_allday_meeting = context.get_context_value('is_allday_meeting');
    const is_periodic = context.get_context_value('is_periodic');
    const start_time = context.get_context_value('start_time');
    const end_time = context.get_context_value('end_time');
    const repeat_every_week_row = context.get_context_value('repeat_every_week_row');
    const repeat_week_days = context.get_context_value('repeat_week_days');
    const is_repeat_infinitely = context.get_context_value('is_repeat_infinitely');
    const is_repeats_quantity = context.get_context_value('is_repeats_quantity');
    const finish_repeats_quantity = context.get_context_value('finish_repeats_quantity');
    const start_date = context.get_context_value('start_date');
    const end_date = context.get_context_value('end_date');

    if (title.length === 0) {
      is_valid.title.status = false;
      is_valid.total.status = false;
    }
    if (!is_allday_meeting && (start_time.length === 0 || end_time.length === 0)) {
      is_valid.time.status = false;
      is_valid.total.status = false;
    };
    if (is_periodic && repeat_every_week_row < 1) {
      is_valid.repeat_every_week_row.status = false;
      is_valid.total.status = false;
    };
    if (is_periodic && repeat_week_days.length === 0) {
      is_valid.repeat_week_days.status = false;
      is_valid.total.status = false;
    };
    if (is_periodic && start_date.length === 0) {
      is_valid.start_date.status = false;
      is_valid.total.status = false;
    };
    if (is_periodic && !is_repeat_infinitely && end_date.length === 0) {
      is_valid.end_date.status= false;
      is_valid.total.status = false;
    };
    if (is_periodic && is_repeats_quantity && finish_repeats_quantity < 1) {
      is_valid.finish_repeats_quantity.status = false;
      is_valid.total.status = false;
    };
    if (is_periodic && !is_repeat_infinitely && start_date > end_date) {
      is_valid.date_diapason.status = false;
      is_valid.total.status = false;
    };

    return is_valid;
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