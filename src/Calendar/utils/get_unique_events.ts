
type Params = {
  date_from: Date,
  date_to: Date,
  time_from: string,
  time_to: string
}

// TODO написать логику запроса на сервер за unique_events
export async function get_unique_events(params: Params): Promise<CalendarEventsInterface>{
  //
}