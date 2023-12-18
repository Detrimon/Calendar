import { DAYS_IN_MONTH, DAYS_IN_WEEK, Month } from "../../shared/lib/constants";
import { get_day_of_week, is_leap_year } from "../../shared/lib/helpers";

export function get_days_in_month(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const days_in_month = DAYS_IN_MONTH[month];

  if (is_leap_year(year) && month === Month.February) {
    return days_in_month + 1;
  } else {
    return days_in_month;
  }
};

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
  };

  return result;
};
