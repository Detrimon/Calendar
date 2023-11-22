import { For, Show } from "solid-js";

import { DAYS_IN_WEEK, MONTHS, WEEKDAYS } from "../lib/constants";
import { get_month_data, get_today } from "../helpers/calendar_helpers";
import { CalendarProvider, useCalendarContext } from "../context/CalendarContext";
import type {
  MonthItemBodyProps,
  MonthItemHeader,
  MonthItemProps,
  TCalendarProps,
} from "./CalendarTypes";

import styles from "./Calendar.module.css";

export const Calendar = (props: TCalendarProps) => {
  return (
    <CalendarProvider {...props}>
      <CalendarHeader />
      <CalendarBody />
    </CalendarProvider>
  );
};

const CalendarHeader = () => {
  const context = useCalendarContext();
  const plus_year = () => context.store.controller?.plus_year();
  const minus_year = () => context.store.controller?.minus_year();

  return (
    <div class={styles.calendar_header_container}>
      <button
        onClick={minus_year}
        class={styles.calendar_header_button}
      >
        &#60;
      </button>
      <p>{context.get_year()}</p>
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
  const context = useCalendarContext();

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
        {(week_day) => (
          <th class={styles.week_day}>{week_day}</th>
        )}
      </For>
    </tr>
  </thead>
);

const MonthItemBody = (props: MonthItemBodyProps) => {
  const context = useCalendarContext();
  
  const select_day = (date: Date) => context.set_selected_date(date);
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
                    onClick={() => select_day(day)}
                    classList={{
                      [styles.day_weekend]: day.getDay() === 6 || day.getDay() === 0,
                      [styles.day_selected]: context.get_selected_date()?.getTime() === day.getTime(),
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