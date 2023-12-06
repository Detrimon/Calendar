export type EventsParams = {
  date_from: Date;
  date_to: Date;
  time_from: string;
  time_to: string;
};

export interface ICalendarEvents {
  [date: string]: ICalendarDayEvent[]
};

export interface ICalendarRepeatedEvents {
  [event_id: TCalendarEventID]: ICalendarRepeatedEvent;
};

export interface ICalendarDayEvent {
  event_id: TCalendarEventID;
  event_type: TCalendarEventType;
  event_date: Date;
  event_start_time: TCalendarEventTime;
  event_end_time: TCalendarEventTime;
  event_text: string;
};

export interface ICalendarRepeatedEvent {
  event_id: TCalendarEventID;
  event_start_date: Date;
  event_stop_date: Date;
  event_start_time: TCalendarEventTime;
  event_end_time: TCalendarEventTime;
  repeat_rate: TRepeatRate;
  event_type: TCalendarEventType;
  event_text: string;
};

export enum TCalendarEventType {
  EVENT_1 = "EVENT_1",
  EVENT_2 = "EVENT_2",
  EVENT_3 = "EVENT_3",
  EVENT_4 = "EVENT_4",
  EVENT_5 = "EVENT_5",
  EVENT_6 = "EVENT_6",
};
type TRepeatRate = 'year' | 'month' | 'week' | 'day';
type TCalendarEventID = string;
type TCalendarEventTime = string;

export type TEventsTypesByDate = {
  // В массиве типы событий для обозначения их в календаре разными цветными кружками
  [key: string]: TCalendarEventType[];
};

export type HolidaysData = {
  holidays: string[];
  preholidays: string[];
};

export type Holidays = {
  [key: string]: HolidaysData
};

