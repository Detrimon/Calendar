import { For } from "solid-js";
import styles from "./Calendar.module.css";

const WEEKDAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

const MONTH_DATES = [
  [
    undefined,
    undefined,
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
  ],
  [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
  ],
  [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
  ],
  [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
  ],
  [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    new Date(),
  ],
  [
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    undefined,
    undefined,
    undefined,
  ],
];

export const Calendar = () => {
  return (
    <div>
      <CalendarHeader year="2023" />
      <CalendarBody />
    </div>
  );
};

const CalendarHeader = (props) => {
  return <div>{`< ${props.year} >`}</div>;
};

const CalendarBody = () => {
  return (
    <div>
      <MonthItem
        dates_slice={{
          month: "Октябрь",
          month_dates: MONTH_DATES,
        }}
      />
      <MonthItem
        dates_slice={{
          month: "Ноябрь",
          month_dates: MONTH_DATES,
        }}
      />
      <MonthItem
        dates_slice={{
          month: "Декабрь",
          month_dates: MONTH_DATES,
        }}
      />
    </div>
  );
};

const MonthItem = (props) => {
  const { month, month_dates } = props.dates_slice;

  return (
    <table>
      <MonthItemHeader month_name={month} />
      <MonthItemBody month_dates={month_dates} />
    </table>
  );
};

const MonthItemHeader = (props) => {
  return (
    <thead>
      <tr>
        <th colspan={7}>{props.month_name}</th>
      </tr>
      <tr>
        <For each={WEEKDAYS}>{(week_day) => <th>{week_day}</th>}</For>
      </tr>
    </thead>
  );
};

const MonthItemBody = (props) => {
  return (
    <tbody>
      <For each={props.month_dates}>
        {(week, index) => {
          return (
            <tr>
              <For each={week}>
                {(day, index) => {
                  return day ? <td>{day.getDate()}</td> : <td></td>;
                }}
              </For>
            </tr>
          );
        }}
      </For>
    </tbody>
  );
};
