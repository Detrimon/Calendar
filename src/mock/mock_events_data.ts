import {
  ICalendarDayEvent,
  ICalendarEvents,
  ICalendarRepeatedEvent,
  ICalendarRepeatedEvents,
  TCalendarEventType,
  TEventsTypesByDate,
} from "../Calendar/data_provider/CalendarDataProviderTypes";
import { filter_by_rate } from "../Calendar/helpers/calendar_helpers";

export class AppModel{
  private events_data: ICalendarEvents
  private repeated_events_data: ICalendarRepeatedEvents

  constructor() {
    this.events_data = mock_events_data;
    this.repeated_events_data = mock_repeated_data;
  };

  get_date_events(date: Date): Promise<ICalendarDayEvent[]> {
    const day_string = date.toLocaleString().substring(0, 10);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.events_data[day_string] || []);
      }, 500);
    });
  };

  get_date_repeated_events(date: Date): Promise<ICalendarRepeatedEvent[]> {
    const events = this.repeated_events_data;

    const filtered_by_period_events: ICalendarRepeatedEvent[] = [];

    for (let event_key of Object.keys(events)) {
      const date_timestamp = date.getTime();
      const event_start_timestamp = events[event_key].event_start_date.getTime();
      const event_stop_timestamp = events[event_key].event_stop_date.getTime();

      if (date_timestamp >= event_start_timestamp && date_timestamp <= event_stop_timestamp) {
        filtered_by_period_events.push(events[event_key]);
      };
    };

    const result = filtered_by_period_events.filter(filter_by_rate(date));

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 500);
    });
  };

  get_year_events(year: number): Promise<TEventsTypesByDate> {
    const data = this.events_data;
    const result: TEventsTypesByDate = {};

    for (let event_key of Object.keys(data)) {
      if (+event_key.slice(-4) === year) {
        const event_types = data[event_key].map(event => event.event_type);
        result[event_key] = event_types;
      }
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 500);
    });
  };

  get_year_repeated_events(year: number): Promise<ICalendarRepeatedEvent[]>{
    const data = this.repeated_events_data;
    const result: ICalendarRepeatedEvent[] = [];
    
    for (let event_key of Object.keys(data)) {
      const start_year = data[event_key].event_start_date.getFullYear();
      const stop_year = data[event_key].event_stop_date.getFullYear();
      if (year >= start_year && year <= stop_year) {
        result.push(data[event_key])
      };
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 500);
    });
  };
};

export const mock_events_data: ICalendarEvents = {
  "14.12.2023": [
    {
      event_date: new Date(2023, 11, 14),
      event_type: TCalendarEventType.EVENT_1,
      event_id: "event_id_1",
      event_start_time: "11.30",
      event_end_time: "12.30",
      event_text: 'Описание event`a №1'
    },
    {
      event_date: new Date(2023, 11, 14),
      event_type: TCalendarEventType.EVENT_2,
      event_id: "event_id_2",
      event_start_time: "10.30",
      event_end_time: "11.30",
      event_text: 'Описание event`a №2'
    },
  ],
  "15.12.2023": [
    {
      event_date: new Date(2023, 11, 15),
      event_type: TCalendarEventType.EVENT_2,
      event_id: "event_id_3",
      event_start_time: "13.30",
      event_end_time: "14.30",
      event_text: 'Описание event`a №3'
    },
    {
      event_date: new Date(2023, 11, 15),
      event_type: TCalendarEventType.EVENT_3,
      event_id: "event_id_4",
      event_start_time: "15.30",
      event_end_time: "16.00",
      event_text: 'Описание event`a №4'
    },
  ],
  "16.12.2023": [
    {
      event_date: new Date(2023, 11, 16),
      event_type: TCalendarEventType.EVENT_1,
      event_id: "event_id_5",
      event_start_time: "17.00",
      event_end_time: "18.00",
      event_text: 'Описание event`a №5'
    }
  ],
};

export const mock_repeated_data: ICalendarRepeatedEvents = {
  "event_id_10": {
    event_id: "event_id_10",
    event_type: TCalendarEventType.EVENT_4,
    repeat_rate: "month",
    event_start_date: new Date(2023, 2, 16),
    event_stop_date: new Date(2023, 11, 16),
    event_start_time: "14.30",
    event_end_time: "15.30",
    event_text: "Описание повторяющегося event`а  с id_10",
  },
  "event_id_15": {
    event_id: "event_id_15",
    event_type: TCalendarEventType.EVENT_5,
    repeat_rate: "week",
    event_start_date: new Date(2023, 4, 1),
    event_stop_date: new Date(2023, 11, 1),
    event_start_time: "14.30",
    event_end_time: "15.30",
    event_text: "Описание повторяющегося event`а с id_15",
  },
  "event_id_25": {
    event_id: "event_id_25",
    event_type: TCalendarEventType.EVENT_6,
    repeat_rate: "year",
    event_start_date: new Date(2023, 9, 1),
    event_stop_date: new Date(2025, 11, 1),
    event_start_time: "14.30",
    event_end_time: "15.30",
    event_text: "Описание повторяющегося event`а с id_15",
  },
};