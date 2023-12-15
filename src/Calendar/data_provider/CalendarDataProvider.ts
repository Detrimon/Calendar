import { format_date_to_string } from "../../shared/lib/helpers";
import { IAdapter } from "../ui/CalendarTypes";
import type { TDateTask, TEventsByDate } from "./CalendarDataProviderTypes";

export class CalendarDataProvider {
  private adapter: IAdapter

  constructor(adapter: IAdapter) {
    this.adapter = adapter
  }

  async get_year_events(year: number): Promise<TEventsByDate>{
    const events = await this.adapter.get_all_events(year);

    const events_obj: TEventsByDate = {};

    events.forEach(event => {
      const attributes = event.attributes;

      if (attributes.is_periodic) {
        let start_timestamp: number = attributes.start_date.getTime();

        let stop_timestamp: number;
        if (attributes.end_date) {
          stop_timestamp = Math.min(new Date(year, 11, 31).getTime(), attributes.end_date?.getTime());
        } else {
          stop_timestamp = new Date(year, 11, 31).getTime();
        };

        while (start_timestamp <= stop_timestamp) {
          const current = new Date(start_timestamp);
          const day_string = format_date_to_string(current);

          events_obj[day_string] = true;

          switch (attributes.repeat_rate) {
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
          };
          start_timestamp = current.getTime();
        };
      } else {
        const date_string = format_date_to_string(attributes.start_date);
          events_obj[date_string] = true;
      };
    });

    return events_obj;
  };

  async get_date_tasks(date: Date): Promise<TDateTask[]>{
    return await this.adapter.get_date_tasks(date);
  };

  async get_year_holidays(year: number) {
    return await this.adapter.get_year_holidays(year)
  };
};
