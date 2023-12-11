export type EventsParams = {
  date_from: Date;
  date_to: Date;
  time_from: string;
  time_to: string;
};

// export type TCalendarEventAttributes = {
//   username: string,
//   usergroup: string,
//   type: TCalendarEventType,
//   title: string,
//   is_periodic: boolean,
//   repeat_rate: TRepeatRate,
//   repeat_rate_custom: null,
//   start_date: Date,
//   end_date: Date | null,
//   start_time: string,
//   end_time: string | null,
//   createdAt: Date,
//   updatedAt: Date,
//   is_active: boolean,
//   uuid: string
// }

// export type TCalendarEvents = {
//   id: TCalendarEventID,
//   attributes: TCalendarEventAttributes
// }

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
  SC= "SmetComission"
};
// export type TRepeatRate = 'year' | 'month' | 'week' | 'day';

export enum TRepeatRate {
  NONE = "NONE",
  YEAR = "YEAR",
  MONTH = "MONTH",
  WEEK = "WEEK",
  DAY = "DAY",
  HOUR = "HOUR",
  CUSTOM = "CUSTOM"
};


export type TCalendarEventID = string;
export type TCalendarEventTime = string;

export type TEventsTypesByDate = {
  // В массиве типы событий для обозначения их в календаре разными цветными кружками
  [key: string]: TCalendarEventType[];
};

export type HolidaysData = {
  holidays: string[];
  preholidays: string[];
  become_working: string[];
};

export type Holidays = {
  [key: string]: HolidaysData
};

