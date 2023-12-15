import {
  Holidays,
  HolidaysData,
  TCalendarEvents,
  TDateTask,
  TTaskElement,
} from "../Calendar/data_provider/CalendarDataProviderTypes";
import { IAdapter } from "../Calendar/ui/CalendarTypes";
import { create_query_string, format_date_to_reversed_string } from "../shared/lib/helpers";
import { TQueryParams } from "../shared/types";

const token = import.meta.env.VITE_BEARER_TOKEN;

export class Adapter implements IAdapter{
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

  get_year_holidays(year: number): Promise<HolidaysData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(holidays[year]);
      }, 500);
    });
  };
};

const holidays_2022: HolidaysData = {
  "holidays": [
    "02.01.2022",
    "03.01.2022",
    "01.01.2022",
    "04.01.2022",
    "05.01.2022",
    "06.01.2022",
    "07.01.2022",
    "08.01.2022",
    "09.01.2022",
    "15.01.2022",
    "16.01.2022",
    "22.01.2022",
    "23.01.2022",
    "29.01.2022",
    "30.01.2022",
    "05.02.2022",
    "06.02.2022",
    "12.02.2022",
    "13.02.2022",
    "19.02.2022",
    "20.02.2022",
    "23.02.2022",
    "26.02.2022",
    "27.02.2022",
    "06.03.2022",
    "07.03.2022",
    "08.03.2022",
    "12.03.2022",
    "13.03.2022",
    "19.03.2022",
    "20.03.2022",
    "26.03.2022",
    "27.03.2022",
    "02.04.2022",
    "03.04.2022",
    "09.04.2022",
    "10.04.2022",
    "16.04.2022",
    "17.04.2022",
    "23.04.2022",
    "24.04.2022",
    "30.04.2022",
    "01.05.2022",
    "02.05.2022",
    "03.05.2022",
    "07.05.2022",
    "08.05.2022",
    "09.05.2022",
    "10.05.2022",
    "14.05.2022",
    "15.05.2022",
    "21.05.2022",
    "22.05.2022",
    "28.05.2022",
    "29.05.2022",
    "04.06.2022",
    "05.06.2022",
    "11.06.2022",
    "12.06.2022",
    "13.06.2022",
    "18.06.2022",
    "19.06.2022",
    "25.06.2022",
    "26.06.2022",
    "02.07.2022",
    "03.07.2022",
    "09.07.2022",
    "10.07.2022",
    "16.07.2022",
    "17.07.2022",
    "23.07.2022",
    "24.07.2022",
    "30.07.2022",
    "31.07.2022",
    "06.08.2022",
    "07.08.2022",
    "13.08.2022",
    "14.08.2022",
    "20.08.2022",
    "21.08.2022",
    "27.08.2022",
    "28.08.2022",
    "03.09.2022",
    "04.09.2022",
    "10.09.2022",
    "11.09.2022",
    "17.09.2022",
    "18.09.2022",
    "24.09.2022",
    "25.09.2022",
    "01.10.2022",
    "02.10.2022",
    "08.10.2022",
    "09.10.2022",
    "15.10.2022",
    "16.10.2022",
    "22.10.2022",
    "23.10.2022",
    "29.10.2022",
    "30.10.2022",
    "04.11.2022",
    "05.11.2022",
    "06.11.2022",
    "12.11.2022",
    "13.11.2022",
    "19.11.2022",
    "20.11.2022",
    "26.11.2022",
    "27.11.2022",
    "03.12.2022",
    "04.12.2022",
    "10.12.2022",
    "11.12.2022",
    "17.12.2022",
    "18.12.2022",
    "24.12.2022",
    "25.12.2022",
    "31.12.2022"
  ],
  "become_working": []
};

const holidays_2023: HolidaysData = {
  "holidays": [
    "01.01.2023",
    "02.01.2023",
    "03.01.2023",
    "04.01.2023",
    "05.01.2023",
    "06.01.2023",
    "07.01.2023",
    "08.01.2023",
    "14.01.2023",
    "15.01.2023",
    "21.01.2023",
    "22.01.2023",
    "28.01.2023",
    "29.01.2023",
    "04.02.2023",
    "05.02.2023",
    "11.02.2023",
    "12.02.2023",
    "18.02.2023",
    "19.02.2023",
    "23.02.2023",
    "24.02.2023",
    "25.02.2023",
    "26.02.2023",
    "04.03.2023",
    "05.03.2023",
    "08.03.2023",
    "11.03.2023",
    "12.03.2023",
    "18.03.2023",
    "19.03.2023",
    "25.03.2023",
    "26.03.2023",
    "01.04.2023",
    "02.04.2023",
    "08.04.2023",
    "09.04.2023",
    "15.04.2023",
    "16.04.2023",
    "22.04.2023",
    "23.04.2023",
    "29.04.2023",
    "30.04.2023",
    "01.05.2023",
    "06.05.2023",
    "07.05.2023",
    "08.05.2023",
    "09.05.2023",
    "13.05.2023",
    "14.05.2023",
    "20.05.2023",
    "21.05.2023",
    "27.05.2023",
    "28.05.2023",
    "03.06.2023",
    "04.06.2023",
    "10.06.2023",
    "11.06.2023",
    "12.06.2023",
    "17.06.2023",
    "18.06.2023",
    "24.06.2023",
    "25.06.2023",
    "01.07.2023",
    "02.07.2023",
    "08.07.2023",
    "09.07.2023",
    "15.07.2023",
    "16.07.2023",
    "22.07.2023",
    "23.07.2023",
    "29.07.2023",
    "30.07.2023",
    "05.08.2023",
    "06.08.2023",
    "12.08.2023",
    "13.08.2023",
    "19.08.2023",
    "20.08.2023",
    "26.08.2023",
    "27.08.2023",
    "02.09.2023",
    "03.09.2023",
    "09.09.2023",
    "10.09.2023",
    "16.09.2023",
    "17.09.2023",
    "23.09.2023",
    "24.09.2023",
    "30.09.2023",
    "01.10.2023",
    "07.10.2023",
    "08.10.2023",
    "14.10.2023",
    "15.10.2023",
    "21.10.2023",
    "22.10.2023",
    "28.10.2023",
    "29.10.2023",
    "04.11.2023",
    "05.11.2023",
    "06.11.2023",
    "11.11.2023",
    "12.11.2023",
    "18.11.2023",
    "19.11.2023",
    "25.11.2023",
    "26.11.2023",
    "02.12.2023",
    "03.12.2023",
    "09.12.2023",
    "10.12.2023",
    "16.12.2023",
    "17.12.2023",
    "23.12.2023",
    "24.12.2023",
    "30.12.2023",
    "31.12.2023"
  ],
  "become_working": []
};

const holidays_2024: HolidaysData = {
  "holidays": [
    "01.01.2024",
    "02.01.2024",
    "03.01.2024",
    "04.01.2024",
    "05.01.2024",
    "06.01.2024",
    "07.01.2024",
    "08.01.2024",
    "13.01.2024",
    "14.01.2024",
    "20.01.2024",
    "21.01.2024",
    "27.01.2024",
    "28.01.2024",
    "03.02.2024",
    "04.02.2024",
    "10.02.2024",
    "11.02.2024",
    "17.02.2024",
    "18.02.2024",
    "23.02.2024",
    "24.02.2024",
    "25.02.2024",
    "02.03.2024",
    "03.03.2024",
    "08.03.2024",
    "09.03.2024",
    "10.03.2024",
    "16.03.2024",
    "17.03.2024",
    "23.03.2024",
    "24.03.2024",
    "30.03.2024",
    "31.03.2024",
    "06.04.2024",
    "07.04.2024",
    "13.04.2024",
    "14.04.2024",
    "20.04.2024",
    "21.04.2024",
    "28.04.2024",
    "29.04.2024",
    "30.04.2024",
    "01.05.2024",
    "04.05.2024",
    "05.05.2024",
    "09.05.2024",
    "10.05.2024",
    "11.05.2024",
    "12.05.2024",
    "18.05.2024",
    "19.05.2024",
    "25.05.2024",
    "26.05.2024",
    "01.06.2024",
    "02.06.2024",
    "08.06.2024",
    "09.06.2024",
    "12.06.2024",
    "15.06.2024",
    "16.06.2024",
    "22.06.2024",
    "23.06.2024",
    "29.06.2024",
    "30.06.2024",
    "06.07.2024",
    "07.07.2024",
    "13.07.2024",
    "14.07.2024",
    "20.07.2024",
    "21.07.2024",
    "27.07.2024",
    "28.07.2024",
    "03.08.2024",
    "04.08.2024",
    "10.08.2024",
    "11.08.2024",
    "17.08.2024",
    "18.08.2024",
    "24.08.2024",
    "25.08.2024",
    "31.08.2024",
    "01.09.2024",
    "07.09.2024",
    "08.09.2024",
    "14.09.2024",
    "15.09.2024",
    "21.09.2024",
    "22.09.2024",
    "28.09.2024",
    "29.09.2024",
    "05.10.2024",
    "06.10.2024",
    "12.10.2024",
    "13.10.2024",
    "19.10.2024",
    "20.10.2024",
    "26.10.2024",
    "27.10.2024",
    "03.11.2024",
    "04.11.2024",
    "09.11.2024",
    "10.11.2024",
    "16.11.2024",
    "17.11.2024",
    "23.11.2024",
    "24.11.2024",
    "30.11.2024",
    "01.12.2024",
    "07.12.2024",
    "08.12.2024",
    "14.12.2024",
    "15.12.2024",
    "21.12.2024",
    "22.12.2024",
    "29.12.2024",
    "30.12.2024",
    "31.12.2024"
  ],
  "become_working": [
    "27.04.2024",
    "28.12.2024"
  ]
};

const holidays: Holidays = {
  2022: holidays_2022,
  2023: holidays_2023,
  2024: holidays_2024,
};
