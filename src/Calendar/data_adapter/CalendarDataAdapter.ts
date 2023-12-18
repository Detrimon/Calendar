import { holidays } from "../../mock/mock_holidays_data";
import { format_date_to_reversed_string, create_query_string } from "../../shared/lib/helpers";
import type { TQueryParams } from "../../shared/types";
import type { TCalendarEvents, TDateTask, TTaskElement, THolidaysData } from "../data_provider/CalendarDataProviderTypes";
import { ICalendarDataAdapter } from "../ui/CalendarTypes";

const token = import.meta.env.VITE_BEARER_TOKEN;

export class CalendarDataAdapter implements ICalendarDataAdapter{
  async get_all_events(year: number): Promise<TCalendarEvents[]> {
    const start_year = format_date_to_reversed_string(new Date(year, 0, 1));
    const end_year = format_date_to_reversed_string(new Date(year, 11, 31));

    const query_params: TQueryParams = {
      root_path: 'https://rcgpnspn01.inlinegroup.ru/api/calendar-events?',
      filters: {
        username: { value: 'INGUTEV', rel: '$eq' },
        is_active: { value: true, rel: '$eq' },
        start_date: { value: end_year, rel: '$lte' },
        end_date: { value: start_year, rel: '$gte' }
      },
      fields: ['is_periodic', 'repeat_rate', 'repeat_rate_custom', 'start_date', 'end_date']
    };

    try {
      const response = await fetch(
        create_query_string(query_params), {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token
        }
      });

      if (response.ok) {
        const events = await response.json();

        events.data.forEach(event => {
          event.attributes.start_date = new Date(Date.parse(event.attributes.start_date));

          if (event.attributes.end_date) {
            event.attributes.end_date = new Date(Date.parse(event.attributes.end_date));
          };
        });

        return events.data as TCalendarEvents[];
      } else {
        console.error("Ошибка HTTP: " + response.status);
        return [];
      };
    } catch (error) {
      console.error(error);
      return [];
    };
  };

  async get_date_tasks(date: Date): Promise<TDateTask[]> {
    const date_string = format_date_to_reversed_string(date);

    try {
      const response = await fetch(`https://rcgpnspn01.inlinegroup.ru/api/event-tasks?filters[date]=${date_string}&populate=*`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token
        }
      });

      if (response.ok) {
        const tasks = await response.json();

        const tasks_data = await Promise.all(tasks.data.map(task => this.get_task_data(task.attributes.uuid)));
        const day_tasks = tasks.data.map((task, i: number) => ({
          title: task.attributes.title,
          tasks: tasks_data[i]
        }));

        return day_tasks as TDateTask[];
      } else {
        console.error("Ошибка HTTP: " + response.status);
        return [];
      };
    } catch (error) {
      console.error(error);
      return [];
    };
  };

  async get_task_data(uuid: string): Promise<TTaskElement[]> {
    const query_params: TQueryParams = {
      root_path: 'https://rcgpnspn01.inlinegroup.ru/api/event-tasks-smet-comissions?',
      filters: {
        event_task_id: { value: uuid, rel: '$in' },
      },
      fields: []
    };

    try {
      const response = await fetch(
        create_query_string(query_params), {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token
        }
      });

      if (response.ok) {
        const result = await response.json();
        return result.data as TTaskElement[]
      } else {
        console.error("Ошибка HTTP: " + response.status);
        return [];
      };
    } catch (error) {
      console.error(error);
      return [];
    };
  }

  get_year_holidays(year: number): Promise<THolidaysData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(holidays[year]);
      }, 500);
    });
  };
};