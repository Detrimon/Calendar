export const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export function is_leap_year(year) {
  return !(year % 4 || (!(year % 100) && year % 400));
}

export function get_days_in_month(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const days_in_month = DAYS_IN_MONTH[month];

  if (is_leap_year(year) && month === Month.February) {
    return days_in_month + 1;
  } else {
    return days_in_month;
  }
}

export function get_day_of_week(date) {
  const day_of_week = date.getDay();

  if (day_of_week === 0) return 6;

  return day_of_week - 1;
}

export function get_month_data(year, month, data) {
  const result = [];
  const date = new Date(year, month);
  const days_in_month = get_days_in_month(date);
  const month_starts_on = get_day_of_week(date);
  let day = 1;

  debugger;

  for (let i = 0; i < (days_in_month + month_starts_on) / DAYS_IN_WEEK; i++) {
    result[i] = [];

    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < month_starts_on) || day > days_in_month) {
        result[i][j] = undefined;
      } else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }
  return result;
}
