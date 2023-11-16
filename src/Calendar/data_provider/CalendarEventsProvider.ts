import { Accessor, createResource } from "solid-js";
import { get_unique_events } from "../utils/get_unique_events";

// TODO Написать имплементацию
export class CalendarEventsProvider {


  constructor() {

  }

  initialize() {

  }

  get_unique_events(
    date_from = new Date(),
    date_to = new Date(),
    time_from = '00:00:00',
    time_to = '23:59:59'
  ) {
    const [unique_events] = createResource({date_from, date_to, time_from, time_to}, get_unique_events);
    return unique_events;
  }

  get_repeated_events() {
    
  }

  get_events() {
    // Функция преобразования ответов get_unique_events и get_repeated_events в нужный формат  + return данных
  }
}
