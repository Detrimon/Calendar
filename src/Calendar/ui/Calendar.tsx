import { For, Show, createEffect, mergeProps, on } from "solid-js";

import { DAYS_IN_WEEK, MONTHS, WEEKDAYS } from "../lib/constants";
import { get_month_data, get_today } from "../helpers/calendar_helpers";
import {
  CalendarProvider,
  useCalendarContext,
} from "../context/CalendarContext";
import {
  CalendarActions,
  type MonthItemBodyProps,
  type MonthItemHeader,
  type MonthItemProps,
  type TCalendarProps,
} from "./CalendarTypes";

import styles from "./Calendar.module.css";
import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarView } from "./CalendarView/CalendarView";
import { CalendarConfig } from "../config/CalendarConfig";

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
}

export const Calendar = (initial_props: Partial<TCalendarProps>) => {
  return (
    <CalendarProvider>
      <CalendarMain {...initial_props} />
    </CalendarProvider>
  );
};

const CalendarMain = (initial_props: Partial<TCalendarProps>) => {
  const default_props = get_default_props(initial_props);

  const props = mergeProps(default_props, initial_props) as TCalendarProps;

  const [_, context] = useCalendarContext();
  context.initialize(props);
  props.controller.initialize(context);

  props.controller.load_and_set_new_events(context.get_year());

  createEffect(on(context.get_year, (year) => {
    props.controller.load_and_set_new_events(year);
    props.controller.notify(CalendarActions.GET_YEAR, year);
  }, { defer: true }));

  return (
    <>
      <CalendarHeader />
      <CalendarBody />
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
