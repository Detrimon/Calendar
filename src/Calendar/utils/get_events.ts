import { EventsParams } from "../data_provider/CalendarEventsProviderTypes";

// TODO написать логику запроса на сервер за unique_events
export async function get_unique_events(params: EventsParams): Promise<CalendarEventsInterface>{
  const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const result = await resp.json()
      
  return result
}

// TODO написать логику запроса на сервер за repeated_events
export async function get_repeated_events(params: EventsParams): Promise<CalendarEventsInterface>{
  const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const result = await resp.json()
      
  return result
}