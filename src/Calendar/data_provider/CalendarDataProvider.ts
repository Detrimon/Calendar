import { AppModel } from "../../mock/mock_events_data";
import { format_date_to_string } from "../helpers/calendar_helpers";
import type { ICalendarDayEvent, TEventsTypesByDate } from "./CalendarDataProviderTypes";

export class CalendarDataProvider {
  private model: AppModel

  constructor(model: AppModel) {
    this.model = model
  }

  // TODO написать логику запроса на сервер за государственными выходными
  async get_holidays(year: number): Promise<Date[]>{
    return [new Date()];
  };

  async get_year_events(year: number): Promise<TEventsTypesByDate>{
    const [events, repeated_events] =
      await Promise.all([this.model.get_year_events(year), this.model.get_year_repeated_events(year)]);

    const result = repeated_events.reduce<TEventsTypesByDate>((result_obj, repeated_event) => {
      let start_timestamp = Math.max(new Date(year, 0, 1).getTime(), repeated_event.event_start_date.getTime());
      const stop_timestamp = Math.min(new Date(year, 11, 31).getTime(), repeated_event.event_stop_date.getTime());

      while (start_timestamp <= stop_timestamp) {
        const current = new Date(start_timestamp);
        const day_string = format_date_to_string(current);
        
        
        if (result_obj[day_string]) {
          result_obj[day_string].push(repeated_event.event_type);
          result_obj[day_string] = Array.from(new Set(result_obj[day_string]));
        } else {
          result_obj[day_string] = [repeated_event.event_type];
        };

        switch (repeated_event.repeat_rate) {
          case "day":
            current.setDate(current.getDate() + 1);
            break;
          case "week":
            current.setDate(current.getDate() + 7);
            break;
          case "month":
            current.setMonth(current.getMonth() + 1);
            break;
          case "year":
            current.setFullYear(current.getFullYear() + 1);
            break;
        }
        start_timestamp = current.getTime();
      };

      return result_obj;
    }, {});

    for (let event_key of Object.keys(events)) {
      if (result[event_key]) {
        const merged_array = [...result[event_key], ...events[event_key]];
        result[event_key] = Array.from(new Set(merged_array));
      } else {
        result[event_key] = events[event_key];
      };
    };
    
    return result
  };

  async get_date_events(date: Date): Promise<ICalendarDayEvent[]>{
    const [date_events, date_repeated_events] =
      await Promise.all([this.model.get_date_events(date), this.model.get_date_repeated_events(date)]);

    const repeated_events = date_repeated_events.map(event => ({
      event_id: event.event_id,
      event_date: date,
      event_type: event.event_type,
      event_text: event.event_text,
      event_end_time: event.event_end_time,
      event_start_time: event.event_start_time,
    }));
    
    return [...repeated_events, ...date_events ];
  };
};
