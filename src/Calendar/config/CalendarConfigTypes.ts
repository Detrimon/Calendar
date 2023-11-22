import type { EventsParams } from "../data_provider/CalendarDataProviderTypes";

interface ICalendarConfig{
  events_params: EventsParams;
  year: number;
  selected_date: Date;
};

export type CalendarConfigProps = Partial<ICalendarConfig>;