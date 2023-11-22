import type { CalendarEventsInterface } from "./CalendarDataProviderTypes";

export class CalendarDataProvider {
  // TODO написать логику запроса на сервер за государственными выходными
  async get_holidays(year: number): Promise<Date[]>{
    return [new Date()];
  }

  // TODO написать логику запроса на сервер за repeated_events
  async get_repeated_events(year: number): Promise<CalendarEventsInterface>{
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const events = await resp.json();

    console.log(' from get_repeated_events', events);

    return events
  }

  // TODO написать логику запроса на сервер за unique_events
  async get_unique_events(year: number): Promise<CalendarEventsInterface>{
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const events = await resp.json();

    console.log(' from get_unique_events', events);

    return events
  }

  // TODO Имплементировать функцию, когда появится чёткое представление о структуре repeated_events. Нужна функция transform 
  async get_events(year: number): Promise<CalendarEventsInterface[]> {
    const unique_events = await this.get_unique_events(year);
    const repeated_events = await this.get_repeated_events(year);
    
    const events = {
      ...unique_events,
      ...repeated_events
    }

    return []
  };
};
