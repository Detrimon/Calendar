import type { EventsParams } from "../data_provider/CalendarDataProviderTypes";
import { CalendarViewMode } from "../ui/CalendarView/CalendarViewTypes";

interface ICalendarConfig{
  events_params: EventsParams;
  year: number;
  selected_date: Date;
  calendar_mode: CalendarViewMode;
};

export type CalendarConfigProps = Partial<ICalendarConfig>;