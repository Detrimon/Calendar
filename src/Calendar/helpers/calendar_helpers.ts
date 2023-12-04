import { ICalendarRepeatedEvent } from "../data_provider/CalendarDataProviderTypes";
import { DAYS_IN_MONTH, DAYS_IN_WEEK, Month } from "../lib/constants";

export function is_leap_year(year: number) {
  return !(year % 4 || (!(year % 100) && year % 400));
}

export function get_days_in_month(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const days_in_month = DAYS_IN_MONTH[month];

  if (is_leap_year(year) && month === Month.February) {
    return days_in_month + 1;
  } else {
    return days_in_month;
  }
}

export function get_day_of_week(date: Date) {
  const day_of_week = date.getDay();

  if (day_of_week === 0) return 6;

  return day_of_week - 1;
}

export function get_month_data(year: number, month: number) {
  const result: Array<Date[]> = [];
  const date = new Date(year, month);
  const days_in_month = get_days_in_month(date);
  const month_starts_on = get_day_of_week(date);
  let day = 1;

  for (let i = 0; i < (days_in_month + month_starts_on) / DAYS_IN_WEEK; i++) {
    result[i] = [];

    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < month_starts_on) || day > days_in_month) {
        result[i][j];
      } else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }

  return result;
}

export function get_start_of_day(input_date: Date) {
  let date = new Date(input_date);
  date.setHours(0, 0, 0, 0);

  return date;
}

export function get_today() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function get_current_year() {
  let now = new Date();
  return now.getFullYear();
}

export function get_current_month() {
  let now = new Date();
  return now.getMonth();
}

export function filter_by_rate(date: Date) {
  return function (event: ICalendarRepeatedEvent) {
    if (event.repeat_rate === "day") return true;

    const copiedDate = new Date(event.event_start_date.getTime());
    const date_timestamp = date.getTime();

    let current = copiedDate.getTime();
    const end = event.event_stop_date.getTime();

    while (current <= end) {
      if (current === date_timestamp) return true;

      switch (event.repeat_rate) {
        case "year":
          copiedDate.setFullYear(copiedDate.getFullYear() + 1);
          break;
        case "month":
          copiedDate.setMonth(copiedDate.getMonth() + 1);
          break;
        case "week":
          copiedDate.setDate(copiedDate.getDate() + 7);
          break;
      };
      current = copiedDate.getTime();
    }
    return false;
  };
};


export function popup_delay(elem: HTMLElement , cb:()=>void) {
  let timeout: number;

  elem.onmouseover = function (e) {
      console.log('>>>e<<<',e);
      
        timeout = setTimeout(cb, 500);
    };

    elem.onmouseout = function() {
        clearTimeout(timeout);
    }
};
