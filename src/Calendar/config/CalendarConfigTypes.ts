interface ICalendarConfig{
  year: number;
  month: number;
  selected_date: Date;
};

export type CalendarConfigProps = Partial<ICalendarConfig>;