import { MonthItemBody } from "./MonthItemBody/MonthItemBody";
import { MonthItemHeader } from "./MonthItemHeader/MonthItemHeader";

import styles from "./styles.module.css";

type Props = {
  month: string
  month_dates: Date[][]
}

export const MonthItem = (props: Props) => (
  <div class={styles.month_item_container}>
    <table class={styles.month_item_table}>
      <MonthItemHeader month_name={props.month} />
      <MonthItemBody month_dates={props.month_dates} />
    </table>
  </div>
);