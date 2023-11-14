import { useCalendarContext } from "../../context/CalendarContext";

export const CalendarHeader = () => {
  const { controller } = useCalendarContext();

  return <div>{`< ${controller.get_year()} >`}</div>;
};