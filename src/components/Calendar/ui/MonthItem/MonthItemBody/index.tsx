import { For } from "solid-js";

import { get_start_of_day } from "../../../utils/calendar_helpers";

import styles from "./styles.module.css";

export const MonthItemBody = (props) => {
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