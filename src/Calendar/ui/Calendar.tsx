import { For, JSX, Show, createEffect, mergeProps, on } from "solid-js";

import { DAYS_IN_WEEK, MONTHS, WEEKDAYS } from "../lib/constants";
import { get_month_data, get_today } from "../helpers/calendar_helpers";
import {
  CalendarProvider,
  useCalendarContext,
} from "../context/CalendarContext";
import type {
  MonthItemBodyProps,
  MonthItemHeader,
  MonthItemProps,
  TCalendarProps,
} from "./CalendarTypes";
import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarView } from "./CalendarView/CalendarView";
import { CalendarConfig } from "../config/CalendarConfig";
import { Dynamic } from "solid-js/web";
import { CalendarViewMode } from "./CalendarView/CalendarViewTypes";
import { TCalendarStateMethods } from "../context/CalendarContextTypes";

import styles from "./Calendar.module.css";

function get_default_props(
  initial_props: Partial<TCalendarProps>
): TCalendarProps {
  return {
    controller: initial_props.controller ? null : new CalendarController(),
    data_provider: initial_props.data_provider
      ? null
      : new CalendarDataProvider(),
    view: initial_props.view ? null : new CalendarView(),
    config: initial_props.config ? null : new CalendarConfig({}),
  } as TCalendarProps;
};

function initialize_settings(
  props: Required<TCalendarProps>, context: TCalendarStateMethods
): void {
  context.initialize(props);
  props.controller.initialize(context);
  props.controller.load_and_set_new_events(context.get_year());
};

export const Calendar = (initial_props: Partial<TCalendarProps>) => {
  return (
    <CalendarProvider>
      <CalendarMain {...initial_props} />
    </CalendarProvider>
  );
};

const CalendarMain = (initial_props: Partial<TCalendarProps>) => {
  const [_, context] = useCalendarContext();
  const default_props = get_default_props(initial_props);
  const props = mergeProps(default_props, initial_props) as Required<TCalendarProps>;

  initialize_settings(props, context);

  const options: { [key: string]: () => JSX.Element } = {
    year: Year,
    months: Months,
    month: Month,
  };

  return <Dynamic component={options[context.get_calendar_mode()]} />
};

const Year = () => (
  <>
    <CalendarHeader />
    <CalendarBody />
  </>
);
  
const Month = () => {
  const [_, context] = useCalendarContext();

  //* Тут будет логика получения месяца из стейта
  const monthNumber = new Date().getMonth();
  const dates = get_month_data(context.get_year(), monthNumber);
    
  return (
    <>
      <CalendarHeader />
      <MonthItem month={MONTHS[monthNumber]} month_dates={dates} />
    </>
  );
};
  
const Months = () => {
  const [_, context] = useCalendarContext();

  //* Тут будет логика получения месяца из стейта
  const monthNumber = new Date().getMonth();
  const dates = get_month_data(context.get_year(), monthNumber);
  const dates_prev = get_month_data(context.get_year(), monthNumber - 1);
  const dates_next = get_month_data(context.get_year(), monthNumber + 1);

  return (
    <>
      <CalendarHeader />
      <div class={styles.calendar_months_wrapper}>
        <MonthItem month={MONTHS[monthNumber - 1]} month_dates={dates_prev} />
        <MonthItem month={MONTHS[monthNumber]} month_dates={dates} />
        <MonthItem month={MONTHS[monthNumber + 1]} month_dates={dates_next} />
      </div>
    </>
  );
};

const CalendarHeader = () => {
  const [_, context] = useCalendarContext();
  const controller = context.get_controller();

  const plus_year = () => controller.plus_year();
  const minus_year = () => controller.minus_year();

  return (
    <div class={styles.calendar_header_container}>
      <CalendarHeaderButtons/>
      <button onClick={minus_year} class={styles.calendar_header_button}>
        &#60;
      </button>
      <p>{context.get_year()}</p>
      <button onClick={plus_year} class={styles.calendar_header_button}>
        &#62;
      </button>
    </div>
  );
};

const CalendarHeaderButtons = () => {
  const [_, context] = useCalendarContext();
  const controller = context.get_controller();

  const set_year_mode = () => controller.set_calendar_mode(CalendarViewMode.YEAR);
  const set_months_mode = () => controller.set_calendar_mode(CalendarViewMode.MONTHS);
  const set_month_mode = () => controller.set_calendar_mode(CalendarViewMode.MONTH);

  return (
    <div class={styles.calendar_button_container}>
      <button onClick={set_year_mode}>Year</button>
      <button onClick={set_months_mode}>3 Months</button>
      <button onClick={set_month_mode}>Month</button>
    </div>
  )
}

const CalendarBody = () => {
  const [_, context] = useCalendarContext();

  return (
    <div class={styles.calendar_body_container}>
      <For each={MONTHS}>
        {(month, index) => {
          return (
            <MonthItem
              month={month}
              month_dates={get_month_data(context.get_year(), index())}
            />
          );
        }}
      </For>
    </div>
  );
};

const MonthItem = (props: MonthItemProps) => (
  <div class={styles.month_item_container}>
    <table>
      <MonthItemHeader month_name={props.month} />
      <MonthItemBody month_dates={props.month_dates} />
    </table>
  </div>
);

const MonthItemHeader = (props: MonthItemHeader) => (
  <thead class={styles.month_item_header_container}>
    <tr>
      <th colspan={DAYS_IN_WEEK} class={styles.month_title}>
        {props.month_name}
      </th>
    </tr>
    <tr>
      <For each={WEEKDAYS}>
        {(week_day) => <th class={styles.week_day}>{week_day}</th>}
      </For>
    </tr>
  </thead>
);

const MonthItemBody = (props: MonthItemBodyProps) => {
  const [_, context] = useCalendarContext();

  const select_day = (date: Date) => context.set_selected_date(date);
  const day_today = get_today().getTime();

  return (
    <tbody>
      <For each={props.month_dates}>
        {(week) => (
          <tr>
            <For each={week}>
              {(day) => (
                <Show when={day} fallback={<td></td>}>
                  <td
                    onClick={() => select_day(day)}
                    classList={{
                      [styles.day_weekend]:
                        day.getDay() === 6 || day.getDay() === 0,
                      [styles.day_selected]:
                        context.get_selected_date()?.getTime() ===
                        day.getTime(),
                      [styles.day_today]: day_today === day.getTime(),
                    }}
                  >
                    {day.getDate()}
                  </td>
                </Show>
              )}
            </For>
          </tr>
        )}
      </For>
    </tbody>
  );
};
