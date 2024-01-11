import { Show, batch, mergeProps } from "solid-js";

import { TPlaningModalFormProps, TRepeatVariantRadioProps, TWeekDaysInputProps } from "./PlaningModalTypes";
import {
  ALLDAY_MEETING,
  END_DATE,
  INFINITELY,
  REPEAT,
  REPEAT_CYCLE,
  REPEAT_EVERY,
  REPEAT_LIMITS,
  START_DATE,
  TIME_PERIOD,
  TITLE_INPUT_PLACEHOLDER
} from "../lib/constants";
import { NO, REPEAT_RATE_DAYS, WEEKDAYS_SHORT, YES } from "../../shared/lib/constants";
import { get_time_period_options } from "../helpers/planing_modal_helpers";
import { TRepeatRate } from "../../Calendar";
import { PlaningModalConfig } from "../config";
import { PlaningModalProvider, usePlaningModalContext } from "../context";
import { PlaningModalController } from "../controller";

import styles from "./PlaningModalForm.module.css";

function get_default_props(
  initial_props: Partial<TPlaningModalFormProps>
): TPlaningModalFormProps {
  return {
    controller: initial_props.controller ? null : new PlaningModalController(),
    config: initial_props.config ? null : new PlaningModalConfig({}),
  } as TPlaningModalFormProps;
};

export const PlaningModalForm = (initial_props: Partial<TPlaningModalFormProps>) => {
  return (
    <PlaningModalProvider>
      <PlaningModalMain {...initial_props}/>
    </PlaningModalProvider>
  );
};

const PlaningModalMain = (initial_props: Partial<TPlaningModalFormProps>) => {
  const [_, context] = usePlaningModalContext();
  const default_props = get_default_props(initial_props);
  const props = mergeProps(default_props, initial_props) as Required<TPlaningModalFormProps>;
  context.initialize(props);
  props.controller.initialize(context);

  const controller = context.get_controller();

  const set_title = (new_value: string) => context.set_context_value('title', new_value);
  const change_repeated_status =
    (new_value: boolean) => controller.set_context_value('is_repeated', new_value);
  const change_allday_meeting_status = (new_value: boolean) => {
    controller.set_context_value('is_allday_meeting', new_value);
    controller.set_context_value('start_time', '00:00:00');
    controller.set_context_value('end_time', '00:00:00');
  };
  
  const set_time_period_start = (new_value: string) => {
    batch(() => {
      controller.set_context_value('start_time', new_value);
      controller.set_context_value('end_time', '');
    });
  };
  const set_time_period_end =
    (new_value: string) => controller.set_context_value('end_time', new_value);
  const set_repeat_rate =
    (new_value: TRepeatRate) => controller.set_context_value('repeat_rate', new_value);
  const set_finish_after_repeats =
    (new_value: number) => controller.set_context_value('finish_repeats_quantity', new_value);
  const set_repeat_every_week_row
    = (new_value: number) => controller.set_context_value('repeat_every_week_row', new_value);
  const set_end_date =
    (new_value: string) => controller.set_context_value('end_date', new_value);
  const set_start_date = (new_value: string) => {
    batch(() => {
      controller.set_context_value('start_date', new_value);
      controller.set_context_value('end_date', '');
    });
  };
  const set_is_infinitely
    = (new_value: boolean) => context.set_context_value('is_repeat_infinitely', new_value);
  const change_repeat_week_days
    = (new_value: REPEAT_RATE_DAYS) => controller.change_repeat_week_days(new_value);
  const toggle_is_repeats_quantity
    = () => controller.toggle_is_repeats_quantity();
 
  return (
    <form class={styles.form}>
      <h5 class={styles.header}>
        <input
          class={styles.title_input}
          placeholder={TITLE_INPUT_PLACEHOLDER}
          value={context.get_context_value('title')}
          onInput={(e)=>set_title(e.target.value)}
        />
        <Show when={context.get_context_value('title').length !== 0}>
          <button type="button" class={styles.title_clear_button} onClick={()=>set_title('')}>
            &#10006;
          </button>
        </Show>
      </h5>
      <div class={styles.row_wrapper}>
        <span>{ALLDAY_MEETING}</span>
        <div>
          <button
            type="button"
            class={styles.button}
            classList={{ [styles.button_colored]: context.get_context_value('is_allday_meeting') }}
            onClick={() => change_allday_meeting_status(true)}
          >{YES}</button>
          <button
            type="button"
            class={styles.button}
            classList={{ [styles.button_colored]: !context.get_context_value('is_allday_meeting') }}
            onClick={() => change_allday_meeting_status(false)}
          >{NO}</button>
        </div>
      </div>

      <div class={styles.row_wrapper}>
        <span>{TIME_PERIOD}</span>
        <fieldset
          class={styles.buttons_wrapper}
          classList={{ [styles.disabled]: context.get_context_value('is_allday_meeting') }}
          disabled={context.get_context_value('is_allday_meeting')}
        >

          <span>с</span>
          <input
            list="start_time_variants"
            type="time"
            name="time"
            required
            value={
              !context.get_context_value('is_allday_meeting')
                ? context.get_context_value('start_time')
                : ''
            }
            onInput={(e) => set_time_period_start(e.target.value + ':00')}
          />
          <datalist id="start_time_variants">
            {get_time_period_options().map(option => <option value={option} />)}
          </datalist>

          <span>по</span>
          <input
            list="end_time_variants"
            type="time"
            name="time"
            required
            value={
              !context.get_context_value('is_allday_meeting')
                ? context.get_context_value('end_time')
                : ''
            }
            onChange={(e) => set_time_period_end(e.target.value + ':00')}
          />
          <datalist id="end_time_variants">
            {get_time_period_options({
              start: context.get_context_value('start_time') || undefined
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
            classList={{ [styles.button_colored]: context.get_context_value('is_repeated') }}
            onClick={() => change_repeated_status(true)}
          >{YES}</button>
          <button
            type="button"
            class={styles.button}
            classList={{ [styles.button_colored]: !context.get_context_value('is_repeated') }}
            onClick={() => change_repeated_status(false)}
          >{NO}</button>
        </div>
      </div>

      <fieldset
        class={styles.repeat_params}
        classList={{ [styles.disabled]: !context.get_context_value('is_repeated') }}
        disabled={!context.get_context_value('is_repeated')}
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
              value={context.get_context_value('repeat_every_week_row')}
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
              <input
                type="date"
                name="start_date"
                value={context.get_context_value('start_date')}
                required
                onInput={(e) => set_start_date(e.target.value)}
              />
            </label>
            <label>
              <input
                type="radio"
                name="end_date_variant"
                value="infinitely"
                checked={context.get_context_value('is_repeat_infinitely')}
                onChange={(e) => set_is_infinitely(e.target.checked)}
              />
              {INFINITELY}
            </label>
            <label>
              <input
                type="radio"
                name="end_date_variant"
                value="by_end_date"
                checked={!context.get_context_value('is_repeat_infinitely')}
                onChange={(e) => set_is_infinitely(!e.target.checked)}
              />
              {END_DATE}
            </label>
            <input
              type="date"
              name="end_date"
              value={context.get_context_value('end_date')}
              required
              disabled={context.get_context_value('is_repeat_infinitely')}
              classList={{ [styles.disabled]: context.get_context_value('is_repeat_infinitely') }}
              onInput={(e) => set_end_date(e.target.value)}
            />
          </div>

          <div class={styles.fieldset_inputs_wrapper}>
            <label>
              <input
                type="checkbox"
                name="end_after_repeat"
                value="end_after_repeat"
                checked={context.get_context_value('is_repeats_quantity')}
                onChange={toggle_is_repeats_quantity}
              />
              Завершить после
            </label>
            <label
              class={styles.repeat_number_label}
              classList={{ [styles.disabled]: !context.get_context_value('is_repeats_quantity') }}
            >
              <input
                class={styles.fieldset_input_number}
                type="number"
                min='1'
                value={
                  context.get_context_value('is_repeats_quantity')
                    ? context.get_context_value('finish_repeats_quantity')
                    : ''
                }
                onChange={(e) => set_finish_after_repeats(+e.target.value)}
              />
              повторений
            </label>
          </div>
              
        </fieldset>
      </fieldset>
    </form>
  );
};

const WeekDaysCheckbox = (props: TWeekDaysInputProps) => {
  const [_, context] = usePlaningModalContext();

  return (
    <label>
      <input
        type="checkbox"
        name="repeat_week_days"
        value={props.day_name}
        checked={(context.get_context_value('repeat_week_days')).includes(props.day_name)}
        required={(context.get_context_value('repeat_week_days')).length === 0} />
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