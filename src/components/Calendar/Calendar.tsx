import { mergeProps } from "solid-js";

import { CalendarHeader } from "./ui/CalendarHeader";
import { CalendarBody } from "./ui/CalendarBody";
import { CalendarController } from "./CalendarController";

export const Calendar = (input_props) => {
  const default_props = {
    controller: input_props.controller ? null : new CalendarController(),
  };

  const props = mergeProps(default_props, input_props);

  props.controller.initialize();

  return (
    <div>
      <CalendarHeader year="2023" />
      <CalendarBody {...props} />
    </div>
  );
};