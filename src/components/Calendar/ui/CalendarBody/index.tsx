import { For } from "solid-js";

import { MonthItem } from "../MonthItem";
import { MONTHS } from "../../lib/constants";
import { get_month_data } from "../../utils/calendar_helpers";

import styles from "./styles.module.css";

export const CalendarBody = (props) => {
  return (
    <div class={styles.calendar_body_container}>
      <For each={MONTHS}>
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