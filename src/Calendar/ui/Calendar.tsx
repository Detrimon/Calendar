import { For, Show, createEffect } from "solid-js";
import { CalendarProvider, useCalendarContext } from "../context/CalendarContext";
import { DAYS_IN_WEEK, MONTHS, WEEKDAYS } from "../lib/constants";
import { get_month_data } from "../helpers/calendar_helpers";
import type {
  CalendarProps,
  MonthItemBodyProps,
  MonthItemHeader,
  MonthItemProps,
  PrevCreateEffectValues
} from "./CalendarTypes";
import { CalendarActions } from "../controller/CalendarControllerTypes";

import styles from "./Calendar.module.css";

export const Calendar = (props: CalendarProps) => {
  props.controller.initialize();
  props.events.initialize(props.initial_settings.events_params);

  createEffect<PrevCreateEffectValues>((prev_values) => {
    const new_values: PrevCreateEffectValues = {};

    for (let action of Object.values(CalendarActions)) {
      const new_value = props.controller[action]();
      const old_value = prev_values[action];

      if (new_value !== old_value) {
        props.controller.observers[action]?.forEach(observer => observer.handleEvent(new_value));
        new_values[action] = new_value;
      };
    };

    return { ...prev_values, ...new_values }
  }, {});

  return (
    <CalendarProvider
      controller={props.controller}
      events={props.events}
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