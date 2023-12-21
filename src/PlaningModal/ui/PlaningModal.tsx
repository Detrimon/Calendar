import { Show, batch, mergeProps } from "solid-js";

import { TPlaningModalProps, TRepeatVariantRadioProps, TWeekDaysInputProps } from "./PlaningModalTypes";
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
} from "../lib/constants";
import { REPEAT_RATE_DAYS, WEEKDAYS_SHORT } from "../../shared/lib/constants";
import { get_time_period_options } from "../helpers/planing_modal_helpers";
import { TRepeatRate } from "../../Calendar";
import { PlaningModalConfig } from "../config/PlaningModalConfig";
import { PlaningModalProvider, usePlaningModalContext } from "../context/PlaningModalContext";
import { PlaningModalController } from "../controller/PlaningModalController";

import styles from "./PlaningModal.module.css";

function get_default_props(
  initial_props: Partial<TPlaningModalProps>
): TPlaningModalProps {
  return {
    controller: initial_props.controller ? null : new PlaningModalController(),
    config: initial_props.config ? null : new PlaningModalConfig({}),
  } as TPlaningModalProps;
};

export const PlaningModal = (initial_props: Partial<TPlaningModalProps>) => {
  return (
    <PlaningModalProvider>
      <PlaningModalMain {...initial_props}/>
    </PlaningModalProvider>
  );
};

const PlaningModalMain = (initial_props: Partial<TPlaningModalProps>) => {
  const [_, context] = usePlaningModalContext();
  const default_props = get_default_props(initial_props);
  const props = mergeProps(default_props, initial_props) as Required<TPlaningModalProps>;
  context.initialize(props);
  props.controller.initialize(context);

  const controller = context.get_controller();

  const change_repeated_status =
    (new_value: boolean) => controller.set_context_value('is_repeated', new_value);
  const change_allday_meeting_status =
    (new_value: boolean) => controller.set_context_value('is_allday_meeting', new_value);
  const set_time_period_end =
    (new_value: string) => controller.set_context_value('time_end', new_value);
  const set_repeat_rate =
    (new_value: TRepeatRate) => controller.set_context_value('repeat_rate', new_value);
  const set_finish_after_repeats =
    (new_value: number) => controller.set_context_value('finish_repeats_quantity', new_value);
  const set_repeat_every_week_row
    = (new_value: number) => controller.set_context_value('repeat_every_week_row', new_value);
  const set_is_infinitely
    = (new_value: boolean) => context.set_context_value('is_repeat_infinitely', new_value);
  const change_repeat_week_days
    = (new_value: REPEAT_RATE_DAYS) => controller.change_repeat_week_days(new_value);
  const toggle_is_repeats_quantity
    = () => controller.toggle_is_repeats_quantity();
    const set_time_period_start = (new_value: string) => {
    batch(() => {
      controller.set_context_value('time_start', new_value);
      controller.set_context_value('time_end', '');
    });
  };

  const submit_handler = (e) => {
    e.preventDefault()
  };

  return (
    <Show when={initial_props.show}>
      <div class={styles.container}>
        <div class={styles.modal}>
          <h5 class={styles.header}>
            Заголовок
            <button type="button" class={styles.header_close_button}>
              &#10006;
            </button>
          </h5>

          <form class={styles.form} onSubmit={submit_handler}>

            <div class={styles.row_wrapper}>
              <span>{ALLDAY_MEETING}</span>
              <div>
                <button
                  type="button" 
                  class={styles.button}
                  classList={{ [styles.button_colored]: context.get_context_value('is_allday_meeting') as boolean}}
                  onClick={() => change_allday_meeting_status(true)}
                >Да</button>
                <button
                  type="button" 
                  class={styles.button}
                  classList={{ [styles.button_colored]: !context.get_context_value('is_allday_meeting') as boolean}}
                  onClick={() => change_allday_meeting_status(false)}
                >Нет</button>
              </div>
            </div>

            <div class={styles.row_wrapper}>
              <span>{TIME_PERIOD}</span>
              <fieldset
                class={styles.buttons_wrapper}
                classList={{ [styles.disabled]: context.get_context_value('is_allday_meeting') as boolean}}
                disabled={context.get_context_value('is_allday_meeting') as boolean}
              >

                <span>с</span>
                <input
                  list="time_start_variants"
                  type="time"
                  name="time"
                  required
                  value={
                    !context.get_context_value('is_allday_meeting')
                      ? context.get_context_value('time_start') as string
                      : ''
                  }
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
                  required
                  value={
                    !context.get_context_value('is_allday_meeting')
                      ? context.get_context_value('time_end') as string
                      : ''
                  }
                  onChange={(e) => set_time_period_end(e.target.value)}
                />
                <datalist id="time_end_variants">
                  {get_time_period_options({
                    start: context.get_context_value('time_start') as string || undefined
                  }).map(option => <option value={option} />)}
                </datalist>
                
              </fieldset>
            </div>

            <div class={styles.row_wrapper}>
              <span>{REPEAT}</span>
              <div>
                <button
                  type="button" 
                  class={styles.button}
                  classList={{ [styles.button_colored]: context.get_context_value('is_repeated') as boolean }}
                  onClick={() => change_repeated_status(true)}
                >Да</button>
                <button
                  type="button" 
                  class={styles.button}
                  classList={{ [styles.button_colored]: !context.get_context_value('is_repeated') as boolean }}
                  onClick={() => change_repeated_status(false)}
                >Нет</button>
              </div>
            </div>

            <fieldset
              class={styles.repeat_params}
              classList={{ [styles.disabled]: !context.get_context_value('is_repeated') as boolean }}
              disabled={!context.get_context_value('is_repeated') as boolean }
            >
              <h5 class={styles.fieldset_header}>{REPEAT_CYCLE}</h5>

              <fieldset class={styles.fieldset_content} >

                <fieldset class={styles.fieldset_inputs_wrapper} onChange={(e) => set_repeat_rate(e.target.value)}>
                  Повторять:
                  {Object.keys(REPEAT_EVERY).map(variant =>
                    <RepeatVariantRadio variant={variant as TRepeatVariantRadioProps["variant"]} />)}
                </fieldset>

                <fieldset class={styles.fieldset_inputs_wrapper}>
                  Повторять каждую
                  <input
                    class={styles.fieldset_input_number}
                    type="number"
                    required
                    min='1'
                    value={context.get_context_value('repeat_every_week_row') as number}
                    onChange={(e) => set_repeat_every_week_row(+e.target.value)}
                  />
                  неделю в след. дни:
                  <fieldset
                    class={styles.week_days_wrapper}
                    onChange={(e) => change_repeat_week_days(e.target.value)}
                  >
                    {Object.entries(WEEKDAYS_SHORT).map(day =>
                      <WeekDaysCheckbox day_name={day[0] as TWeekDaysInputProps["day_name"]} label={day[1]} />)}
                  </fieldset>
                </fieldset>

              </fieldset>

              <h5 class={styles.fieldset_header}>{REPEAT_LIMITS}</h5>
              <fieldset class={styles.fieldset_content}>

                <div class={styles.fieldset_inputs_wrapper}>
                  <label>
                    {START_DATE}
                    <input type="date" name="start_date" required/>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="end_date_variant"
                      value="infinitely"
                      checked={context.get_context_value('is_repeat_infinitely') as boolean}
                      onChange={(e)=> set_is_infinitely(e.target.checked)}
                    />
                    {INFINITELY}
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="end_date_variant"
                      value="by_end_date"
                      checked={!context.get_context_value('is_repeat_infinitely') as boolean}
                      onChange={(e)=> set_is_infinitely(!e.target.checked)}
                    />
                    {END_DATE}
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    required
                    disabled={context.get_context_value('is_repeat_infinitely') as boolean}
                    classList={{ [styles.disabled]: context.get_context_value('is_repeat_infinitely') as boolean}}
                  />
                </div>

                <div class={styles.fieldset_inputs_wrapper}>
                  <label>
                    <input
                      type="checkbox"
                      name="end_after_repeat"
                      value="end_after_repeat"
                      checked={context.get_context_value('is_repeats_quantity') as boolean}
                      onChange={toggle_is_repeats_quantity}
                    />
                    Завершить после
                  </label>
                  <label
                    class={styles.repeat_number_label}
                    classList={{ [styles.disabled]: !context.get_context_value('is_repeats_quantity') as boolean}}
                  >
                    <input
                      class={styles.fieldset_input_number}
                      type="number"
                      min='1'
                      value={
                        context.get_context_value('is_repeats_quantity') as boolean
                          ? context.get_context_value('finish_repeats_quantity') as number
                          : ''
                      }
                      onChange={(e)=> set_finish_after_repeats(+e.target.value)}
                    />
                    повторений
                  </label>
                </div>
              
              </fieldset>
            </fieldset>
            <div class={styles.buttons_wrapper}>
              <button type="submit" class={styles.bottom_button} classList={{ [styles.bottom_button_submit]: true }}>{SAVE}</button>
              <button type="button" class={styles.bottom_button} classList={{ [styles.bottom_button_reset]: true }}>{CANCEL}</button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  );
}

const WeekDaysCheckbox = (props: TWeekDaysInputProps) => {
  const [_, context] = usePlaningModalContext();

  return (
    <label>
      <input
        type="checkbox"
        name="repeat_week_days"
        value={props.day_name}
        checked={(context.get_context_value('repeat_week_days') as REPEAT_RATE_DAYS[]).includes(props.day_name)}
        required={(context.get_context_value('repeat_week_days') as REPEAT_RATE_DAYS[]).length === 0} />
      {props.label}
    </label>
  )
};

const RepeatVariantRadio = (props: TRepeatVariantRadioProps) => {
  const [_, context] = usePlaningModalContext();

  return (
    <label>
      <input
        type="radio"
        name="repeat_cycle"
        value={props.variant}
        checked={context.get_context_value('repeat_rate') === props.variant} />
      {REPEAT_EVERY[props.variant]}
    </label>
  )
};