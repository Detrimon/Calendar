import { Show, batch, mergeProps } from "solid-js";

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
import { REPEAT_RATE_DAYS, WEEKDAYS_SHORT } from "../shared/lib/constants";
import { get_time_period_options } from "./helpers/planing_modal_helpers";
import { TRepeatRate } from "../Calendar";
import { PlaningModalConfig } from "./config/PlaningModalConfig";
import { PlaningModalProvider, usePlaningModalContext } from "./context/PlaningModalContext";
import { PlaningModalController } from "./controller/PlaningModalController";

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

  const change_repeated_status = (new_value: boolean) => controller.set_is_repeated(new_value);
  const change_allday_meeting_status = (new_value: boolean) => controller.set_is_allday_meeting(new_value);
  const set_time_period_end = (new_value: string) => controller.set_time_end(new_value);
  const set_time_period_start = (new_value: string) => {
    batch(() => {
      controller.set_time_start(new_value)
      controller.set_time_end('')
    });
  };
  const set_repeat_rate = (new_value: TRepeatRate) => controller.set_repeat_rate(new_value);
  const toggle_is_repeats_quantity = () => controller.toggle_is_repeats_quantity();
  const set_finish_after_repeats = (new_value: number) => controller.set_finish_repeats_quantity(new_value);
  const set_repeat_every_week_row = (new_value: number) => controller.set_repeat_every_week_row(new_value);
  const set_is_infinitely = (new_value: boolean) => context.set_is_repeat_infinitely(new_value);
  const change_repeat_week_days = (new_value: REPEAT_RATE_DAYS) => context.change_repeat_week_days(new_value);

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
                  // classList={{ [styles.button_colored]: form.is_allday_meeting }}
                  classList={{ [styles.button_colored]: context.get_is_allday_meeting()}}
                  onClick={() => change_allday_meeting_status(true)}
                >Да</button>
                <button
                  type="button" 
                  class={styles.button}
                  classList={{ [styles.button_colored]: !context.get_is_allday_meeting()}}
                  onClick={() => change_allday_meeting_status(false)}
                >Нет</button>
              </div>
            </div>

            <div class={styles.row_wrapper}>
              <span>{TIME_PERIOD}</span>
              <fieldset
                class={styles.buttons_wrapper}
                classList={{ [styles.disabled]: context.get_is_allday_meeting() }}
                disabled={context.get_is_allday_meeting()}
              >

                <span>с</span>
                <input
                  list="time_start_variants"
                  type="time"
                  name="time"
                  value={!context.get_is_allday_meeting() ? context.get_time_start() : ''}
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
                  value={!context.get_is_allday_meeting() ? context.get_time_end() : ''}
                  onChange={(e) => set_time_period_end(e.target.value)}
                />
                <datalist id="time_end_variants">
                  {get_time_period_options({ start: context.get_time_start() || undefined }).map(option => <option value={option} />)}
                </datalist>
                
              </fieldset>
            </div>

            <div class={styles.row_wrapper}>
              <span>{REPEAT}</span>
              <div>
                <button
                  type="button" 
                  class={styles.button}
                  classList={{ [styles.button_colored]: context.get_is_repeated() }}
                  onClick={() => change_repeated_status(true)}
                >Да</button>
                <button
                  type="button" 
                  class={styles.button}
                  classList={{ [styles.button_colored]: !context.get_is_repeated() }}
                  onClick={() => change_repeated_status(false)}
                >Нет</button>
              </div>
            </div>

            <fieldset
              class={styles.repeat_params}
              classList={{ [styles.disabled]: !context.get_is_repeated() }}
              disabled={!context.get_is_repeated()}
            >
              <h5 class={styles.fieldset_header}>{REPEAT_CYCLE}</h5>

              <fieldset class={styles.fieldset_content} >

                <fieldset class={styles.fieldset_inputs_wrapper} onChange={(e) => set_repeat_rate(e.target.value)}>
                  Повторять:
                  <label>
                    <input type="radio" name="repeat_cycle" value={TRepeatRate.DAY} checked={context.get_repeat_rate() === TRepeatRate.DAY} />
                    {REPEAT_EVERY.DAY}
                  </label>
                  <label>
                    <input type="radio" name="repeat_cycle" value={TRepeatRate.WEEK} checked={context.get_repeat_rate()=== TRepeatRate.WEEK} />
                    {REPEAT_EVERY.WEEK}
                  </label>
                  <label>
                    <input type="radio" name="repeat_cycle" value={TRepeatRate.MONTH} checked={context.get_repeat_rate() === TRepeatRate.MONTH} />
                    {REPEAT_EVERY.MONTH}
                  </label>
                  <label>
                    <input type="radio" name="repeat_cycle" value={TRepeatRate.YEAR} checked={context.get_repeat_rate() === TRepeatRate.YEAR} />
                    {REPEAT_EVERY.YEAR}
                  </label>
                </fieldset>

                <fieldset class={styles.fieldset_inputs_wrapper}>
                  Повторять каждую
                  <input
                    class={styles.fieldset_input_number}
                    type="number"
                    required
                    min='1'
                    value={context.get_repeat_every_week_row()}
                    onChange={(e) => set_repeat_every_week_row(+e.target.value)}
                  />
                  неделю в след. дни:

                  <fieldset
                    class={styles.week_days_wrapper}
                    onChange={(e) => change_repeat_week_days(e.target.value)}
                  >
                    <label>
                      <input
                        type="checkbox"
                        name="repeat_week_days"
                        value="monday"
                        checked={context.get_repeat_week_days().includes("monday")}
                        required={context.get_repeat_week_days().length === 0} />
                      {WEEKDAYS_SHORT.MON}
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repeat_week_days"
                        value="tuesday"
                        checked={context.get_repeat_week_days().includes("tuesday")}
                        required={context.get_repeat_week_days().length === 0} />
                      {WEEKDAYS_SHORT.TUE}
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repeat_week_days"
                        value="wednesday"
                        checked={context.get_repeat_week_days().includes("wednesday")}
                        required={context.get_repeat_week_days().length === 0} />
                      {WEEKDAYS_SHORT.WED}
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repeat_week_days"
                        value="thursday"
                        checked={context.get_repeat_week_days().includes("thursday")}
                        required={context.get_repeat_week_days().length === 0} />
                      {WEEKDAYS_SHORT.THU}
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="repeat_week_days"
                        value="friday"
                        checked={context.get_repeat_week_days().includes("friday")}
                        required={context.get_repeat_week_days().length === 0} />
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
                    <input type="date" name="start_date" required/>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="end_date_variant"
                      value="infinitely"
                      checked={context.get_is_repeat_infinitely()}
                      onChange={(e)=> set_is_infinitely(e.target.checked)}
                    />
                    {INFINITELY}
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="end_date_variant"
                      value="by_end_date"
                      checked={!context.get_is_repeat_infinitely()}
                      onChange={(e)=> set_is_infinitely(!e.target.checked)}
                    />
                    {END_DATE}
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    required
                    disabled={context.get_is_repeat_infinitely()}
                    classList={{ [styles.disabled]: context.get_is_repeat_infinitely() }}
                  />
                </div>

                <div class={styles.fieldset_inputs_wrapper}>
                  <label>
                    <input
                      type="checkbox"
                      name="end_after_repeat"
                      value="end_after_repeat"
                      checked={context.get_is_repeats_quantity()}
                      onChange={toggle_is_repeats_quantity}
                    />
                    Завершить после
                  </label>
                  <label
                    class={styles.repeat_number_label}
                    classList={{ [styles.disabled]: !context.get_is_repeats_quantity()}}
                  >
                    <input
                      class={styles.fieldset_input_number}
                      type="number"
                      min='1'
                      value={context.get_is_repeats_quantity() ? context.get_finish_repeats_quantity() : ''}
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