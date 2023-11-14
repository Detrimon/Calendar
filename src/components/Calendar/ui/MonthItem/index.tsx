import { MonthItemBody } from "./MonthItemBody";
import { MonthItemHeader } from "./MonthItemHeader";

import styles from "./styles.module.css";

export const MonthItem = (props) => {
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