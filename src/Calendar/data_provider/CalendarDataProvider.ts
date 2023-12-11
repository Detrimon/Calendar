import { AppModel } from "../../mock/mock_events_data";
import { format_date_to_string } from "../../shared/lib/helpers";
import type { ICalendarDayEvent, TEventsTypesByDate } from "./CalendarDataProviderTypes";

export class CalendarDataProvider {
  private model: AppModel

  constructor(model: AppModel) {
    this.model = model
  }

  // async get_year_events(year: number): Promise<TEventsTypesByDate>{
  //   const events = await this.model.get_all_events();

  //   const events_obj: TEventsTypesByDate = {};
    
  //   events.forEach(event => {
  //     if (event.attributes.is_periodic) {
  //       let start_timestamp = Math.max(new Date(year, 0, 1).getTime(), event.attributes.start_date.getTime());
  //       let stop_timestamp: number;

  //       if (event.attributes.end_date) {
  //         stop_timestamp = Math.min(new Date(year, 11, 31).getTime(), event.attributes.end_date?.getTime());
  //       } else {
  //         stop_timestamp = new Date(year, 11, 31).getTime();
  //       };

  //       while (start_timestamp <= stop_timestamp) {
  //         const current = new Date(start_timestamp);
  //         const day_string = format_date_to_string(current);
        
  //         if (events_obj[day_string]) {
  //           events_obj[day_string].push(event.attributes.type);
  //         } else {
  //           events_obj[day_string] = [event.attributes.type];
  //         };

  //         switch (event.attributes.repeat_rate) {
  //           case "DAY":
  //             current.setDate(current.getDate() + 1);
  //             break;
  //           case "WEEK":
  //             current.setDate(current.getDate() + 7);
  //             break;
  //           case "MONTH":
  //             current.setMonth(current.getMonth() + 1);
  //             break;
  //           case "YEAR":
  //             current.setFullYear(current.getFullYear() + 1);
  //             break;
  //         };
  //         start_timestamp = current.getTime();
  //       };
  //     } else {
  //       const date_string = format_date_to_string(event.attributes.start_date);
  //       if (events_obj[date_string]) {
  //         events_obj[date_string] = [...events_obj[date_string], event.attributes.type];
  //       } else {
  //         events_obj[date_string] = [event.attributes.type];
  //       };
  //     };
  //   });

  //   for (let event_key of Object.keys(events_obj)) {
  //     events_obj[event_key] = Array.from(new Set(events_obj[event_key]))
  //   };

  //   return events_obj;
  // };

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
          case "DAY":
            current.setDate(current.getDate() + 1);
            break;
          case "WEEK":
            current.setDate(current.getDate() + 7);
            break;
          case "MONTH":
            current.setMonth(current.getMonth() + 1);
            break;
          case "YEAR":
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

  async get_year_holidays(year: number) {
    return await this.model.get_year_holidays(year)
  };
};
