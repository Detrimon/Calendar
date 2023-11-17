export type EventsParams = {
  date_from: Date;
  date_to: Date;
  time_from: string;
  time_to: string;
};

export interface ICalendarEventsProvider{
  get_events: (params: EventsParams) => CalendarEventsInterface[]
}