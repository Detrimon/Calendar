import { CalendarHeader } from "./ui/CalendarHeader/CalendarHeader";
import { CalendarBody } from "./ui/CalendarBody/CalendarBody";
import { CalendarProvider } from "./context/CalendarContext";

import type { CalendarProps } from "./lib/types";

export const Calendar = (props: CalendarProps) => {
  props.controller.initialize();

  return (
    <CalendarProvider controller={props.controller}>
      <CalendarHeader />
      <CalendarBody />
    </CalendarProvider>
  );
};