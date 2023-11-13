import { For, createSignal, mergeProps } from "solid-js";
import styles from "./Calendar.module.css";
import {
  DAYS_IN_WEEK,
  get_month_data,
  get_start_of_day,
} from "./calendar_helpers";
import { CalendarController } from "./CalendarController";

const WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октярбь",
  "Ноябрь",
  "Декабрь",
];

export const Calendar = (input_props) => {
  const default_props = {
    controller: input_props.controller ? null : new CalendarController(),
  };

  const props = mergeProps(default_props, input_props);

  props.controller.initialize();

  return (
    <div>
      <CalendarHeader year="2023" />
      <CalendarBody {...props} />
    </div>
  );
};

const CalendarHeader = (props) => {
  return <div>{`< ${props.year} >`}</div>;
};

const CalendarBody = (props) => {
  return (
    <div class={styles.calendar_body_container}>
      <For each={months}>
        {(month, index) => {
          return (
            <MonthItem
              dates_slice={{
                month: month,
                month_dates: get_month_data(2023, index()),
              }}
              {...props}
            />
          );
        }}
      </For>
    </div>
  );
};

const MonthItem = (props) => {
  const { month, month_dates } = props.dates_slice;

  return (
    <div class={styles.month_item_container}>
      <table class={styles.month_item_table}>
        <MonthItemHeader month_name={month} {...props} />
        <MonthItemBody month_dates={month_dates} {...props} />
      </table>
    </div>
  );
};

const MonthItemHeader = (props) => {
  return (
    <thead class={styles.month_item_header_container}>
      <tr>
        <th colspan={DAYS_IN_WEEK} class={styles.month_title}>
          {props.month_name}
        </th>
      </tr>
      <tr>
        <For each={WEEKDAYS}>{(week_day) => <th>{week_day}</th>}</For>
      </tr>
    </thead>
  );
};

const MonthItemBody = (props) => {
  console.log(props);
  console.log(props.dates_slice.month);
  return (
    <tbody>
      <For each={props.month_dates}>
        {(week, index) => {
          return (
            <tr>
              <For each={week}>
                {(day, index) => {
                  return day ? (
                    <td
                      classList={{
                        [styles.day_weekend]:
                          day.getDay() === 6 || day.getDay() === 0,
                        [styles.day_today]:
                          props.controller.get_today().getTime() ===
                          get_start_of_day(day).getTime(),
                      }}
                    >
                      {day.getDate()}
                    </td>
                  ) : (
                    <td></td>
                  );
                }}
              </For>
            </tr>
          );
        }}
      </For>
    </tbody>
  );
};
