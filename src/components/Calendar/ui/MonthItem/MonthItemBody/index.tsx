import { For } from "solid-js";

import { CalendarProps } from "../../../lib/types";
import { get_start_of_day } from "../../../helpers/calendar_helpers";

import styles from "./styles.module.css";

type Props = {
  month_dates: Date[][]
} & CalendarProps;

export const MonthItemBody = (props: Props) => {
  console.log('>>>',props);

  return (
    <tbody>
      <For each={props.month_dates}>
        {(week) => {
          return (
            <tr>
              <For each={week}>
                {(day) => {
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