import { For, Show } from "solid-js";
import { CalendarProvider, useCalendarContext } from "../context/CalendarContext";
import { DAYS_IN_WEEK, MONTHS, WEEKDAYS } from "../lib/constants";
import { get_month_data } from "../helpers/calendar_helpers";
import type {
  CalendarProps,
  MonthItemBodyProps,
  MonthItemHeader,
  MonthItemProps
} from "./CalendarTypes";

import styles from "./Calendar.module.css";

export const Calendar = (props: CalendarProps) => {
  props.controller.initialize();
  props.events_provider.initialize();

  return (
    <CalendarProvider
      controller={props.controller}
      events_provider={props.events_provider}
    >
      <CalendarHeader />
      <CalendarBody />
    </CalendarProvider>
  );
};

const CalendarHeader = () => {
  const { controller } = useCalendarContext();

  const incrementYear = () => controller.set_year(controller.get_year() + 1);
  const decrementYear = () => controller.set_year(controller.get_year() - 1);

  return (
    <div class={styles.calendar_header_container}>
      <button
        onClick={decrementYear}
        class={styles.calendar_header_button}
      >
        &#60;
      </button>
      <p>{controller.get_year()}</p>
      <button
        onClick={incrementYear}
        class={styles.calendar_header_button}
      >
        &#62;
      </button>
    </div>
  );
};

const CalendarBody = () => {
  const { controller } = useCalendarContext();

  return (
    <div class={styles.calendar_body_container}>
      <For each={MONTHS}>
        {(month, index) => {
          return (
            <MonthItem
              month={month}
              month_dates={get_month_data(controller.get_year(), index())}
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
  const { controller } = useCalendarContext();
  const day_today = controller.get_today().getTime();

  const selectDate = (date: Date) => controller.set_selected_date(date);
  
  return (
    <tbody>
      <For each={props.month_dates}>
        {week => (
          <tr>
            <For each={week}>
              {day => (
                <Show when={day} fallback={<td></td>}>
                  <td
                    onClick={() => selectDate(day)}
                    classList={{
                      [styles.day_weekend]: day.getDay() === 6 || day.getDay() === 0,
                      [styles.day_selected]: controller.get_selected_date()?.getTime() === day.getTime(),
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