export type EventsParams = {
  date_from: Date;
  date_to: Date;
  time_from: string;
  time_to: string;
};

export type TEventTasksID = number;
export type TCalendarEventID = string;
export type TCalendarEventTime = string;
export enum TCalendarEventType {
  SC= "SmetComission"
};
export enum TRepeatRate {
  NONE = "NONE",
  YEAR = "YEAR",
  MONTH = "MONTH",
  WEEK = "WEEK",
  DAY = "DAY",
  HOUR = "HOUR",
  CUSTOM = "CUSTOM"
};

export type TCalendarEventAttributes = {
  username: string,
  usergroup: string,
  type: TCalendarEventType,
  title: string,
  is_periodic: boolean,
  repeat_rate: TRepeatRate,
  repeat_rate_custom: null,
  start_date: Date,
  end_date: Date | null,
  start_time: string,
  end_time: string | null,
  createdAt: Date,
  updatedAt: Date,
  is_active: boolean,
  uuid: TCalendarEventID
};

export type TCalendarEventRel = {
  data: TCalendarEvents
};

export type TSmetComission = {
  data: {
    attributes: TSmetComissionAttributes,
    id: TCalendarEventID
  },
};

export type TSmetComissionAttributes = {
  createdAt: Date,
  description: string
  number: string
  updatedAt: Date
  uuid: TCalendarEventID
};

export type TEventAttributes = {
  calendar_event_id: TCalendarEventID,
  calendar_event_rel?: TCalendarEventRel,
  createdAt: Date,
  data_type: TCalendarEventType,
  date: Date,
  smet_comission: TSmetComission,
  smet_comission_id: string
  title: string,
  updatedAt: Date,
  uuid: TCalendarEventID
};

export type TCalendarEvents = {
    id: TEventTasksID,
    attributes: TCalendarEventAttributes
};

export type TEventTasks = {
  id: TEventTasksID,
  attributes: Partial<TEventAttributes>
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

export type TEventsByDate = {
  [key: string]: true;
};

export type HolidaysData = {
  holidays: string[];
  preholidays: string[];
  become_working: string[];
};

export type Holidays = {
  [key: string]: HolidaysData
};

