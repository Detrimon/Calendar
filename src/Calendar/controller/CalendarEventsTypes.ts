interface CalendarEventsInterface {
  // [date: Date]: CalendarDayEventsInterface
  events: CalendarDayEventsInterface[]
}

interface CalendarDayEventsInterface {
  day_events: {
    event_date: Date;
    event_type: TCalendarEvent;
    event_id: TCalendarEventID;
    event_time: TCalendarEventTime;
  };
};

enum TCalendarEvent {
  EVENT_1 = "EVENT_1",
  EVENT_2 = "EVENT_2",
  EVENT_3 = "EVENT_3",
}

type TCalendarEventID = string;
type TCalendarEventTime = number;

interface CalendarRepeatedEventsInterface {
  [event_id: TCalendarEventID]: {
    event_id: TCalendarEventID;
    event_time: TCalendarEventTime;
    repeat_rate: TRepeatRate;
    event_from_date: Date;
    event_from_time: TCalendarEventTime;
    event_end_date: Date;
    event_end_time: TCalendarEventTime;
  };
}

type TRepeatRate = 'year' | 'month' | 'day' | 'hour' | 'min' | 'none';
