import { Show, batch } from "solid-js";
import { createStore } from "solid-js/store";

import { TPlaningModalProps } from "./PlaningModalTypes";
import {
  ALLDAY_MEETING,
  CANCEL, END_DATE,
  INFINITELY,
  REPEAT,
  REPEAT_CYCLE,
  REPEAT_EVERY,
  REPEAT_LIMITS,
  SAVE, START_DATE,
  TIME_PERIOD
} from "./lib/constants";
import { WEEKDAYS_SHORT } from "../shared/lib/constants";

import styles from "./PlaningModal.module.css";
import { get_time_period_options } from "./helpers/planing_modal_helpers";

export const PlaningModal = (props: TPlaningModalProps) => {
  const [form, set_form] = createStore({
    is_allday_meeting: false,
    is_repeated: true,
    time_period: {
      start: "",
      end: ""
    },
    repeat_rate: REPEAT_EVERY,
    repeat_rate_custom: {
      repeat_every_week_row: 1,
      week_days: [WEEKDAYS_SHORT.FR, WEEKDAYS_SHORT.MO]
    },
    repeat_limits: {
      start_date: '',
      is_infinitely: true,
      end_date: '',
      finish_after_repeats: 10,
    }
  });

  const change_repeated_status = (new_value: boolean) => set_form('is_repeated', new_value);
  const change_allday_meeting_status = (new_value: boolean) => set_form('is_allday_meeting', new_value);
  const set_time_period_start = (new_value: string) => {
    batch(() => {
      set_form('time_period', 'start', new_value);
      set_form('time_period', 'end', '');
    });
  };
  const set_time_period_end = (new_value: string) => set_form('time_period', 'end', new_value);

  const submit_handler = (e) => {
    e.preventDefault()
  };

  return (
    <Show when={props.show}>
      <div class={styles.container}>
        <div class={styles.modal}>
          <h5 class={styles.header}>
            Заголовок
            <button class={styles.header_close_button}>
              &#10006;
            </button>
          </h5>

          <form class={styles.form} onSubmit={submit_handler}>

            <div class={styles.row_wrapper}>
              <span>{ALLDAY_MEETING}</span>
              <div>
                <button
                  class={styles.button}
                  classList={{ [styles.button_colored]: form.is_allday_meeting }}
                  onClick={() => change_allday_meeting_status(true)}
                >Да</button>
                <button
                  class={styles.button}
                  classList={{ [styles.button_colored]: !form.is_allday_meeting }}
                  onClick={() => change_allday_meeting_status(false)}
                >Нет</button>
              </div>
            </div>

            <div class={styles.row_wrapper}>
              <span>{TIME_PERIOD}</span>
              <fieldset
                class={styles.buttons_wrapper}
                classList={{ [styles.disabled]: form.is_allday_meeting }}
                disabled={form.is_allday_meeting}
              >

                <span>с</span>
                <input
                  list="time_start_variants"
                  type="time"
                  name="time"
                  value={!form.is_allday_meeting ? form.time_period.start : ''}
                  onChange={(e) => set_time_period_start(e.target.value)}
                />
                <datalist id="time_start_variants">
                  {get_time_period_options().map(option => <option value={option} />)}
                </datalist>

                <span>по</span>
                <input
                  list="time_end_variants"
                  type="time"
                  name="time"
                  value={!form.is_allday_meeting ? form.time_period.end : ''}
                  onChange={(e) => set_time_period_end(e.target.value)}
                />
                <datalist id="time_end_variants">
                  {get_time_period_options({ start: form.time_period.start || undefined}).map(option => <option value={option} />)}
                </datalist>
                
              </fieldset>
            </div>

            <div class={styles.row_wrapper}>
              <span>{REPEAT}</span>
              <div>
                <button
                  class={styles.button}
                  classList={{ [styles.button_colored]: form.is_repeated }}
                  onClick={() => change_repeated_status(true)}
                >Да</button>
                <button
                  class={styles.button}
                  classList={{ [styles.button_colored]: !form.is_repeated }}
                  onClick={() => change_repeated_status(false)}
                >Нет</button>
              </div>
            </div>

            <fieldset
              class={styles.repeat_params}
              classList={{ [styles.disabled]: !form.is_repeated }}
              disabled={!form.is_repeated}
            >
              <h5 class={styles.fieldset_header}>{REPEAT_CYCLE}</h5>

              <fieldset class={styles.fieldset_content}>

                <div class={styles.fieldset_inputs_wrapper}>
                  Повторять:
                  <label>
                    <input type="radio" name="repeat_cycle" value="every_day" checked />
                    {REPEAT_EVERY.DAY}
                  </label>
                  <label>
                    <input type="radio" name="repeat_cycle" value="every_week" />
                    {REPEAT_EVERY.WEEK}
                  </label>
                  <label>
                    <input type="radio" name="repeat_cycle" value="every_month" />
                    {REPEAT_EVERY.MONTH}
                  </label>
                  <label>
                    <input type="radio" name="repeat_cycle" value="every_year" />
                    {REPEAT_EVERY.YEAR}
                  </label>
                </div>

                <div class={styles.fieldset_inputs_wrapper}>
                  Повторять каждую
                  <input class={styles.fieldset_input_number} type="number" />
                  неделю в след. дни:
                  <label>
                    <input type="checkbox" name="repeat_cycle" value="every_day" checked />
                    {WEEKDAYS_SHORT.MO}
                  </label>
                  <label>
                    <input type="checkbox" name="repeat_cycle" value="every_week" />
                    {WEEKDAYS_SHORT.TU}
                  </label>
                  <label>
                    <input type="checkbox" name="repeat_cycle" value="every_month" />
                    {WEEKDAYS_SHORT.WE}
                  </label>
                  <label>
                    <input type="checkbox" name="repeat_cycle" value="every_year" />
                    {WEEKDAYS_SHORT.TH}
                  </label>
                  <label>
                    <input type="checkbox" name="repeat_cycle" value="every_year" />
                    {WEEKDAYS_SHORT.FR}
                  </label>
                </div>

              </fieldset>

              <h5 class={styles.fieldset_header}>{REPEAT_LIMITS}</h5>
              <fieldset class={styles.fieldset_content}>

                <div class={styles.fieldset_inputs_wrapper}>
                  <label>
                    {START_DATE}
                    <input type="date" name="start_date" />
                  </label>
                  <label>
                    <input type="radio" name="end_date_variant" value="every_week" checked />
                    {INFINITELY}
                  </label>
                  <label>
                    <input type="radio" name="end_date_variant" value="every_month" />
                    {END_DATE}
                  </label>
                  <input type="date" name="end_date" />
                </div>

                <div class={styles.fieldset_inputs_wrapper}>
                  <label>
                    <input type="radio" name="end_date_variant" value="every_month" />
                    Завершить после
                    <input class={styles.fieldset_input_number} type="number" />
                    повторений
                  </label>
                </div>
              
              </fieldset>
            </fieldset>
            <div class={styles.buttons_wrapper}>
              <button class={styles.bottom_button} classList={{ [styles.bottom_button_submit]: true }}>{SAVE}</button>
              <button class={styles.bottom_button} classList={{ [styles.bottom_button_reset]: true }}>{CANCEL}</button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  );
};