import { CalendarHeader } from "./ui/CalendarHeader";
import { CalendarBody } from "./ui/CalendarBody";
import { CalendarProps } from "./lib/types";

export const Calendar = (props: CalendarProps) => {
  props.controller.initialize();
  const year = new Date().getFullYear();

  return (
    <div>
      <CalendarHeader year={year} />
      <CalendarBody {...props} />
    </div>
  );
};