import { For } from "solid-js";

import { MonthItem } from "../MonthItem/MonthItem";
import { MONTHS } from "../../lib/constants";
import { get_month_data } from "../../helpers/calendar_helpers";
import { useCalendarContext } from "../../context/CalendarContext";

import styles from "./styles.module.css";

export const CalendarBody = () => {
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