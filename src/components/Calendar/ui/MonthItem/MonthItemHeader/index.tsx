
import { For } from "solid-js";

import { CalendarProps } from "../../../lib/types";
import { DAYS_IN_WEEK, WEEKDAYS } from "../../../lib/constants";

import styles from "./styles.module.css";

type Props = {
  month_name: string
} & CalendarProps;

export const MonthItemHeader = (props: Props) => {
  return (
    <thead class={styles.month_item_header_container}>
      <tr>
        <th colspan={DAYS_IN_WEEK} class={styles.month_title}>
          {props.month_name}
        </th>
      </tr>
      <tr>
        <For each={WEEKDAYS}>{(week_day) => <th class={styles.week_day}>{week_day}</th>}</For>
      </tr>
    </thead>
  );
};