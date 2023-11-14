import { useContext } from "solid-js";

import { CalendarHeader } from "./ui/CalendarHeader";
import { CalendarBody } from "./ui/CalendarBody";
import { CalendarContext } from "./context/CalendarContext";


export const Calendar = () => {
  const { controller } = useContext(CalendarContext);
  controller.initialize();

  const year = controller.get_year() as number;

  return (
    <div>
      <CalendarHeader year={year} />
      <CalendarBody year={year} />
    </div>
  );
};