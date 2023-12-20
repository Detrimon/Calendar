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
import { FORM_STORE, REPEAT_RATE_DAYS, WEEKDAYS_SHORT } from "../shared/lib/constants";
import { get_time_period_options } from "./helpers/planing_modal_helpers";
import { TRepeatRate } from "../Calendar";

import styles from "./PlaningModal.module.css";

export const PlaningModal = (props: TPlaningModalProps) => {
  const [form, set_form] = createStore<FORM_STORE>({
    is_allday_meeting: false,
    is_repeated: true,
    time_period: {
      start: "",
      end: ""
    },
    repeat_rate: TRepeatRate.WEEK,
    repeat_rate_custom: {
      repeat_every_week_row: 1,
      week_days: ["monday", "thursday"]
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
  const set_repeat_rate = (new_value: TRepeatRate) => set_form('repeat_rate', new_value);
  const set_repeat_every_week_row = (new_value: number) => set_form('repeat_rate_custom', 'repeat_every_week_row', new_value < 0 ? 0 : new_value);
  const change_repeat_week_days = (new_value: REPEAT_RATE_DAYS) => {
    if (form.repeat_rate_custom.week_days.includes(new_value)) {
      set_form('repeat_rate_custom', 'week_days', form.repeat_rate_custom.week_days.filter(day => day !== new_value));
    } else {
      set_form('repeat_rate_custom', 'week_days', [...form.repeat_rate_custom.week_days, new_value]);
    }
  };

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
                  {get_time_period_options({ start: form.time_period.start || undefined }).map(option => <option value={option} />)}
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

              <fieldset class={styles.fieldset_content} >

                <fieldset class={styles.fieldset_inputs_wrapper} onChange={(e) => set_repeat_rate(e.target.value)}>
                  Повторять:
                  <label>
                    <input type="radio" name="repeat_cycle" value={TRepeatRate.DAY} checked={form.repeat_rate === TRepeatRate.DAY} />
                    {REPEAT_EVERY.DAY}
                  </label>
                  <label>
                    <input type="radio" name="repeat_cycle" value={TRepeatRate.WEEK} checked={form.repeat_rate === TRepeatRate.WEEK} />
                    {REPEAT_EVERY.WEEK}
                  </label>
                  <label>
                    <input type="radio" name="repeat_cycle" value={TRepeatRate.MONTH} checked={form.repeat_rate === TRepeatRate.MONTH} />
                    {REPEAT_EVERY.MONTH}
                  </label>
                  <label>
                    <input type="radio" name="repeat_cycle" value={TRepeatRate.YEAR} checked={form.repeat_rate === TRepeatRate.YEAR} />
                    {REPEAT_EVERY.YEAR}
                  </label>
                </fieldset>

                <fieldset class={styles.fieldset_inputs_wrapper}>
                  Повторять каждую
                  <input
                    class={styles.fieldset_input_number}
                    type="number"
                    required
                    value={form.repeat_rate_custom.repeat_every_week_row}
                    onChange={(e) => set_repeat_every_week_row(+e.target.value)}
                  />
                  неделю в след. дни:

                  <fieldset
                    class={styles.week_days_wrapper}
                    onChange={(e)=> change_repeat_week_days(e.target.value)}
                  >
                    <label>
                      <input
                        type="checkbox"
                        name="repeat_week_days"
                        value="monday"
                        checked={form.repeat_rate_custom.week_days.includes("monday")}
                        required={form.repeat_rate_custom.week_days.length === 0} />
                      {WEEKDAYS_SHORT.MON}
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repeat_week_days"
                        value="tuesday"
                        checked={form.repeat_rate_custom.week_days.includes("tuesday")}
                        required={form.repeat_rate_custom.week_days.length === 0} />
                      {WEEKDAYS_SHORT.TUE}
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repeat_week_days"
                        value="wednesday"
                        checked={form.repeat_rate_custom.week_days.includes("wednesday")}
                        required={form.repeat_rate_custom.week_days.length === 0} />
                      {WEEKDAYS_SHORT.WED}
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repeat_week_days"
                        value="thursday"
                        checked={form.repeat_rate_custom.week_days.includes("thursday")}
                        required={form.repeat_rate_custom.week_days.length === 0} />
                      {WEEKDAYS_SHORT.THU}
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repeat_week_days"
                        value="friday"
                        checked={form.repeat_rate_custom.week_days.includes("friday")}
                        required={form.repeat_rate_custom.week_days.length === 0} />
                      {WEEKDAYS_SHORT.FRI}
                    </label>
                    
                  </fieldset>
                </fieldset>

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