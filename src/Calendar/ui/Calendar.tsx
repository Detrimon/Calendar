import { For, Show, createEffect, on } from "solid-js";
import { CalendarProvider, useCalendarContext } from "../context/CalendarContext";
import { DAYS_IN_WEEK, MONTHS, WEEKDAYS } from "../lib/constants";
import { get_month_data, get_today } from "../helpers/calendar_helpers";
import type {
  MonthItemBodyProps,
  MonthItemHeader,
  MonthItemProps,
} from "./CalendarTypes";
import { CalendarActions } from "../controller/CalendarControllerTypes";

import styles from "./Calendar.module.css";
import { CalendarController } from "../controller/CalendarController";
import { CalendarConfig } from "./CalendarConfig";

type TCalendarProps = {
  controller: CalendarController
  configs: CalendarConfig
};

export const Calendar = (props: TCalendarProps) => {
  // const [{observers},{get_selected_date}] = useCalendarContext();

  const {selected_date, year} = props.configs

  props.controller.initialize({ selected_date, year });

  // createEffect(on(get_selected_date, (new_value => {
  //   observers[CalendarActions.SELECTED_DATE]?.forEach(observer => observer.handleEvent(new_value));
  // }), { defer: true }));

  return (
    <CalendarProvider>
      <CalendarHeader />
      <CalendarBody />
    </CalendarProvider>
  );
};

const CalendarHeader = () => {
  const [_, { get_year, minus_year, plus_year }] = useCalendarContext();

  return (
    <div class={styles.calendar_header_container}>
      <button
        onClick={minus_year}
        class={styles.calendar_header_button}
      >
        &#60;
      </button>
      <p>{get_year()}</p>
      <button
        onClick={plus_year}
        class={styles.calendar_header_button}
      >
        &#62;
      </button>
    </div>
  );
};

const CalendarBody = () => {
  const [_, { get_year }] = useCalendarContext();

  return (
    <div class={styles.calendar_body_container}>
      <For each={MONTHS}>
        {(month, index) => {
          return (
            <MonthItem
              month={month}
              month_dates={get_month_data(get_year(), index())}
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
        {(week_day) => (
          <th class={styles.week_day}>{week_day}</th>
        )}
      </For>
    </tr>
  </thead>
);

const MonthItemBody = (props: MonthItemBodyProps) => {
  const [_, { get_selected_date, set_selected_date }] = useCalendarContext();

  const day_today = get_today().getTime();
  
  return (
    <tbody>
      <For each={props.month_dates}>
        {week => (
          <tr>
            <For each={week}>
              {day => (
                <Show when={day} fallback={<td></td>}>
                  <td
                    onClick={() => set_selected_date(day)}
                    classList={{
                      [styles.day_weekend]: day.getDay() === 6 || day.getDay() === 0,
                      [styles.day_selected]: get_selected_date()?.getTime() === day.getTime(),
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