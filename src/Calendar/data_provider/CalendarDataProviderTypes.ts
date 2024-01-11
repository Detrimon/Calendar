export type TEventTasksID = number;
export type TCalendarEventID = string;
export type TCalendarEventTime = string;
export enum TCalendarEventType {
  SC= "SMET_COMISSION"
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

export type TDateTaskAttributes = {
  uuid: string,
  title: string,
  start_time: string,
  plan_item_number: string,
  createdAt: Date,
  updatedAt: Date,
  event_task_id: string
};

export type TTaskElement = {
  id: TEventTasksID,
  attributes: TDateTaskAttributes
};

export type TDateTask = {
  title: string,
  tasks: TTaskElement[]
};

export type TEventsByDate = {
  [key: string]: true;
};

export type THolidaysData = {
  holidays: string[];
  become_working: string[];
};

export type Holidays = {
  [key: string]: THolidaysData
};

