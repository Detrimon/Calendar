import { useCalendarContext } from "../../context/CalendarContext";

import styles from "./styles.module.css";

export const CalendarHeader = () => {
  const { controller } = useCalendarContext();

  const incrementYear = () => controller.set_year(controller.get_year() + 1);
  const decrementYear = () => controller.set_year(controller.get_year() - 1);

  return (
    <div class={styles.calendar_header_container}>
      <button
        onClick={decrementYear}
        class={styles.calendar_header_button}
      >
        &#60;
      </button>
      <p>{controller.get_year()}</p>
      <button
        onClick={incrementYear}
        class={styles.calendar_header_button}
      >
        &#62;
      </button>
    </div>
  );
};