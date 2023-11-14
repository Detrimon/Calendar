import { For } from "solid-js";

import { get_start_of_day } from "../../../helpers/calendar_helpers";
import { useCalendarContext } from "../../../context/CalendarContext";

import styles from "./styles.module.css";

type Props = {
  month_dates: Date[][]
};

export const MonthItemBody = (props: Props) => {
  const { controller } = useCalendarContext();
  
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
                          controller.get_today()?.getTime() ===
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