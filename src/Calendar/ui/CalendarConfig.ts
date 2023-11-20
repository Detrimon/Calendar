import { EventsParams } from "../data_provider/CalendarEventsProviderTypes"
import { get_start_of_day } from "../helpers/calendar_helpers";

interface ICalendarConfig{
  events_params: EventsParams;
  year: number;
  selected_date: Date;
}

type CalendarConfigProps = Partial<ICalendarConfig>

const defaultConfig: ICalendarConfig = {
  events_params: {
    date_from: new Date(),
    date_to: new Date(),
    time_from: '00:00:00',
    time_to: '23:59:59'
  },
  year: new Date().getFullYear(),
  selected_date: get_start_of_day(new Date())
};

export class CalendarConfig implements ICalendarConfig{
  events_params: EventsParams
  year: number
  selected_date: Date
  
  constructor(params?: CalendarConfigProps) {
    this.events_params = params?.events_params || defaultConfig.events_params
    this.year = params?.year || defaultConfig.year
    this.selected_date = params?.selected_date || defaultConfig.selected_date
  }
}