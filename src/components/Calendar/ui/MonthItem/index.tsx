import { MonthItemBody } from "./MonthItemBody";
import { MonthItemHeader } from "./MonthItemHeader";

import styles from "./styles.module.css";

type Props = {
  dates_slice: {
    month: string
    month_dates: Date[][]
  }
}

export const MonthItem = (props: Props) => {
  const { month, month_dates } = props.dates_slice;

  return (
    <div class={styles.month_item_container}>
      <table class={styles.month_item_table}>
        <MonthItemHeader month_name={month}/>
        <MonthItemBody month_dates={month_dates}/>
      </table>
    </div>
  );
};